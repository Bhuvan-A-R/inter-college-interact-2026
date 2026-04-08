"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth-context";
import { toast } from "sonner";

export default function LogoutPage() {
    const router = useRouter();
    const { setIsLoggedIn } = useAuthContext();

    useEffect(() => {
        (async () => {
            try {
                await fetch("/api/logout", { method: "POST" });
            } finally {
                router.push("/auth/signin");
                setIsLoggedIn(false);
                toast.success("Logged out", {
                    description: "You have been logged out successfully",
                });
            }
        })();
    }, [router, setIsLoggedIn]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            {/* Logging out animation goes here */}
            <p className=" text-white">Logging out...</p>
        </div>
    );
}
