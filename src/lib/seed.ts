// Script to seed the database with initial medication data

import { D1Database } from "@cloudflare/workers-types";
import { addMedication } from "./db"; // Assuming db.ts is in the same directory
import { Medication, Antidote, MedicationReference } from "./types";
import * as fs from "fs/promises";
import * as path from "path";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

// Mock environment for local execution (replace with actual wrangler context if running via wrangler)
interface Env {
    DB: D1Database;
}

// Function to read JSON data
async function readJsonData(filePath: string): Promise<any[]> {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading JSON file ${filePath}:`, error);
        throw error;
    }
}

// Function to transform JSON data to Medication interface
function transformJsonToMedication(jsonData: any): Medication {
    const medicationId = jsonData.id || uuidv4(); // Use existing ID or generate new one
    
    const antidotes: Antidote[] = (jsonData.antidotes || []).map((a: any) => ({
        medication_id: medicationId,
        name: a.name,
        priority: a.priority,
        preparation: a.preparation || a.explanation, // Use preparation, fallback to explanation
        administration: a.administrationGuidelines, // Add if available in source
        evidence_level: a.evidenceLevel, // Add if available in source
        reference: a.reference
    }));

    const references: MedicationReference[] = [];
    if (jsonData.reference) {
        references.push({
            medication_id: medicationId,
            citation: `Main Reference for ${jsonData.name}`, // Placeholder citation
            url: jsonData.reference
        });
    }
    // Add antidote references if they exist and are different
    antidotes.forEach(a => {
        if (a.reference && !references.some(r => r.url === a.reference)) {
            references.push({
                medication_id: medicationId,
                citation: `Reference for Antidote: ${a.name}`, // Placeholder citation
                url: a.reference
            });
        }
    });

    return {
        id: medicationId,
        name: jsonData.name,
        brand_name: jsonData.brandName,
        drug_class: jsonData.drugClass,
        indication: jsonData.indication,
        administration_recommendations: jsonData.administration_recommendations, // Needs to be added to source or researched
        line_requirements: JSON.stringify(jsonData.lineRecommendation || {}),
        extravasation_risk: jsonData.vesicant ? "Vesicant" : (jsonData.irritant ? "Irritant" : "Non-Vesicant"),
        extravasation_management: jsonData.management,
        mechanism_of_injury: jsonData.mechanism,
        dosage_considerations: jsonData.dosage_considerations, // Needs to be added to source or researched
        preparation_guidelines: jsonData.antidotePreparation, // Maybe map from antidote prep?
        administration_guidelines: jsonData.administration_guidelines, // Needs to be added to source or researched
        evidence_level: jsonData.evidenceLevel, // Add if available in source
        last_updated: jsonData.lastUpdated || new Date().toISOString(),
        is_free: jsonData.is_free || 0, // Default to not free
        search_terms: null, // Will be generated by addMedication
        antidotes: antidotes,
        references: references
    };
}

// Main seeding function
async function seedDatabase(env: Env) {
    console.log("Starting database seeding...");
    const jsonFilePath = path.resolve(__dirname, "../../../ivy_redesign/js/drug_data.json"); // Adjust path as needed
    const medicationsJson = await readJsonData(jsonFilePath);

    console.log(`Found ${medicationsJson.length} medications in JSON file.`);

    let count = 0;
    for (const medJson of medicationsJson) {
        try {
            const medication = transformJsonToMedication(medJson);
            // Check if medication already exists (optional, depends on how seed script is run)
            // const existing = await getMedicationById(env, medication.id);
            // if (!existing) { 
                await addMedication(env, medication);
                console.log(`Added medication: ${medication.name}`);
                count++;
            // } else {
            //     console.log(`Skipped existing medication: ${medication.name}`);
            // }
        } catch (error) {
            console.error(`Failed to add medication ${medJson.name}:`, error);
        }
    }

    console.log(`Successfully seeded ${count} medications.`);
    console.log("Database seeding finished.");
}

// Example of how to run this locally (requires wrangler and local D1 setup)
// You would typically run this using a command like: `wrangler dev src/lib/seed.ts --persist-to ./.wrangler/state/v3`
// Or adapt it to be called from within your Next.js API routes or server components if needed.

// Mock DB for standalone execution example (replace with actual wrangler context)
// const mockDb: D1Database = { ... }; 
// const mockEnv: Env = { DB: mockDb };
// seedDatabase(mockEnv).catch(console.error);

// Export the function if you intend to call it from elsewhere
export { seedDatabase };

