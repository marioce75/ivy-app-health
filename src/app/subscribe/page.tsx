// src/app/subscribe/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function SubscribePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Subscribe to IVY App Pro</h1>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Unlock access to our complete database, advanced features, and expert insights to enhance your clinical practice.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Individual Plan */}
                <SubscriptionTier
                    title="Individual Pro"
                    price="$9.99"
                    frequency="per month"
                    features={[
                        "Access to all medication details",
                        "Advanced search & filtering",
                        "Offline access (coming soon)",
                        "Priority support"
                    ]}
                    ctaText="Subscribe Now"
                />

                {/* Institutional Plan */}
                <SubscriptionTier
                    title="Institutional Access"
                    price="Contact Us"
                    frequency="for custom pricing"
                    features={[
                        "Site license for multiple users",
                        "Usage analytics",
                        "Integration options (coming soon)",
                        "Dedicated account manager"
                    ]}
                    ctaText="Request Information"
                    isFeatured={true}
                />
            </div>

            <p className="text-center text-muted-foreground mt-12">
                Need help? <a href="/contact" className="text-primary hover:underline">Contact our support team</a>.
            </p>
        </div>
    );
}

// Helper component for Subscription Tier Card
interface SubscriptionTierProps {
    title: string;
    price: string;
    frequency: string;
    features: string[];
    ctaText: string;
    isFeatured?: boolean;
}

function SubscriptionTier({ title, price, frequency, features, ctaText, isFeatured = false }: SubscriptionTierProps) {
    return (
        <Card className={`flex flex-col ${isFeatured ? "border-primary border-2" : ""}`}>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription className="text-4xl font-bold text-foreground">{price}</CardDescription>
                <p className="text-muted-foreground">{frequency}</p>
            </CardHeader>
            <CardContent className="flex-grow">
                <ul className="space-y-3">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <div className="p-6 pt-0">
                <Button className="w-full" variant={isFeatured ? "default" : "outline"}>
                    {ctaText}
                </Button>
            </div>
        </Card>
    );
}

