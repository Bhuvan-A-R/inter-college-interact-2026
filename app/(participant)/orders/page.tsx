"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentData, setPaymentData] = useState<
    Record<string, { upiTransactionId: string; paymentScreenshotUrl: string }>
  >({});

  const loadOrders = async () => {
    setLoading(true);
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

      setOrders(data.data?.orders ?? []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleChange = (
    orderId: string,
    field: "upiTransactionId" | "paymentScreenshotUrl",
    value: string,
  ) => {
    setPaymentData((prev) => ({
      ...prev,
      [orderId]: {
        upiTransactionId: prev[orderId]?.upiTransactionId ?? "",
        paymentScreenshotUrl: prev[orderId]?.paymentScreenshotUrl ?? "",
        [field]: value,
      },
    }));
  };

  const handlePayment = async (orderId: string) => {
    const payload = paymentData[orderId];
    if (!payload?.upiTransactionId || !payload?.paymentScreenshotUrl) {
      toast.error("Enter both UPI transaction ID and screenshot URL.");
      return;
    }

    try {
      const res = await fetch(`/api/orders/${orderId}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error?.message || "Payment submission failed.");
        return;
      }

      toast.success("Payment submitted successfully.");
      loadOrders();
    } catch (error) {
      console.error(error);
      toast.error("Unable to submit payment.");
    }
  };

  return (
    <div className="min-h-screen bg-gat-off-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gat-steel">
            Orders
          </p>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-gat-midnight">
            Your Orders
          </h1>
        </div>

        {loading ? (
          <div className="rounded-xl bg-white p-6 border border-gat-blue/10 shadow-sm">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-xl bg-white p-10 border border-gat-blue/10 text-center">
            <p className="text-gat-steel">No orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gat-blue/10 rounded-xl p-5 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="text-lg font-heading font-bold text-gat-midnight">
                      Order {order.id.slice(0, 8)}
                    </p>
                    <p className="text-sm text-gat-steel">
                      Status: {order.status}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-gat-dark-gold">
                    ₹{Number(order.totalAmount ?? 0).toFixed(2)}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  {order.orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm text-gat-steel"
                    >
                      <span>
                        {item.event.name}
                        {item.Team?.name ? ` • Team: ${item.Team.name}` : ""}
                      </span>
                      <span className="font-mono text-gat-dark-gold">
                        ₹{Number(item.price).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {order.status === "PENDING_PAYMENT" && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3">
                    <Input
                      placeholder="UPI Transaction ID"
                      value={paymentData[order.id]?.upiTransactionId ?? ""}
                      onChange={(event) =>
                        handleChange(
                          order.id,
                          "upiTransactionId",
                          event.target.value,
                        )
                      }
                    />
                    <Input
                      placeholder="Payment Screenshot URL"
                      value={paymentData[order.id]?.paymentScreenshotUrl ?? ""}
                      onChange={(event) =>
                        handleChange(
                          order.id,
                          "paymentScreenshotUrl",
                          event.target.value,
                        )
                      }
                    />
                    <Button
                      onClick={() => handlePayment(order.id)}
                      className="bg-gat-blue text-white hover:bg-gat-midnight"
                    >
                      Submit Payment
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
