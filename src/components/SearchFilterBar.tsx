// src/components/SearchFilterBar.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input"; // Use shadcn/ui Input
import { Button } from "@/components/ui/button"; // Use shadcn/ui Button
import { Search } from "lucide-react";

interface SearchFilterBarProps {
    initialQuery?: string;
}

export default function SearchFilterBar({ initialQuery = "" }: SearchFilterBarProps) {
    const [query, setQuery] = useState(initialQuery);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        setQuery(initialQuery);
    }, [initialQuery]);

    const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (query) {
            params.set("q", query);
        } else {
            params.delete("q");
        }
        router.push(`/medications?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2 mb-6">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search medications..."
                    className="pl-10 w-full" // Add padding for icon
                />
            </div>
            {/* Add filter dropdowns/buttons here later */}
            <Button type="submit">
                Search
            </Button>
        </form>
    );
}

