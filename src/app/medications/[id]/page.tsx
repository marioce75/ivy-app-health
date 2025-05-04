// src/app/medications/[id]/page.tsx
import { getRequestContext } from "@cloudflare/next-on-pages";
import { getMedicationById, parseLineRequirements } from "@/lib/db";
import { Medication, Antidote, MedicationReference } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExternalLink } from "lucide-react";
import SubscriptionPrompt from "@/components/SubscriptionPrompt"; // Import the prompt
import type { Metadata, ResolvingMetadata } from 'next'; // Import Metadata types

export const runtime = "edge";

interface MedicationDetailPageProps {
    params: { id: string };
}

// Generate dynamic metadata
export async function generateMetadata(
  { params }: MedicationDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;
  const env = getRequestContext().env as { DB: D1Database };
  let medication: Medication | null = null;

  try {
    medication = await getMedicationById(env, id);
  } catch (error) {
    console.error(`Failed to fetch medication for metadata with ID ${id}:`, error);
  }

  if (!medication) {
    // Return default metadata or handle error appropriately
    return {
      title: "Medication Not Found",
      description: "The requested medication could not be found.",
    };
  }

  const pageTitle = `${medication.name}${medication.brand_name ? ` (${medication.brand_name})` : ''} - IV Medication Details`;
  const pageDescription = `Evidence-based information for ${medication.name}: administration, extravasation management, antidotes, line requirements, and references. For healthcare professionals.`;

  // Optionally merge with parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      // images: ['/some-specific-page-image.jpg', ...previousImages], // Add specific image if available
    },
  };
}


// Helper to get evidence level description
function getEvidenceDescription(evidenceLevel: string | null | undefined): string {
    switch (evidenceLevel?.toLowerCase()) {
        case "high": return "High: Strong evidence from multiple high-quality studies";
        case "moderate": return "Moderate: Evidence from at least one high-quality study or multiple moderate-quality studies";
        case "limited": return "Limited: Evidence from at least one moderate-quality study or multiple low-quality studies";
        case "insufficient": return "Insufficient: Insufficient evidence or evidence from low-quality studies only";
        default: return "Evidence level indicates the quality and strength of scientific research supporting this recommendation.";
    }
}

