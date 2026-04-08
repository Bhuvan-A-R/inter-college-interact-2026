"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Mail, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import gatLogo from "@/public/images/gat-logo.png";
import interactLogo from "@/public/gat-logos/INTERACT2K26.png";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/auth/forgot-password", {
        email: values.email,
      });
      if (data.success) {
        setSent(true);
      } else {
        toast.error(data.error?.message ?? "Something went wrong.");
      }
    } catch {
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const cardStyle = {
    background: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
  } as const;

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4 mt-20 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 65% 55% at 60% 35%, hsl(var(--primary) / 0.09) 0%, transparent 65%),
          radial-gradient(ellipse 45% 45% at 5% 85%, hsl(var(--secondary) / 0.07) 0%, transparent 55%),
          hsl(var(--background))
        `,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div className="dot-grid absolute inset-0 pointer-events-none opacity-100" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-[var(--radius)] overflow-hidden" style={cardStyle}>
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b" style={{ borderColor: "hsl(var(--border))" }}>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="mb-2 flex items-center justify-center gap-4">
                <Image src={gatLogo} alt="GAT Logo" width={52} height={52} className="object-contain" />
                <Image src={interactLogo} alt="INTERACT Logo" width={52} height={52} className="object-contain" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-3xl font-black tracking-tighter" style={{ color: "hsl(var(--foreground))" }}>
                  Forgot Password
                </h1>
              </div>
              <p className="font-mono-jb text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "hsl(var(--muted))" }}>
                INTERACT 2K26
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-7">
            {sent ? (
              <div className="flex flex-col items-center gap-4 text-center py-4">
                <CheckCircle2 className="w-12 h-12" style={{ color: "hsl(var(--primary))" }} />
                <p className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                  Check your inbox
                </p>
                <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                  If an account with that email exists, we&apos;ve sent a password reset link. It expires in 15 minutes.
                </p>
                <Link
                  href="/auth/signin"
                  className="text-sm font-semibold hover:underline"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  Back to Sign In
                </Link>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Enter your registered email address and we&apos;ll send you a link to reset your password.
                  </p>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="font-mono-jb text-xs font-semibold tracking-widest uppercase"
                          style={{ color: "hsl(var(--muted))" }}
                        >
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="email"
                              className="h-11 pl-10"
                              style={{
                                background: "hsl(var(--background))",
                                color: "hsl(var(--foreground))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "var(--radius)",
                              }}
                              placeholder="you@college.edu"
                              {...field}
                            />
                            <Mail
                              className="absolute left-3 top-3 w-5 h-5 pointer-events-none"
                              style={{ color: "hsl(var(--muted))" }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />
                  <LoadingButton
                    type="submit"
                    loading={isLoading}
                    className="w-full font-bold tracking-wide h-11"
                    style={{
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                      borderRadius: "calc(var(--radius) - 2px)",
                    }}
                  >
                    Send Reset Link
                  </LoadingButton>
                </form>
              </Form>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 pb-7 border-t pt-5" style={{ borderColor: "hsl(var(--border))" }}>
            <p className="text-xs text-center" style={{ color: "hsl(var(--muted-foreground))" }}>
              Remembered your password?{" "}
              <Link
                href="/auth/signin"
                className="font-semibold hover:underline"
                style={{ color: "hsl(var(--primary))" }}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

