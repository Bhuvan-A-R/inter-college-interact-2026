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
      console.log(data);
      if (data.type === "text") {
        toast.error(data.message);
      } else if (data.message.length == 0 && data.type === "array") {
        router.push("/register/paymentinfo");
      } else {
        const events = data.message as Array<{ eventName: string }>;
        toast.error(
          `There are zero Registrations for these events : ${events.map((value) => value.eventName).join(", ")}`,
        );
      }
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
