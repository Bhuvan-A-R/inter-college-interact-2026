import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/authCookie";
import { verifySession } from "@/lib/session";
import prisma from "@/lib/db";
import React from "react";

/**
 * Server-side layout guard for all /admin routes.
 * Performs a fresh Neon DB lookup on every request to verify:
 *  - The user exists in the database
 *  - emailVerified is true
 *  - role is ADMIN or SUPER_ADMIN
 * JWT claims alone are not trusted for admin access.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const newSession = await getAuthSession();
  const legacySession = await verifySession();
  const session = newSession ?? legacySession;

  if (!session?.id) {
    redirect("/auth/signin");
  }

  // Fresh DB lookup — do not rely on potentially stale JWT claims
  const user = await prisma.user.findUnique({
    where: { id: session.id as string },
    select: { role: true, emailVerified: true },
  });

  const isAdmin = user?.role === "SUPER_ADMIN";

  if (!user || !isAdmin || !user.emailVerified) {
    redirect("/dashboard?error=unauthorized");
  }

  return <>{children}</>;
}
