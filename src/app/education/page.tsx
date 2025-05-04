// src/app/education/page.tsx
import React from 'react';

const EducationPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Extravasation Management Education</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">What is Extravasation?</h2>
        <p className="mb-4">
          Extravasation is the accidental leakage of intravenous (IV) drugs from the vein into the surrounding tissue. This can occur with both peripheral and central venous access devices. Depending on the type and amount of drug leaked, extravasation can cause varying degrees of tissue damage, ranging from mild irritation to severe necrosis (tissue death).
        </p>
        <p>
          It is a serious complication that requires prompt recognition and management to minimize patient harm.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Classification of Drugs</h2>
        <p className="mb-4">
          IV drugs are often classified based on their potential to cause tissue damage upon extravasation:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Vesicants:</strong> Drugs that can cause severe tissue damage, blistering, and necrosis. Examples include certain chemotherapy agents (e.g., doxorubicin, vincristine) and vasopressors (e.g., norepinephrine).</li>
          <li><strong>Irritants:</strong> Drugs that can cause local inflammation, pain, and irritation at the IV site, but typically do not cause tissue necrosis unless a large volume is extravasated. Examples include some antibiotics and potassium chloride.</li>
          <li><strong>Non-vesicants/Non-irritants (Neutrals):</strong> Drugs that generally do not cause significant tissue reaction upon extravasation.</li>
        </ul>
        <p>
          Understanding the classification of the administered drug is crucial for anticipating potential harm and guiding management.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Risk Factors</h2>
        <p className="mb-4">
          Several factors can increase the risk of extravasation:
        </p>
        <h3 className="text-xl font-medium mb-2">Patient-Related Factors:</h3>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>Fragile veins (common in elderly patients, infants, or those with certain medical conditions)</li>
          <li>Impaired circulation or sensation</li>
          <li>Previous IV site complications</li>
          <li>Obesity</li>
          <li>Restlessness or confusion</li>
        </ul>
        <h3 className="text-xl font-medium mb-2">Procedure-Related Factors:</h3>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>Poor cannula insertion technique or site selection (e.g., joints, antecubital fossa)</li>
          <li>Inadequate cannula securement</li>
          <li>Use of high infusion pressures or rates</li>
          <li>Multiple venipuncture attempts</li>
        </ul>
        <h3 className="text-xl font-medium mb-2">Product-Related Factors:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Drug properties (vesicant vs. irritant)</li>
          <li>Drug concentration and pH</li>
          <li>Volume of infusate</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Signs, Symptoms, and Diagnosis</h2>
        <p className="mb-4">
          Early recognition is key. Be vigilant for the following signs and symptoms around the IV site:
        </p>
        <h3 className="text-xl font-medium mb-2">Peripheral IV Catheter:</h3>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>Pain, burning, stinging, or discomfort</li>
          <li>Swelling (edema)</li>
          <li>Redness (erythema) or blanching</li>
          <li>Skin feeling cool or tight</li>
          <li>Decreased or stopped infusion rate</li>
          <li>Lack of blood return (though blood return may still be present initially)</li>
          <li>Leakage of fluid around the site</li>
        </ul>
        <h3 className="text-xl font-medium mb-2">Central Venous Access Device (CVAD):</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Pain (often stinging)</li>
          <li>Swelling or edema around the port insertion site, chest, neck, or shoulder</li>
          <li>Redness in the chest, collarbone, or neck area</li>
          <li>Difficulty flushing the device or absence of blood return</li>
          <li>Symptoms may appear early or late.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Extravasation Assessment Tool</h2>
        <p className="mb-4">A grading scale can help assess the severity (based on Table 1 from Kim et al., 2020):</p>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 dark:border-gray-600 mb-4">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="border p-2">Feature</th>
                <th className="border p-2">Grade 0</th>
                <th className="border p-2">Grade 1</th>
                <th className="border p-2">Grade 2</th>
                <th className="border p-2">Grade 3</th>
                <th className="border p-2">Grade 4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-medium">Color</td>
                <td className="border p-2">Normal</td>
                <td className="border p-2">Pink</td>
                <td className="border p-2">Red</td>
                <td className="border p-2">Blanched</td>
                <td className="border p-2">Blackened</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Integrity</td>
                <td className="border p-2">Unbroken</td>
                <td className="border p-2">Blistered</td>
                <td className="border p-2">Superficial skin loss</td>
                <td className="border p-2">Tissue loss exposing subcutaneous tissue</td>
                <td className="border p-2">Tissue loss exposing muscle/bone with deep crater or necrosis</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Skin Temperature</td>
                <td className="border p-2">Normal</td>
                <td className="border p-2">Warm</td>
                <td className="border p-2">Hot</td>
                <td className="border p-2">-</td>
                <td className="border p-2">-</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Edema</td>
                <td className="border p-2">Absent</td>
                <td className="border p-2">Non-pitting</td>
                <td className="border p-2">Pitting</td>
                <td className="border p-2">-</td>
                <td className="border p-2">-</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Mobility</td>
                <td className="border p-2">Full</td>
                <td className="border p-2">Slightly limited</td>
                <td className="border p-2">Very limited</td>
                <td className="border p-2">Immobile</td>
                <td className="border p-2">-</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Pain</td>
                <td className="border p-2" colSpan={5}>Rate on a scale of 0-10</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Fever</td>
                <td className="border p-2">Normal</td>
                <td className="border p-2" colSpan={4}>Elevated (highest value during 24 hours)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Management of Extravasation</h2>
        <p className="mb-4">
          Immediate intervention is crucial. Follow these general steps (adapted from Kim et al., 2020):
        </p>
        <ol className="list-decimal list-inside space-y-2 mb-4">
          <li><strong>Stop the infusion immediately</strong> but leave the cannula/needle in place initially.</li>
          <li>Disconnect the IV tubing from the cannula.</li>
          <li>Attempt to aspirate any residual drug and fluid from the cannula using a 10-20 mL syringe.</li>
          <li>Avoid applying manual pressure over the extravasated area.</li>
          <li>Remove the cannula/needle. Mark the affected area with a pen.</li>
          <li>Notify the physician/prescriber.</li>
          <li>Administer a specific antidote if available and ordered (refer to drug-specific information).</li>
          <li>Elevate the affected limb to help reduce swelling.</li>
          <li>Apply thermal treatment (cold or warm compresses) as indicated for the specific drug.</li>
          <li>Administer analgesia if necessary for pain management.</li>
          <li>Document the incident thoroughly (see Documentation section).</li>
          <li>Monitor the site closely for changes and follow up as needed. Consider photographic documentation and consultation (e.g., plastic surgery) for severe cases.</li>
        </ol>

        <h3 className="text-xl font-medium mb-2">Thermal Application:</h3>
        <ul className="list-disc list-inside space-y-2 mb-3">
          <li><strong>Cold Compresses (Ice Packs):</strong> Cause vasoconstriction, limiting drug spread. Generally recommended for DNA-binding vesicants (except vinca alkaloids) and irritants. Apply for 15-20 minutes, 4-6 times per day for 24-48 hours. Do NOT use for vinca alkaloids or vasopressors.</li>
          <li><strong>Warm Compresses (Dry Heat):</strong> Cause vasodilation, enhancing drug dispersion and absorption. Recommended for non-DNA-binding vesicants (e.g., vinca alkaloids, vasopressors). Apply for 20-30 minutes, 4-6 times per day for 24-48 hours.</li>
        </ul>
        <p>Always consult specific drug protocols for appropriate thermal application.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Documentation</h2>
        <p className="mb-4">
          Thorough documentation is essential for patient safety, legal purposes, and quality improvement. Include:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Patient name and identifier</li>
          <li>Date and time of extravasation</li>
          <li>Name of the drug, diluent (if applicable), and concentration</li>
          <li>Description of the IV access (type, location, gauge)</li>
          <li>Estimated amount of extravasated drug/fluid</li>
          <li>Signs and symptoms observed (and reported by patient)</li>
          <li>Appearance of the site (including measurements, photos if taken)</li>
          <li>Management steps taken (including time, antidote used, thermal application)</li>
          <li>Notification of physician/prescriber</li>
          <li>Patient education provided</li>
          <li>Follow-up plan</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Prevention of Extravasation</h2>
        <p className="mb-4">
          Prevention is the best strategy. Key measures include:
        </p>
        <h3 className="text-xl font-medium mb-2">General Guidelines:</h3>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>Proper training for staff involved in IV administration.</li>
          <li>Careful patient assessment for risk factors.</li>
          <li>Use of appropriate IV access devices and sites.</li>
          <li>Familiarity with extravasation management protocols and kits.</li>
          <li>Regularly checking the extravasation kit contents.</li>
          <li>Patient education regarding symptoms to report.</li>
        </ul>
        <h3 className="text-xl font-medium mb-2">Peripheral IV Access Strategies:</h3>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>Avoid inserting cannulas in joints or the antecubital fossa.</li>
          <li>Use veins on the back of the hand or forearm cautiously.</li>
          <li>Secure the cannula properly.</li>
          <li>Do not cover the site with opaque gauze (use transparent dressing).</li>
          <li>Consider using a new IV site for vesicant administration if other IVs are running.</li>
          <li>Watch for edema, inflammation, and pain during administration.</li>
          <li>Check for blood backflow before/during administration and flush between drugs.</li>
          <li>Dilute drugs appropriately and infuse at the correct rate.</li>
          <li>Apply pressure after needle removal and elevate the limb.</li>
        </ul>
        <h3 className="text-xl font-medium mb-2">Central Venous Access Device (CVAD) Strategies:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Check for blood backflow before injection to confirm placement.</li>
          <li>Check for local discomfort or swelling by running saline before injecting the drug.</li>
          <li>Run saline solution through the catheter after injection.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Trusted Resources</h2>
        <p className="mb-4">For further information, consult these resources:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7431942/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
              Kim JT, Park JY, Lee HJ, Cheon YJ. Guidelines for the management of extravasation. J Educ Eval Health Prof. 2020;17:21.
            </a>
          </li>
          <li>Infusion Nurses Society (INS) Guidelines</li>
          <li>Oncology Nursing Society (ONS) Guidelines (for chemotherapy extravasation)</li>
          {/* Add more links as identified */}
        </ul>
      </section>
    </div>
  );
};

export default EducationPage;

