// src/app/medications/page.tsx
import { getRequestContext } from "@cloudflare/next-on-pages";
import { getAllMedications, searchMedications } from "@/lib/db"; // Use alias path
import { Medication } from "@/lib/types"; // Use alias path
import MedicationCard from "@/components/MedicationCard"; // Create this component
import SearchFilterBar from "@/components/SearchFilterBar"; // Create this component

export const runtime = "edge"; // Required for Cloudflare Pages integration

interface MedicationsPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function MedicationsPage({ searchParams }: MedicationsPageProps) {
    let medications: Medication[] = [];
    const query = typeof searchParams.q === "string" ? searchParams.q : undefined;
    const env = getRequestContext().env as { DB: D1Database }; // Get Cloudflare environment

    try {
        if (query) {
            medications = await searchMedications(env, query);
        } else {
            medications = await getAllMedications(env, 100); // Load initial batch
        }
    } catch (error) {
        console.error("Failed to fetch medications:", error);
        // Handle error display in UI
        return (
            <div>
                <h1 className="text-3xl font-bold mb-6">Medication Database</h1>
                <SearchFilterBar />
                <p className="text-red-500 mt-4">Error loading medications. Please try again later.</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Medication Database</h1>
            <SearchFilterBar initialQuery={query} />
            
            {medications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {medications.map((med) => (
                        <MedicationCard key={med.id} medication={med} />
                    ))}
                </div>
            ) : (
                <p className="mt-6 text-center text-gray-500">
                    {query ? `No medications found matching "${query}".` : "No medications available."}
                </p>
            )}
            {/* Add pagination later */}
        </div>
    );
}

