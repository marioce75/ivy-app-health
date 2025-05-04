// src/components/Header.tsx
import Link from "next/link";
import { Syringe } from "lucide-react"; // Using lucide-react included in template

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Syringe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span className="text-xl font-bold text-foreground">
                        IVY App
                    </span>
                </Link>
                <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/medications">Medications</NavLink>
                    <NavLink href="/education">Education</NavLink>
                    <NavLink href="/about">About</NavLink>
                    <NavLink href="/contact">Contact</NavLink>
                    {/* Add Subscription/Login links later */}
                </div>
                {/* Add Mobile Menu Button later */}
            </nav>
        </header>
    );
}

// Helper component for NavLink styling (can be moved to a separate file)
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    // Add active link styling later using usePathname
    return (
        <Link 
            href={href} 
            className="text-muted-foreground transition-colors hover:text-foreground"
        >
            {children}
        </Link>
    );
}

