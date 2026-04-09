"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// The checkout flow is now handled via /cart ? /orders/[orderId]
export default function CheckoutRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/cart");
  }, [router]);
  return null;
}
