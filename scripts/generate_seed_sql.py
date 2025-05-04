import json
import uuid
import os

def escape_sql_string(value):
    """Escapes a string for SQL insertion."""
    if value is None:
        return "NULL"
    # Replace single quotes with two single quotes
    return "'" + str(value).replace("'", "''") + "'"

def generate_sql_seed(json_file_path, output_sql_file):
    """Reads medication data from JSON and generates SQL INSERT statements."""
    try:
        with open(json_file_path, 'r', encoding='utf-8') as f:
            medications_json = json.load(f)
    except Exception as e:
        print(f"Error reading JSON file {json_file_path}: {e}")
        return

    sql_statements = []
    medication_count = 0

    print(f"Processing {len(medications_json)} medications from JSON...")

    for med_json in medications_json:
        try:
            medication_id = med_json.get('id', str(uuid.uuid4())) # Use existing ID or generate new
            name = med_json.get('name')
            if not name:
                print(f"Skipping entry with missing name: {med_json}")
                continue

            brand_name = med_json.get('brandName')
            drug_class = med_json.get('drugClass')
            indication = med_json.get('indication')
            admin_recs = med_json.get('administration_recommendations') # Needs research
            line_req = json.dumps(med_json.get('lineRecommendation', {}))
            
            is_vesicant = med_json.get('vesicant', False)
            is_irritant = med_json.get('irritant', False) # Check for irritant flag
            if is_vesicant:
                extravasation_risk = 'Vesicant'
            elif is_irritant:
                extravasation_risk = 'Irritant'
            else:
                extravasation_risk = 'Non-Vesicant' # Default if neither
                
            extravasation_management = med_json.get('management')
            mechanism = med_json.get('mechanism')
            dosage_cons = med_json.get('dosage_considerations') # Needs research
            prep_guide = med_json.get('preparation_guidelines') # Needs research/mapping
            admin_guide = med_json.get('administration_guidelines') # Needs research
            evidence = med_json.get('evidence_level')
            last_updated = med_json.get('lastUpdated', 'now') # Use 'now' for SQLite
            is_free = 1 if medication_count < 5 else 0 # Make first 5 free as requested

            # Simple search terms
            search_terms_list = [name, brand_name, drug_class, indication, extravasation_risk]
            search_terms = " ".join(filter(None, search_terms_list)).lower()

            # Correctly format last_updated value for SQL
            last_updated_val = escape_sql_string(last_updated) if last_updated != 'now' else "datetime('now')"

            # Medication INSERT
            sql_statements.append(
                f"INSERT INTO Medications (id, name, brand_name, drug_class, indication, administration_recommendations, line_requirements, extravasation_risk, extravasation_management, mechanism_of_injury, dosage_considerations, preparation_guidelines, administration_guidelines, evidence_level, last_updated, is_free, search_terms) VALUES ({escape_sql_string(medication_id)}, {escape_sql_string(name)}, {escape_sql_string(brand_name)}, {escape_sql_string(drug_class)}, {escape_sql_string(indication)}, {escape_sql_string(admin_recs)}, {escape_sql_string(line_req)}, {escape_sql_string(extravasation_risk)}, {escape_sql_string(extravasation_management)}, {escape_sql_string(mechanism)}, {escape_sql_string(dosage_cons)}, {escape_sql_string(prep_guide)}, {escape_sql_string(admin_guide)}, {escape_sql_string(evidence)}, {last_updated_val}, {is_free}, {escape_sql_string(search_terms)});"
            )

            # Antidote INSERTs
            references_to_add = set()
            if med_json.get('reference'):
                 references_to_add.add((f"Main Reference for {name}", med_json['reference']))
                 
            for antidote_json in med_json.get('antidotes', []):
                antidote_name = antidote_json.get('name')
                if not antidote_name:
                    continue
                priority = antidote_json.get('priority')
                preparation = antidote_json.get('preparation') or antidote_json.get('explanation')
                administration = antidote_json.get('administration')
                ant_evidence = antidote_json.get('evidence_level')
                ant_ref_url = antidote_json.get('reference')
                
                sql_statements.append(
                    f"INSERT INTO Antidotes (medication_id, name, priority, preparation, administration, evidence_level, reference) VALUES ({escape_sql_string(medication_id)}, {escape_sql_string(antidote_name)}, {escape_sql_string(priority)}, {escape_sql_string(preparation)}, {escape_sql_string(administration)}, {escape_sql_string(ant_evidence)}, {escape_sql_string(ant_ref_url)});"
                )
                if ant_ref_url:
                    references_to_add.add((f"Reference for Antidote: {antidote_name}", ant_ref_url))

            # Reference INSERTs
            processed_urls = set()
            for citation, url in references_to_add:
                if url and url not in processed_urls:
                    sql_statements.append(
                        f"INSERT INTO MedicationReferences (medication_id, citation, url) VALUES ({escape_sql_string(medication_id)}, {escape_sql_string(citation)}, {escape_sql_string(url)});"
                    )
                    processed_urls.add(url)
            
            medication_count += 1

        except Exception as e:
            print(f"Error processing medication {med_json.get('name', 'UNKNOWN')}: {e}")

    # Write SQL statements to file
    try:
        with open(output_sql_file, 'w', encoding='utf-8') as f:
            f.write("-- Seed data for Medications, Antidotes, and MedicationReferences --\n\n")
            for stmt in sql_statements:
                f.write(stmt + "\n")
        print(f"Successfully generated {len(sql_statements)} SQL statements for {medication_count} medications.")
        print(f"SQL seed file saved to: {output_sql_file}")
    except Exception as e:
        print(f"Error writing SQL file {output_sql_file}: {e}")

if __name__ == "__main__":
    # Adjust paths relative to the script location or use absolute paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.abspath(os.path.join(script_dir, '../../ivy_redesign/js/drug_data.json'))
    output_path = os.path.abspath(os.path.join(script_dir, '../migrations/0003_seed_medications.sql'))
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    generate_sql_seed(json_path, output_path)

