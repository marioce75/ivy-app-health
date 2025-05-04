// Database utility functions for interacting with Cloudflare D1

import { D1Database } from "@cloudflare/workers-types";
import { Medication, Antidote, MedicationReference, LineRequirements } from "./types";

// Helper function to get the database binding
function getDb(env: { DB: D1Database }): D1Database {
    if (!env.DB) {
        throw new Error("Database binding DB not found.");
    }
    return env.DB;
}

// --- Medication CRUD ---

export async function addMedication(env: { DB: D1Database }, medication: Medication): Promise<void> {
    const db = getDb(env);
    const lineReqString = JSON.stringify(medication.line_requirements || { central: false, peripheral: false, midline: false });
    
    // Prepare search terms (simple concatenation for now)
    const searchTerms = [
        medication.name,
        medication.brand_name,
        medication.drug_class,
        medication.indication,
        medication.extravasation_risk
    ].filter(Boolean).join(" ").toLowerCase();

    await db.prepare(
        `INSERT INTO Medications (
            id, name, brand_name, drug_class, indication, administration_recommendations, 
            line_requirements, extravasation_risk, extravasation_management, mechanism_of_injury, 
            dosage_considerations, preparation_guidelines, administration_guidelines, 
            evidence_level, last_updated, is_free, search_terms
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
        medication.id,
        medication.name,
        medication.brand_name,
        medication.drug_class,
        medication.indication,
        medication.administration_recommendations,
        lineReqString,
        medication.extravasation_risk,
        medication.extravasation_management,
        medication.mechanism_of_injury,
        medication.dosage_considerations,
        medication.preparation_guidelines,
        medication.administration_guidelines,
        medication.evidence_level,
        medication.last_updated || new Date().toISOString(),
        medication.is_free || 0,
        searchTerms
    ).run();

    // Add related antidotes and references if provided
    if (medication.antidotes) {
        for (const antidote of medication.antidotes) {
            await addAntidote(env, { ...antidote, medication_id: medication.id });
        }
    }
    if (medication.references) {
        for (const reference of medication.references) {
            await addReference(env, { ...reference, medication_id: medication.id });
        }
    }
}

export async function getMedicationById(env: { DB: D1Database }, id: string): Promise<Medication | null> {
    const db = getDb(env);
    const medResult = await db.prepare("SELECT * FROM Medications WHERE id = ?").bind(id).first<Medication>();

    if (!medResult) {
        return null;
    }

    // Fetch related data
    const antidotes = await getAntidotesForMedication(env, id);
    const references = await getReferencesForMedication(env, id);

    return { ...medResult, antidotes, references };
}

export async function getAllMedications(env: { DB: D1Database }, limit: number = 100, offset: number = 0): Promise<Medication[]> {
    const db = getDb(env);
    const { results } = await db.prepare("SELECT * FROM Medications ORDER BY name LIMIT ? OFFSET ?")
                                .bind(limit, offset)
                                .all<Medication>();
    return results || [];
}

export async function searchMedications(env: { DB: D1Database }, query: string, limit: number = 50): Promise<Medication[]> {
    const db = getDb(env);
    const searchTerm = `%${query.toLowerCase()}%`;
    // Simple search across name, brand_name, class, indication, and pre-computed search_terms
    const { results } = await db.prepare(
        `SELECT * FROM Medications 
         WHERE lower(name) LIKE ? 
         OR lower(brand_name) LIKE ? 
         OR lower(drug_class) LIKE ? 
         OR lower(indication) LIKE ? 
         OR lower(search_terms) LIKE ? 
         ORDER BY name LIMIT ?`
    ).bind(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, limit).all<Medication>();
    
    return results || [];
}

// --- Antidote CRUD ---

export async function addAntidote(env: { DB: D1Database }, antidote: Antidote): Promise<void> {
    const db = getDb(env);
    await db.prepare(
        `INSERT INTO Antidotes (
            medication_id, name, priority, preparation, administration, evidence_level, reference
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
        antidote.medication_id,
        antidote.name,
        antidote.priority,
        antidote.preparation,
        antidote.administration,
        antidote.evidence_level,
        antidote.reference
    ).run();
}

export async function getAntidotesForMedication(env: { DB: D1Database }, medicationId: string): Promise<Antidote[]> {
    const db = getDb(env);
    const { results } = await db.prepare("SELECT * FROM Antidotes WHERE medication_id = ? ORDER BY priority")
                                .bind(medicationId)
                                .all<Antidote>();
    return results || [];
}

// --- Reference CRUD ---

export async function addReference(env: { DB: D1Database }, reference: MedicationReference): Promise<void> {
    const db = getDb(env);
    await db.prepare(
        `INSERT INTO MedicationReferences (medication_id, citation, url) VALUES (?, ?, ?)`
    ).bind(
        reference.medication_id,
        reference.citation,
        reference.url
    ).run();
}

export async function getReferencesForMedication(env: { DB: D1Database }, medicationId: string): Promise<MedicationReference[]> {
    const db = getDb(env);
    const { results } = await db.prepare("SELECT * FROM MedicationReferences WHERE medication_id = ?")
                                .bind(medicationId)
                                .all<MedicationReference>();
    return results || [];
}

// --- Utility to parse line requirements JSON ---
export function parseLineRequirements(jsonString: string | null): LineRequirements {
    if (!jsonString) {
        return { central: false, peripheral: false, midline: false };
    }
    try {
        const parsed = JSON.parse(jsonString);
        return {
            central: !!parsed.central,
            peripheral: !!parsed.peripheral,
            midline: !!parsed.midline,
        };
    } catch (error) {
        console.error("Failed to parse line requirements JSON:", jsonString, error);
        return { central: false, peripheral: false, midline: false }; // Return default on error
    }
}