export default async function MedicationDetailPage({ params }: MedicationDetailPageProps) {
    const { id } = params;
    const env = getRequestContext().env as { DB: D1Database };
    let medication: Medication | null = null;
    // TODO: Implement actual user subscription check later
    const isSubscribed = false; // Placeholder: Assume user is NOT subscribed

    try {
        medication = await getMedicationById(env, id);
    } catch (error) {
        console.error(`Failed to fetch medication with ID ${id}:`, error);
        // Consider showing an error message to the user instead of just notFound()
    }

    if (!medication) {
        notFound();
    }

    // Check if content is restricted
    const isRestricted = medication.is_free !== 1 && !isSubscribed;

    const lineReqs = parseLineRequirements(medication.line_requirements);

    let riskVariant: "default" | "destructive" | "secondary" | "outline" = "secondary";
    if (medication.extravasation_risk === "Vesicant") riskVariant = "destructive";
    else if (medication.extravasation_risk === "Irritant") riskVariant = "default";

    let evidenceVariant: "default" | "destructive" | "secondary" | "outline" = "secondary";
    if (medication.evidence_level === "High") evidenceVariant = "default";
    else if (medication.evidence_level === "Moderate") evidenceVariant = "secondary";

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-1 text-foreground">{medication.name}</h1>
                {medication.brand_name && (
                    <p className="text-lg text-muted-foreground mb-3">({medication.brand_name})</p>
                )}
                <div className="flex flex-wrap gap-2 items-center">
                    <Badge variant={riskVariant}>{medication.extravasation_risk || "Unknown"}</Badge>
                    {medication.drug_class && (
                        <Badge variant="outline">Class: {medication.drug_class}</Badge>
                    )}
                     <Badge variant={evidenceVariant} title={getEvidenceDescription(medication.evidence_level)}>
                        Evidence: {medication.evidence_level || "N/A"}
                     </Badge>
                     {medication.is_free === 1 && (
                        <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white">Free Access</Badge>
                     )}
                </div>
            </div>

            <Separator className="my-8" />

            {/* Conditional Content: Prompt or Details */}
            {isRestricted ? (
                <SubscriptionPrompt medicationName={medication.name} />
            ) : (
                /* Main Content Grid */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column (Main Details) */}
                    <div className="lg:col-span-2 space-y-8">
                        {medication.indication && (
                            <DetailSection title="Indication">
                                <p>{medication.indication}</p>
                            </DetailSection>
                        )}
                        
                        <DetailSection title="Administration Recommendations">
                            <p>{medication.administration_recommendations || "N/A - Information to be added."}</p>
                        </DetailSection>

                        <DetailSection title="Line Requirements">
                            <div className="flex flex-wrap gap-2">
                                <Badge variant={lineReqs.central ? "default" : "outline"}>Central: {lineReqs.central ? "Yes" : "No"}</Badge>
                                <Badge variant={lineReqs.peripheral ? "default" : "outline"}>Peripheral: {lineReqs.peripheral ? "Yes" : "No"}</Badge>
                                <Badge variant={lineReqs.midline ? "default" : "outline"}>Midline: {lineReqs.midline ? "Yes" : "No"}</Badge>
                            </div>
                        </DetailSection>

                        <DetailSection title="Extravasation Management">
                            <p>{medication.extravasation_management || "N/A"}</p>
                        </DetailSection>

                        {medication.mechanism_of_injury && (
                            <DetailSection title="Mechanism of Injury">
                                <p>{medication.mechanism_of_injury}</p>
                            </DetailSection>
                        )}

                        <DetailSection title="Antidotes">
                            {medication.antidotes && medication.antidotes.length > 0 ? (
                                <div className="space-y-4">
                                    {medication.antidotes.map((antidote) => (
                                        <Card key={antidote.id || antidote.name} className="bg-card/50 dark:bg-gray-800/50"> {/* Adjusted background */}
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-lg flex justify-between items-center">
                                                    {antidote.name}
                                                    <Badge variant="secondary">{antidote.priority || "N/A"}</Badge>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="text-sm text-muted-foreground space-y-1">
                                                {antidote.preparation && <p><strong>Preparation:</strong> {antidote.preparation}</p>}
                                                {antidote.administration && <p><strong>Administration:</strong> {antidote.administration}</p>}
                                                {antidote.evidence_level && <p><strong>Evidence:</strong> <span title={getEvidenceDescription(antidote.evidence_level)}>{antidote.evidence_level}</span></p>}
                                                {antidote.reference && 
                                                    <p><strong>Ref:</strong> <a href={antidote.reference} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">View <ExternalLink className="h-3 w-3 ml-1"/></a></p>}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No specific antidotes listed.</p>
                            )}
                        </DetailSection>
                    </div>

                    {/* Right Column (Additional Info & References) */}
                    <div className="lg:col-span-1 space-y-8">
                        <Card className="bg-card/50 dark:bg-gray-800/50"> {/* Adjusted background */}
                            <CardHeader><CardTitle className="text-xl">Additional Information</CardTitle></CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <InfoItem title="Dosage Considerations" content={medication.dosage_considerations || "N/A - Information to be added."} />
                                <InfoItem title="Preparation Guidelines" content={medication.preparation_guidelines || "N/A - Information to be added."} />
                                <InfoItem title="Administration Guidelines" content={medication.administration_guidelines || "N/A - Information to be added."} />
                            </CardContent>
                        </Card>
                        
                        <Card className="bg-card/50 dark:bg-gray-800/50"> {/* Adjusted background */}
                             <CardHeader><CardTitle className="text-xl">References</CardTitle></CardHeader>
                             <CardContent>
                                {medication.references && medication.references.length > 0 ? (
                                    <ul className="space-y-2">
                                        {medication.references.map((ref) => (
                                            <li key={ref.id || ref.url} className="text-sm text-muted-foreground">
                                                {ref.url ? (
                                                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                                                        {ref.citation || ref.url}
                                                        <ExternalLink className="h-3 w-3 ml-1 shrink-0"/>
                                                    </a>
                                                ) : (
                                                    <span>{ref.citation || "N/A"}</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No references listed.</p>
                                )}
                             </CardContent>
                        </Card>
                        {medication.last_updated && (
                             <p className="text-xs text-muted-foreground text-center mt-4">Last Updated: {new Date(medication.last_updated).toLocaleDateString()}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper component for consistent section styling
function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section>
            <h2 className="text-xl font-semibold mb-3 text-foreground border-b pb-2 border-border">{title}</h2> {/* Added border color */}
            <div className="text-muted-foreground text-sm space-y-2">
                {children}
            </div>
        </section>
    );
}

// Helper for info items in the right column
function InfoItem({ title, content }: { title: string; content: string }) {
    return (
        <div>
            <h3 className="font-medium text-foreground mb-1">{title}</h3>
            <p className="text-muted-foreground">{content}</p>
        </div>
    );
}

