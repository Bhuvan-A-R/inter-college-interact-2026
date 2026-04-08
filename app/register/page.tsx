// redirent to auth/sigin using next router

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/register/getallregister");
    }, [router]);

    return null;
}
