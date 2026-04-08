"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({
    children,
    ...props
}: {
    children: React.ReactNode;
}) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}

export function ThemeToggler() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative h-9 w-9"
        >
            {theme === "dark" ? (
                <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
            ) : (
                <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
            )}
        </Button>
    );
}
