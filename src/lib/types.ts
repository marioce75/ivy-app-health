// TypeScript interfaces for database models

export interface LineRequirements {
    central: boolean;
    peripheral: boolean;
    midline: boolean;
}

export interface Antidote {
    id?: number; // Optional because it's auto-incremented
    medication_id: string;
    name: string;
    priority: 'First Choice' | 'Second Choice' | 'Third Choice' | string; // Allow string for flexibility
    preparation: string | null;
    administration: string | null;
    evidence_level: 'High' | 'Moderate' | 'Limited' | 'Insufficient' | string | null;
    reference: string | null; // URL or citation
}

export interface MedicationReference {
    id?: number; // Optional because it's auto-incremented
    medication_id: string;
    citation: string;
    url: string | null;
}

export interface Medication {
    id: string; // Using TEXT PRIMARY KEY, so it's likely a UUID or unique string
    name: string;
    brand_name: string | null;
    drug_class: string | null;
    indication: string | null;
    administration_recommendations: string | null;
    line_requirements: string | null; // Stored as JSON string, parse when needed
    extravasation_risk: 'Vesicant' | 'Irritant' | 'Non-Vesicant' | string | null;
    extravasation_management: string | null;
    mechanism_of_injury: string | null;
    dosage_considerations: string | null;
    preparation_guidelines: string | null;
    administration_guidelines: string | null;
    evidence_level: 'High' | 'Moderate' | 'Limited' | 'Insufficient' | string | null;
    last_updated: string | null; // ISO 8601 format string
    is_free: number; // 0 or 1
    search_terms: string | null;
    
    // Related data (optional, for joining/display)
    antidotes?: Antidote[];
    references?: MedicationReference[];
}

