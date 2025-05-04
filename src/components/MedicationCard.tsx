// src/components/MedicationCard.tsx
import Link from "next/link";
import { Medication } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react"; // Icon for free items

interface MedicationCardProps {
    medication: Medication;
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

export default function MedicationCard({ medication }: MedicationCardProps) {
    const firstAntidote = medication.antidotes?.find(a => a.priority === "First Choice")?.name || "N/A";

    let riskVariant: "default" | "destructive" | "secondary" | "outline" = "secondary";
    if (medication.extravasation_risk === "Vesicant") riskVariant = "destructive";
    else if (medication.extravasation_risk === "Irritant") riskVariant = "default";

    let evidenceVariant: "default" | "destructive" | "secondary" | "outline" = "secondary";
    let evidenceText = medication.evidence_level || "N/A";
    if (medication.evidence_level === "High") {
        evidenceVariant = "default";
        evidenceText = "High Evidence";
    } else if (medication.evidence_level === "Moderate") {
        evidenceVariant = "secondary";
        evidenceText = "Moderate Evidence";
    }

    return (
        <Card className="flex flex-col h-full relative"> {/* Added relative positioning */}
            {/* Free Badge */} 
            {medication.is_free === 1 && (
                <Badge variant="default" className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white">
                    <Star className="h-3 w-3 mr-1" /> Free
                </Badge>
            )}
            
            <CardHeader className="pt-4"> {/* Adjusted padding */}
                <div className="flex justify-between items-start mb-1">
                    <CardTitle className="text-lg font-semibold leading-tight pr-16">{medication.name}</CardTitle> {/* Added padding right */} 
                    <Badge variant={riskVariant} className="ml-2 shrink-0">
                        {medication.extravasation_risk || "Unknown"}
                    </Badge>
                </div>
                {medication.brand_name && (
                    <p className="text-sm text-muted-foreground -mt-1">({medication.brand_name})</p>
                )}
            </CardHeader>
            <CardContent className="flex-grow text-sm text-muted-foreground space-y-1">
                <p><strong>Class:</strong> {medication.drug_class || "N/A"}</p>
                <p><strong>Indication:</strong> {medication.indication || "N/A"}</p>
                <p><strong>Antidote (1st):</strong> {firstAntidote}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                 <Badge 
                    variant={evidenceVariant} 
                    className="text-xs" 
                    title={getEvidenceDescription(medication.evidence_level)}
                 >
                    {evidenceText}
                 </Badge>
                <Button asChild variant="link" size="sm" className="p-0 h-auto">
                    <Link href={`/medications/${medication.id}`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

