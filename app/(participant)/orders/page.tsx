"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type OrderItem = {
  id: string;
  price: number | string;
  event: {
    id: string;
    name: string;
    type: "SOLO" | "TEAM";
    category: string;
  };
  Team?: { id: string; name: string } | null;
};

type Order = {
  id: string;
  status: "PENDING_PAYMENT" | "PAYMENT_SUBMITTED" | "VERIFIED" | "REJECTED";
  totalAmount: number | string;
  createdAt: string;
  orderItems: OrderItem[];
};

type OrdersResponse = {
  success: boolean;
  data?: { items: Order[] };
  error?: { message?: string };
};

const statusConfig: Record<
  Order["status"],
  { label: string; className: string }
> = {
  PENDING_PAYMENT: {
    label: "Pending Payment",
    className: "text-amber-700 bg-amber-50 border-amber-200",
  },
  PAYMENT_SUBMITTED: {
    label: "Under Review",
    className: "text-blue-700 bg-blue-50 border-blue-200",
  },
  VERIFIED: {
    label: "Verified",
    className: "text-green-700 bg-green-50 border-green-200",
  },
  REJECTED: {
    label: "Rejected",
    className: "text-red-700 bg-red-50 border-red-200",
  },
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/orders");
        const data: OrdersResponse = await res.json();

        if (!res.ok) {
          if (res.status === 401) {
            toast.error("Please sign in to continue.");
            router.push("/auth/signin");
            return;
          }
          toast.error(data.error?.message || "Failed to load orders.");
          return;
        }

        setOrders(data.data?.items ?? []);
      } catch (err) {
        console.error(err);
        toast.error("Unable to load orders.");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  return (
    <div className="min-h-screen bg-gat-off-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gat-steel">
            Orders
          </p>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-gat-midnight">
            Order History
          </h1>
        </div>

        {loading ? (
          <div className="rounded-xl bg-white p-6 border border-gat-blue/10 shadow-sm text-gat-steel">
            Loading orders…
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-xl bg-white p-12 border border-gat-blue/10 shadow-sm text-center flex flex-col items-center gap-3">
            <p className="text-3xl">🧾</p>
            <p className="font-heading font-bold text-lg text-gat-midnight">No orders yet</p>
            <p className="text-sm text-gat-steel">Once you checkout your cart, your orders will appear here.</p>
            <Link href="/cart">
              <Button className="mt-2">Go to Cart</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const cfg = statusConfig[order.status];
              const isPending = order.status === "PENDING_PAYMENT";
              const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              return (
                <div
                  key={order.id}
                  className="bg-white border border-gat-blue/10 rounded-xl p-5 shadow-sm"
                >
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div>
                      <p className="font-mono text-xs text-gat-steel mb-1">
                        #{order.id.slice(0, 8).toUpperCase()} · {date}
                      </p>
                      <p className="text-xl font-heading font-black text-gat-midnight">
                        ₹{Number(order.totalAmount).toFixed(2)}
                      </p>
                    </div>
                    <span
                      className={`self-start sm:self-auto text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${cfg.className}`}
                    >
                      {cfg.label}
                    </span>
                  </div>

                  {/* Event list */}
                  <div className="space-y-1.5 mb-4">
                    {order.orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gat-midnight">
                          {item.event.name}
                          {item.Team?.name && (
                            <span className="text-gat-steel ml-1">
                              · {item.Team.name}
                            </span>
                          )}
                        </span>
                        <span className="font-mono text-gat-steel text-xs">
                          ₹{Number(item.price).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action button */}
                  <Link href={`/orders/${order.id}`}>
                    <Button
                      variant={isPending ? "default" : "outline"}
                      className={
                        isPending
                          ? "bg-gat-blue text-white hover:bg-gat-midnight w-full sm:w-auto"
                          : "w-full sm:w-auto"
                      }
                    >
                      {isPending ? "Complete Payment →" : "View Details"}
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


type OrderItem = {
  id: string;
  price: number | string;
  event: {
    id: string;
    name: string;
    type: "SOLO" | "TEAM";
    category: string;
    price: number | string;
  };
  Team?: {
    id: string;
    name: string;
  } | null;
};

type Order = {
  id: string;
  status: "PENDING_PAYMENT" | "PAYMENT_SUBMITTED" | "VERIFIED" | "REJECTED";
  totalAmount?: number | string;
  createdAt?: string;
  orderItems: OrderItem[];
};

type OrdersResponse = {
  success: boolean;
  data?: { orders: Order[] };
  error?: { message?: string };
};

