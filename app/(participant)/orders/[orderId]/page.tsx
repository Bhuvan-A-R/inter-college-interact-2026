"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { UploadButton } from "@/utils/uploadthing";

type OrderItem = {
  id: string;
  price: number | string;
  event: {
    id: string;
    name: string;
    type: "SOLO" | "TEAM";
    category: string;
    imageUrl?: string | null;
  };
  Team?: { id: string; name: string } | null;
};

type Order = {
  id: string;
  status: "PENDING_PAYMENT" | "PAYMENT_SUBMITTED" | "VERIFIED" | "REJECTED";
  totalAmount: number | string;
  createdAt: string;
  upiTransactionId?: string | null;
  paymentSubmittedAt?: string | null;
  orderItems: OrderItem[];
};

type OrderResponse = {
  success: boolean;
  data?: { order: Order };
  error?: { message?: string };
};

export default function OrderPaymentPage() {
  const params = useParams<{ orderId: string }>();
  const orderId = params.orderId;
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [upiTransactionId, setUpiTransactionId] = useState("");
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      const data: OrderResponse = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Please sign in to continue.");
          router.push("/auth/signin");
          return;
        }
        if (res.status === 403 || res.status === 404) {
          toast.error("Order not found.");
          router.push("/orders");
          return;
        }
        toast.error(data.error?.message || "Failed to load order.");
        return;
      }

      if (data.data?.order) {
        setOrder(data.data.order);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to load order.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const handleSubmitPayment = async () => {
    if (!upiTransactionId.trim()) {
      toast.error("Please enter your UPI transaction ID.");
      return;
    }
    if (!screenshotUrl) {
      toast.error("Please upload your payment screenshot.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/orders/${orderId}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          upiTransactionId: upiTransactionId.trim(),
          paymentScreenshotUrl: screenshotUrl,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error?.message || "Payment submission failed.");
        return;
      }

      toast.success("Payment submitted successfully. Await admin verification.");
      loadOrder();
    } catch (error) {
      console.error(error);
      toast.error("Unable to submit payment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gat-off-white pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-6 border border-gat-blue/10 shadow-sm">
            Loading order...
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gat-off-white pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-10 border border-gat-blue/10 shadow-sm text-center">
            <p className="text-gat-steel">Order not found.</p>
            <Link
              href="/orders"
              className="text-gat-blue text-sm mt-2 inline-block hover:underline"
            >
              ← Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isTerminal =
    order.status === "PAYMENT_SUBMITTED" ||
    order.status === "VERIFIED" ||
    order.status === "REJECTED";

  const statusColors: Record<Order["status"], string> = {
    PENDING_PAYMENT: "text-amber-600 bg-amber-50",
    PAYMENT_SUBMITTED: "text-blue-600 bg-blue-50",
    VERIFIED: "text-green-700 bg-green-50",
    REJECTED: "text-red-600 bg-red-50",
  };

  const statusLabels: Record<Order["status"], string> = {
    PENDING_PAYMENT: "Pending Payment",
    PAYMENT_SUBMITTED: "Payment Submitted",
    VERIFIED: "Verified",
    REJECTED: "Rejected",
  };

  return (
    <div className="min-h-screen bg-gat-off-white pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/orders"
            className="text-xs text-gat-steel hover:text-gat-blue"
          >
            ← Back to Orders
          </Link>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gat-steel mt-3">
            Order
          </p>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-3xl md:text-4xl font-heading font-black text-gat-midnight">
              #{order.id.slice(0, 8).toUpperCase()}
            </h1>
            <span
              className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${statusColors[order.status]}`}
            >
              {statusLabels[order.status]}
            </span>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white border border-gat-blue/10 rounded-xl p-5 shadow-sm mb-6">
          <h2 className="text-lg font-heading font-bold text-gat-midnight mb-4">
            Items
          </h2>
          <div className="space-y-3">
            {order.orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm"
              >
                <div>
                  <p className="font-medium text-gat-midnight">
                    {item.event.name}
                  </p>
                  <p className="text-xs text-gat-steel">
                    {item.event.type}
                    {item.Team?.name ? ` • Team: ${item.Team.name}` : ""}
                  </p>
                </div>
                <span className="font-mono font-bold text-gat-dark-gold">
                  ₹{Number(item.price).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gat-blue/10 mt-4 pt-4 flex items-center justify-between">
            <span className="text-sm uppercase tracking-widest text-gat-steel font-bold">
              Total
            </span>
            <span className="text-xl font-heading font-black text-gat-midnight">
              ₹{Number(order.totalAmount).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Success / non-actionable states */}
        {order.status === "VERIFIED" && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
            <p className="text-green-700 font-bold text-lg">
              Payment Verified ✓
            </p>
            <p className="text-green-600 text-sm mt-1">
              Your registration is confirmed.
            </p>
          </div>
        )}

        {order.status === "PAYMENT_SUBMITTED" && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
            <p className="text-blue-700 font-bold text-lg">
              Payment Under Review
            </p>
            <p className="text-blue-600 text-sm mt-1">
              Your payment has been submitted and is awaiting admin verification.
            </p>
            {order.upiTransactionId && (
              <p className="text-blue-500 text-xs mt-2">
                UPI Transaction ID: {order.upiTransactionId}
              </p>
            )}
          </div>
        )}

        {order.status === "REJECTED" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
            <p className="text-red-600 font-bold text-lg">
              Payment Rejected
            </p>
            <p className="text-red-500 text-sm mt-1">
              This order has been rejected. Please contact the organizers.
            </p>
          </div>
        )}

        {/* Payment form — only for PENDING_PAYMENT */}
        {order.status === "PENDING_PAYMENT" && (
          <div className="space-y-6">
            {/* UPI QR Placeholder */}
            <div className="bg-white border border-gat-blue/10 rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-heading font-bold text-gat-midnight mb-4">
                UPI Payment
              </h2>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gat-blue/20 rounded-xl py-12 bg-gat-off-white">
                <div className="w-40 h-40 bg-gat-blue/10 rounded-xl flex items-center justify-center mb-3">
                  <span className="text-5xl">📱</span>
                </div>
                <p className="text-sm font-bold text-gat-midnight">
                  UPI QR Code
                </p>
                <p className="text-xs text-gat-steel mt-1">
                  (To Be Updated)
                </p>
              </div>
              <p className="text-xs text-gat-steel text-center mt-3">
                Scan the QR code with any UPI app and pay{" "}
                <span className="font-bold text-gat-midnight">
                  ₹{Number(order.totalAmount).toFixed(2)}
                </span>
              </p>
            </div>

            {/* Payment Submission Form */}
            <div className="bg-white border border-gat-blue/10 rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-heading font-bold text-gat-midnight mb-4">
                Submit Payment Proof
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gat-midnight mb-1.5 block">
                    UPI Transaction ID
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. 123456789012"
                    value={upiTransactionId}
                    onChange={(e) => setUpiTransactionId(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gat-midnight mb-1.5 block">
                    Payment Screenshot
                  </label>
                  {screenshotUrl ? (
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-green-200 bg-green-50">
                      <span className="text-green-700 text-sm font-medium flex-1 truncate">
                        ✓ Screenshot uploaded
                      </span>
                      <button
                        type="button"
                        onClick={() => setScreenshotUrl("")}
                        className="text-xs text-gat-steel hover:text-red-500 underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <UploadButton
                      endpoint="paymentScreenshotUploader"
                      onClientUploadComplete={(res) => {
                        if (res?.[0]?.url) {
                          setScreenshotUrl(res[0].url);
                          toast.success("Screenshot uploaded.");
                        }
                      }}
                      onUploadError={(error) => {
                        toast.error(`Upload failed: ${error.message}`);
                      }}
                      appearance={{
                        button:
                          "w-full bg-gat-blue text-white hover:bg-gat-midnight rounded-md h-10 text-sm font-medium ut-uploading:bg-gat-midnight",
                        allowedContent: "text-xs text-gat-steel",
                      }}
                    />
                  )}
                  <p className="text-xs text-gat-steel mt-1">
                    Upload a screenshot of your payment confirmation (max 4 MB).
                  </p>
                </div>

                <Button
                  onClick={handleSubmitPayment}
                  disabled={submitting || !upiTransactionId.trim() || !screenshotUrl}
                  className="w-full bg-gat-blue text-white hover:bg-gat-midnight"
                >
                  {submitting ? "Submitting..." : "Submit Payment"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
