"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trash2, ShoppingBag, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type CartItem = {
  id: string;
  event: {
    id: string;
    name: string;
    type: "SOLO" | "TEAM";
    category: string;
    price: number | string;
  };
  team?: {
    id: string;
    name: string;
  } | null;
};

type CartResponse = {
  success: boolean;
  data?: {
    items: CartItem[];
    subtotal: number;
  };
  error?: {
    message?: string;
  };
};

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkingOut, setCheckingOut] = useState<boolean>(false);
  const [removing, setRemoving] = useState<string | null>(null);

  const loadCart = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart");
      const data: CartResponse = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Please sign in to view your cart.");
          router.push("/auth/signin");
          return;
        }
        toast.error(data.error?.message || "Failed to load cart.");
        return;
      }

      setCartItems(data.data?.items ?? []);
      setSubtotal(data.data?.subtotal ?? 0);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (cartItemId: string) => {
    setRemoving(cartItemId);
    try {
      const res = await fetch(`/api/cart/items/${cartItemId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error?.message || "Failed to remove item.");
        return;
      }

      toast.success("Item removed.");
      loadCart();
    } catch (error) {
      console.error(error);
      toast.error("Unable to remove item.");
    } finally {
      setRemoving(null);
    }
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const res = await fetch("/api/orders/checkout", { method: "POST" });
      const data: {
        success: boolean;
        data?: { orderId: string };
        error?: { message?: string };
      } = await res.json();

      if (!res.ok) {
        toast.error(data.error?.message || "Checkout failed.");
        return;
      }

      toast.success("Order created. Submit payment to continue.");
      router.push(`/orders/${data.data!.orderId}`);
    } catch (error) {
      console.error(error);
      toast.error("Unable to checkout.");
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gat-off-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gat-steel">
              Cart
            </p>
            <h1 className="text-3xl md:text-4xl font-heading font-black text-gat-midnight">
              Your Cart
            </h1>
          </div>
          {!loading && cartItems.length > 0 && (
            <Link href="/events">
              <Button variant="outline" className="flex items-center gap-2 text-gat-blue border-gat-blue/30 hover:bg-gat-blue hover:text-white">
                <PlusCircle className="w-4 h-4" />
                Add More Events
              </Button>
            </Link>
          )}
        </div>

        {loading ? (
          <div className="rounded-xl bg-white p-6 border border-gat-blue/10 shadow-sm text-gat-steel">
            Loading cart…
          </div>
        ) : cartItems.length === 0 ? (
          /* ── Empty state ── */
          <div className="rounded-xl bg-white p-12 border border-gat-blue/10 shadow-sm text-center flex flex-col items-center gap-4">
            <p className="text-4xl">🛒</p>
            <p className="font-heading font-bold text-xl text-gat-midnight">
              Your cart is empty
            </p>
            <p className="text-sm text-gat-steel">
              Browse events and add them to your cart to register.
            </p>
            <Link href="/events">
              <Button className="mt-2">Browse Events</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* ── Item list ── */}
            <div className="rounded-xl border border-gat-blue/10 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gat-midnight text-white">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold">Event</th>
                    <th className="text-left px-5 py-3 font-semibold">Type</th>
                    <th className="text-left px-5 py-3 font-semibold">Team</th>
                    <th className="text-right px-5 py-3 font-semibold">Price</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gat-blue/10">
                  {cartItems.map((item) => (
                    <tr key={item.id} className="bg-white hover:bg-gat-blue/5 transition-colors">
                      <td className="px-5 py-4 font-medium text-gat-midnight">
                        {item.event.name}
                        <span className="block text-xs text-gat-steel font-normal mt-0.5">
                          {item.event.category.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-gat-blue bg-gat-blue/10 px-2 py-1 rounded-full">
                          {item.event.type}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gat-steel">
                        {item.team?.name ?? <span className="italic text-gat-steel/60">—</span>}
                      </td>
                      <td className="px-5 py-4 text-right font-mono font-bold text-gat-dark-gold">
                        ₹{Number(item.event.price).toFixed(2)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleRemove(item.id)}
                          disabled={removing === item.id}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-40"
                          title="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Order Summary ── */}
            <div className="rounded-xl bg-white border border-gat-blue/10 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="w-4 h-4 text-gat-blue" />
                <h2 className="text-xs font-heading font-bold text-gat-steel uppercase tracking-widest">
                  Order Summary · {cartItems.length} event{cartItems.length !== 1 ? "s" : ""}
                </h2>
              </div>

              <div className="space-y-2 text-sm text-gat-steel divide-y divide-gat-blue/10">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between pt-2 first:pt-0">
                    <span className="text-gat-charcoal">
                      {item.event.name}
                      {item.team ? <span className="text-gat-steel"> · {item.team.name}</span> : ""}
                    </span>
                    <span className="font-mono">₹{Number(item.event.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-5 pt-4 border-t-2 border-gat-midnight">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gat-steel block">
                    Total Amount to be Paid
                  </span>
                  <span className="text-xs text-gat-steel/60">Single payment for all {cartItems.length} event{cartItems.length !== 1 ? "s" : ""}</span>
                </div>
                <span className="text-2xl font-heading font-black text-gat-midnight">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full mt-5 bg-gat-blue text-white hover:bg-gat-midnight text-base font-bold py-6"
              >
                {checkingOut ? "Processing…" : `Pay for All ${cartItems.length} Event${cartItems.length !== 1 ? "s" : ""} →`}
              </Button>

              <p className="text-xs text-gat-steel text-center mt-3">
                One UPI payment covers all events. Upload your screenshot after checkout.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
