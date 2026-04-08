"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";

type PaymentDialogProps = {
  className?: string;
};

export function PaymentDialog({ className }: PaymentDialogProps) {
  const router = useRouter();

  const handlePaymentValid = async () => {
    try {
      const request = await fetch("/api/paymentValidate");
      const data = await request.json();

      if (!request.ok) {
        if (request.status === 401) {
          toast.error("Please sign in to continue.");
          router.push("/auth/signin");
          return;
        }
        const message =
          typeof data?.message === "string"
            ? data.message
            : "Unable to validate payment.";
        toast.error(message);
        return;
      }

      if (data.type === "text") {
        toast.error(data.message);
        return;
      }

      if (data.type === "array" && Array.isArray(data.message)) {
        if (data.message.length === 0) {
          router.push("/register/paymentinfo");
          return;
        }
        const events = data.message as Array<{ eventName: string }>;
        toast.error(
          `There are zero Registrations for these events : ${events.map((value) => value.eventName).join(", ")}`,
        );
        return;
      }

      toast.error("Unexpected response from payment validation.");
    } catch (error: unknown) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <Button
        variant="default"
        className={
          className ||
          "border bg-primary relative text-white hover:bg-primary hover:text-white hover:scale-105 transition-all"
        }
        onClick={() => handlePaymentValid()}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        Go to payments
      </Button>
    </>
  );
}
