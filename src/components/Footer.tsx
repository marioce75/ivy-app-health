// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="py-6 md:px-8 md:py-0 border-t border-border/40 bg-background">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    &copy; {currentYear} IVY App. All rights reserved. 
                    <span className="block md:inline mt-1 md:mt-0 md:ml-2">Information is for educational purposes only.</span>
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <Link href="/about" className="hover:text-foreground">About</Link>
                    <Link href="/contact" className="hover:text-foreground">Contact</Link>
                    <Link href="/disclaimer" className="hover:text-foreground">Disclaimer</Link>
                    {/* Add Privacy Policy, Terms later */}
                </div>
            </div>
        </footer>
    );
}

