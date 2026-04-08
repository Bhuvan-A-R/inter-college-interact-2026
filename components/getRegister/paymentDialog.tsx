"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";

type PaymentDialogProps = {
  className?: string;
};

export function PaymentDialog({ className }: PaymentDialogProps) {
  const router = useRouter();

  const handleGoToCart = () => {
    router.push("/cart");
  };

  return (
    <>
      <Button
        variant="default"
        className={
          className ||
          "border bg-primary relative text-white hover:bg-primary hover:text-white hover:scale-105 transition-all"
        }
        onClick={handleGoToCart}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        Go to cart
      </Button>
    </>
  );
}
