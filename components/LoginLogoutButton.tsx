"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth-context";

// ─── All auth logic below is intentionally untouched ─────────────────────────

const LoginLogoutButton = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(false);
        router.push("/auth/signin");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  // ─── Visual layer only changes below ─────────────────────────────────────

  const baseBtn =
    "inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold tracking-wide border transition-all duration-300 ";

  const glassBtn =
    baseBtn +
    "bg-white/5 border-white/10 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-sm";

  const primaryBtn =
    baseBtn +
    "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]";

  return (
    <div className="flex items-center gap-2">
      {isLoggedIn ? (
        <>
          <Link id="dashboard-link" href="/register/getallregister" className={baseBtn}>
            Dashboard
          </Link>
          <Link id="cart-link" href="/cart" className={baseBtn}>
            Cart
          </Link>
          <Link id="teams-link" href="/teams" className={baseBtn}>
            Teams
          </Link>
          <Link id="invites-link" href="/invites" className={baseBtn}>
            Invites
          </Link>
          <Link id="orders-link" href="/orders" className={baseBtn}>
            Orders
          </Link>
          <Link id="logout-link" href="/auth/logout" className={primaryBtn}>
            Logout
          </Link>
        </>
      ) : (
        <Link id="login-link" href="/auth/signin" className={primaryBtn}>
          Login / Register
        </Link>
      )}
    </div>
  );
};

export default LoginLogoutButton;
