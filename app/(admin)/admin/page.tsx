"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type OrderItem = {
  id: string;
  event: { id: string; name: string; type: "SOLO" | "TEAM"; category: string };
  Team?: { id: string; name: string } | null;
};

type PendingOrder = {
  id: string;
  totalAmount: number | string;
  upiTransactionId: string | null;
  paymentScreenshotUrl: string | null;
  paymentSubmittedAt: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    collegeName: string;
  };
  orderItems: OrderItem[];
};

type PaymentsResponse = {
  success: boolean;
  data?: { orders: PendingOrder[]; total: number };
  error?: { message?: string };
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<PendingOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/payments");
      const data: PaymentsResponse = await res.json();

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          toast.error("Access denied.");
          router.push("/auth/signin");
          return;
        }
        toast.error(data.error?.message || "Failed to load payments.");
        return;
      }

      setOrders(data.data?.orders ?? []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load payments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = async (orderId: string) => {
    setProcessing(orderId);
    try {
      const res = await fetch(`/api/admin/payments/${orderId}/verify`, {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error?.message || "Failed to verify payment.");
        return;
      }

      toast.success("Payment approved and registrations created.");
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (error) {
      console.error(error);
      toast.error("Unable to approve payment.");
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (orderId: string) => {
    const reason = window.prompt("Enter rejection reason (required):");
    if (reason === null) return;
    if (!reason.trim()) {
      toast.error("Rejection reason cannot be empty.");
      return;
    }

    setProcessing(orderId);
    try {
      const res = await fetch(`/api/admin/payments/${orderId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rejectionReason: reason.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error?.message || "Failed to reject payment.");
        return;
      }

      toast.success("Payment rejected.");
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (error) {
      console.error(error);
      toast.error("Unable to reject payment.");
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="min-h-screen bg-gat-off-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gat-steel">
              Admin
            </p>
            <h1 className="text-3xl md:text-4xl font-heading font-black text-gat-midnight">
              Payment Approval Dashboard
            </h1>
            <p className="text-sm text-gat-steel mt-1">
              Review and approve or reject pending UPI payments.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={loadOrders}
            disabled={loading}
            className="shrink-0"
          >
            {loading ? "Loading…" : "Refresh"}
          </Button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="rounded-xl bg-white p-8 border border-gat-blue/10 shadow-sm text-gat-steel">
            Loading payments…
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-xl bg-white p-12 border border-gat-blue/10 shadow-sm text-center">
            <p className="text-2xl mb-2">✅</p>
            <p className="font-heading font-bold text-gat-midnight">
              All caught up!
            </p>
            <p className="text-sm text-gat-steel mt-1">
              No pending payments to review.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-gat-blue/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gat-midnight text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                      Participant
                    </th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                      Event(s)
                    </th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                      Total Amount
                    </th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                      UPI Transaction ID
                    </th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                      Transaction Photo
                    </th>
                    <th className="text-center px-4 py-3 font-semibold whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gat-blue/10">
                  {orders.map((order) => {
                    const isProcessing = processing === order.id;
                    const eventNames = order.orderItems
                      .map(
                        (item) =>
                          `${item.event.name}${item.Team ? ` (Team: ${item.Team.name})` : ""}`
                      )
                      .join(", ");

                    return (
                      <tr
                        key={order.id}
                        className="bg-white hover:bg-gat-blue/5 transition-colors align-top"
                      >
                        {/* Participant */}
                        <td className="px-4 py-3">
                          <p className="font-medium text-gat-midnight">
                            {order.user.name}
                          </p>
                          <p className="text-xs text-gat-steel">
                            {order.user.email}
                          </p>
                          <p className="text-xs text-gat-steel">
                            {order.user.collegeName}
                          </p>
                        </td>

                        {/* Event(s) */}
                        <td className="px-4 py-3 max-w-[200px]">
                          <p className="text-xs text-gat-midnight leading-relaxed">
                            {eventNames}
                          </p>
                        </td>

                        {/* Amount */}
                        <td className="px-4 py-3 whitespace-nowrap font-mono font-bold text-gat-dark-gold">
                          ₹{Number(order.totalAmount).toFixed(2)}
                        </td>

                        {/* UPI Txn ID */}
                        <td className="px-4 py-3 font-mono text-xs text-gat-midnight">
                          {order.upiTransactionId ?? (
                            <span className="text-gat-steel italic">—</span>
                          )}
                        </td>

                        {/* Transaction Photo */}
                        <td className="px-4 py-3">
                          {order.paymentScreenshotUrl ? (
                            <a
                              href={order.paymentScreenshotUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-gat-blue underline text-xs hover:text-gat-midnight font-semibold"
                            >
                              View Photo ↗
                            </a>
                          ) : (
                            <span className="text-gat-steel italic text-xs">
                              Not uploaded
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex gap-2 justify-center">
                            <Button
                              size="sm"
                              disabled={isProcessing}
                              onClick={() => handleApprove(order.id)}
                              className="bg-green-600 hover:bg-green-700 text-white text-xs h-8 px-4 font-semibold"
                            >
                              {isProcessing ? "…" : "Approve"}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={isProcessing}
                              onClick={() => handleReject(order.id)}
                              className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 text-xs h-8 px-4 font-semibold"
                            >
                              {isProcessing ? "…" : "Reject"}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="bg-white border-t border-gat-blue/10 px-4 py-3 text-xs text-gat-steel">
              {orders.length} pending payment{orders.length !== 1 ? "s" : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
