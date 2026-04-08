"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

type AuthContextProviderProps = {
    children: React.ReactNode;
};

type AuthContext = {
    isLoggedIn: boolean;
    role: string | null;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuth: () => Promise<void>;
};

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthContextProvider({
    children,
}: AuthContextProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState<string | null>(null);

    const checkAuth = async () => {
        try {
            const response = await fetch("/api/checkAuth");
            const data = await response.json();
            setIsLoggedIn(data.success);
            setRole(data.success ? (data.role ?? null) : null);
        } catch (error) {
            console.error("Auth check failed:", error);
            setIsLoggedIn(false);
            setRole(null);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, role, setIsLoggedIn, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "useAuthContext must be used within an AuthContextProvider"
        );
    }
    return context;
}
