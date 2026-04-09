"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth-context";

// ─── All auth logic below is intentionally untouched ─────────────────────────

const LoginLogoutButton = () => {
  const { isLoggedIn, role, setIsLoggedIn } = useAuthContext();
  const isAdmin = role === "SUPER_ADMIN" || role === "ADMIN";
  const isParticipant = role === "PARTICIPANT" || (isLoggedIn && role !== null && !isAdmin);
  const router = useRouter();

  const [cartCount, setCartCount] = useState(0);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [pendingInviteCount, setPendingInviteCount] = useState(0);

  useEffect(() => {
    if (!isParticipant) {
      setCartCount(0);
      setPendingOrderCount(0);
      setPendingInviteCount(0);
      return;
    }

    // Fetch cart count
    fetch("/api/cart")
      .then((r) => r.json())
      .then((d) => { if (d.success) setCartCount(d.data?.items?.length ?? 0); })
      .catch(() => {});

    // Fetch pending-payment orders count
    fetch("/api/orders")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          const count = (d.data?.items ?? []).filter(
            (o: { status: string }) => o.status === "PENDING_PAYMENT"
          ).length;
          setPendingOrderCount(count);
        }
      })
      .catch(() => {});

    // Fetch pending invites count
    fetch("/api/invites")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setPendingInviteCount(d.data?.invites?.PENDING?.length ?? 0);
      })
      .catch(() => {});
  }, [isParticipant]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
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
          {isAdmin ? (
            // SUPER_ADMIN / ADMIN: registered students list + payment dashboard
            <>
              <Link id="dashboard-link" href="/adminDashboard" className={baseBtn}>
                Registrations
              </Link>
              <Link id="payments-link" href="/admin" className={baseBtn}>
                Payments
              </Link>
            </>
          ) : isParticipant ? (
            // PARTICIPANT (or any non-admin logged-in user): full nav
            <>
              <Link id="dashboard-link" href="/dashboard" className={baseBtn}>
                Dashboard
              </Link>
              <Link id="cart-link" href="/cart" className={`${baseBtn} relative`}>
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1 leading-none">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
              <Link id="teams-link" href="/teams" className={baseBtn}>
                Teams
              </Link>
              <Link id="invites-link" href="/invites" className={`${baseBtn} relative`}>
                Invites
                {pendingInviteCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1 leading-none">
                    {pendingInviteCount > 99 ? "99+" : pendingInviteCount}
                  </span>
                )}
              </Link>
              <Link id="orders-link" href="/orders" className={`${baseBtn} relative`}>
                Orders
                {pendingOrderCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1 leading-none">
                    {pendingOrderCount > 99 ? "99+" : pendingOrderCount}
                  </span>
                )}
              </Link>
            </>
          ) : null /* role still loading — render nothing until checkAuth resolves */}
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
