"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    cartItems: CartItem[];
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

      setCartItems(data.data?.cartItems ?? []);
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
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/orders/checkout", { method: "POST" });
      const data: { success: boolean; data?: { orderId: string }; error?: { message?: string } } = await res.json();

      if (!res.ok) {
        toast.error(data.error?.message || "Checkout failed.");
        return;
      }

      toast.success("Order created. Submit payment to continue.");
      router.push(`/orders/${data.data.orderId}`);
    } catch (error) {
      console.error(error);
      toast.error("Unable to checkout.");
    }
  };

  return (
    <div className="min-h-screen bg-gat-off-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gat-steel">
              Cart
            </p>
            <h1 className="text-3xl md:text-4xl font-heading font-black text-gat-midnight">
              Your Cart
            </h1>
          </div>
          <Button
            onClick={handleCheckout}
            disabled={cartItems.length === 0 || loading}
            className="bg-gat-blue text-white hover:bg-gat-midnight"
          >
            Checkout
          </Button>
        </div>

        {loading ? (
          <div className="rounded-xl bg-white p-6 border border-gat-blue/10 shadow-sm">
            Loading cart...
          </div>
        ) : cartItems.length === 0 ? (
          <div className="rounded-xl bg-white p-10 border border-gat-blue/10 text-center">
            <p className="text-gat-steel">Your cart is empty.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white border border-gat-blue/10 rounded-xl p-5 shadow-sm"
              >
                <div>
                  <p className="text-lg font-heading font-bold text-gat-midnight">
                    {item.event.name}
                  </p>
                  <p className="text-sm text-gat-steel">
                    {item.event.type} • {item.event.category}
                    {item.team?.name ? ` • Team: ${item.team.name}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-gat-dark-gold font-bold">
                    ₹{Number(item.event.price).toFixed(2)}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between bg-white border border-gat-blue/10 rounded-xl p-5">
              <span className="text-sm uppercase tracking-widest text-gat-steel font-bold">
                Subtotal
              </span>
              <span className="text-xl font-heading font-black text-gat-midnight">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
