// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";

// Metadata for the homepage
export const metadata: Metadata = {
  title: "IVY App: Evidence-Based IV Medication Management", // Keep the default title for home
  description: "Your essential resource for evidence-based IV medication administration, extravasation management, antidotes, and line requirements. Designed for healthcare professionals.",
  // Keywords are inherited from layout, but can add specific ones if needed
};

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
        The Gold Standard for IV Medication Management
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
        Access comprehensive, evidence-based information on IV drugs, extravasation protocols, antidotes, and administration guidelines. Built for busy healthcare professionals.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/medications">Browse Medications</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/subscribe">Learn About Subscription</Link>
        </Button>
      </div>

      {/* Optional: Add featured content or sections here */}
      {/* Example: Featured Medications or Quick Links */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl pt-8">
        <Card>
          <CardHeader>
            <CardTitle>Featured Drug</CardTitle>
            <CardDescription>Example: Norepinephrine</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Key details about a featured drug...</p>
            <Button variant="link" asChild className="p-0 h-auto mt-2">
              <Link href="/medications/norepinephrine-id">Learn More</Link> 
            </Button>
          </CardContent>
        </Card>
         Add more cards 
      </div> */}
    </div>
  );
}

