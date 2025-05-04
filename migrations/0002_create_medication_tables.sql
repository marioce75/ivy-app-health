-- Migration: Create medication related tables

-- Medications Table
CREATE TABLE IF NOT EXISTS Medications (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    brand_name TEXT,
    drug_class TEXT,
    indication TEXT,
    administration_recommendations TEXT,
    line_requirements TEXT, -- Store as JSON: {"central": true, "peripheral": false, "midline": true}
    extravasation_risk TEXT, -- 'Vesicant', 'Irritant', 'Non-Vesicant'
    extravasation_management TEXT,
    mechanism_of_injury TEXT,
    dosage_considerations TEXT,
    preparation_guidelines TEXT,
    administration_guidelines TEXT,
    evidence_level TEXT, -- 'High', 'Moderate', 'Limited', 'Insufficient'
    last_updated TEXT, -- ISO 8601 format string
    is_free INTEGER DEFAULT 0, -- 1 for free, 0 for premium
    search_terms TEXT -- Concatenated searchable fields
);

-- Antidotes Table
CREATE TABLE IF NOT EXISTS Antidotes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medication_id TEXT NOT NULL,
    name TEXT NOT NULL,
    priority TEXT, -- 'First Choice', 'Second Choice', 'Third Choice'
    preparation TEXT,
    administration TEXT,
    evidence_level TEXT,
    reference TEXT, -- URL or citation
    FOREIGN KEY (medication_id) REFERENCES Medications(id) ON DELETE CASCADE
);

-- References Table
CREATE TABLE IF NOT EXISTS MedicationReferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medication_id TEXT NOT NULL,
    citation TEXT NOT NULL,
    url TEXT,
    FOREIGN KEY (medication_id) REFERENCES Medications(id) ON DELETE CASCADE
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_medication_name ON Medications(name);
CREATE INDEX IF NOT EXISTS idx_medication_class ON Medications(drug_class);
CREATE INDEX IF NOT EXISTS idx_antidote_medication_id ON Antidotes(medication_id);
CREATE INDEX IF NOT EXISTS idx_reference_medication_id ON MedicationReferences(medication_id);

