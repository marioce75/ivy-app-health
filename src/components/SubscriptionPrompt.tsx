// src/components/SubscriptionPrompt.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock } from "lucide-react";

interface SubscriptionPromptProps {
    medicationName: string;
}

export default function SubscriptionPrompt({ medicationName }: SubscriptionPromptProps) {
    return (
        <Alert className="max-w-lg mx-auto my-12">
            <Lock className="h-4 w-4" />
            <AlertTitle className="font-bold">Subscription Required</AlertTitle>
            <AlertDescription className="mt-2">
                Detailed information for <strong>{medicationName}</strong> is available to subscribers.
                <br />
                Access comprehensive data, including advanced management protocols and expert insights, by subscribing to IVY App Pro.
            </AlertDescription>
            <div className="mt-4">
                <Button asChild>
                    <Link href="/subscribe">Learn More & Subscribe</Link>
                </Button>
            </div>
        </Alert>
    );
}

