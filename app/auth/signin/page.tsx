"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/LoadingButton";
import { useAuthContext } from "@/contexts/auth-context";
import { newLoginSchema } from "@/lib/schemas/newAuth";
import { toast } from "sonner";
import Link from "next/link";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// Import logos and background image – paths unchanged
import gatLogo from "@/public/images/gat-logo.png";
import interactLogo from "@/public/gat-logos/INTERACT2K26.png";
import MagneticButton from "@/components/ui/MagneticButton";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [emailNotFound, setEmailNotFound] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setIsLoggedIn, checkAuth } = useAuthContext();
  const [visibility, setVisibility] = useState<boolean>(false);

  const form = useForm<z.infer<typeof newLoginSchema>>({
    resolver: zodResolver(newLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newLoginSchema>) {
    setIsLoading(true);
    setEmailNotFound(false);
    try {
      const response = await axios.post("/api/auth/login", {
        email: values.email,
        password: values.password,
      });
      if (response.data.success) {
        // Populate both isLoggedIn and role in the auth context
        await checkAuth();
        toast.success("Login successful!", {
          description: "Welcome back!",
        });
        const role = response.data.data?.user?.role;
        if (role === "SUPER_ADMIN" || role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        form.setError("email", { type: "manual", message: "Invalid credentials" });
        form.setError("password", { type: "manual", message: "Invalid credentials" });
        setError(response.data.error?.message ?? "Invalid email or password.");
        setIsLoading(false);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const code = error.response?.data?.error?.code;
        const message = error.response?.data?.error?.message;
        if (code === "EMAIL_NOT_FOUND") {
          setEmailNotFound(true);
          form.setError("email", { type: "manual", message: "Email not registered" });
        } else if (message) {
          setError(message);
          form.setError("email", { type: "manual", message: "Invalid credentials" });
          form.setError("password", { type: "manual", message: "Invalid credentials" });
        } else {
          setError("An error occurred during login. Please try again.");
          console.error(error);
        }
      } else {
        setError("An error occurred during login. Please try again.");
        console.error(error);
      }
      setIsLoading(false);
    }
  }

  // ── Visual layer ────────────────────────────────────────────────────────────

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4 mt-20 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 65% 55% at 60% 35%, hsl(var(--primary) / 0.09) 0%, transparent 65%),
          radial-gradient(ellipse 45% 45% at 5% 85%,  hsl(var(--secondary) / 0.07) 0%, transparent 55%),
          hsl(var(--background))
        `,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* dot grid */}
      <div className="dot-grid absolute inset-0 pointer-events-none opacity-100" />

      {/* Ghost watermark like home page */}
      <div
        className="font-display absolute left-[-2%] bottom-[4%] font-black leading-none select-none pointer-events-none"
        style={{
          fontSize: "clamp(90px,14vw,170px)",
          color: "hsl(var(--primary) / 0.1)",
          letterSpacing: "-0.02em",
        }}
        aria-hidden
      >
        INTERACT
      </div>
      <div
        className="font-display absolute right-[-2%] top-[4%] font-black leading-none select-none pointer-events-none"
        style={{
          fontSize: "clamp(90px,14vw,170px)",
          color: "hsl(var(--primary) / 0.1)",
          letterSpacing: "-0.02em",
        }}
        aria-hidden
      >
        2K26
      </div>

      {/* Announcement marquee */}
      <div
        className="absolute top-0 left-0 right-0 border-b py-2.5 overflow-hidden z-20"
        style={{
          borderColor: "hsl(var(--border))",
          background: "hsl(var(--secondary) / 0.05)",
        }}
      >
        <style>{`
          @keyframes marquee-scroll-signin {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .marquee-track-signin {
            animation: marquee-scroll-signin 26s linear infinite;
            display: flex;
            width: max-content;
          }
          .marquee-track-signin:hover { animation-play-state: paused; }
        `}</style>
        <div className="whitespace-nowrap marquee-track-signin">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="text-xs font-bold uppercase tracking-[0.18em] mx-12 flex-shrink-0"
              style={{ color: "hsl(var(--foreground) / 0.5)" }}
            >
              Registrations Starting Soon · Stay tuned for updates · INTERACT 2K26 ·
            </span>
          ))}
        </div>
      </div>

      {/* ── Sign-in card ──────────────────────────────────────────────────────── */}
      <motion.div
        id="signin-card"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card shell */}
        <div
          className="rounded-[var(--radius)] overflow-hidden"
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
          }}
        >
          {/* Card header */}
          <div
            className="px-8 pt-8 pb-6 border-b"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <div className="flex flex-col items-center text-center gap-3">
              {/* Logo */}
              <div className="mb-2 flex items-center justify-center gap-4">
                <Image
                  src={gatLogo}
                  alt="GAT Logo"
                  width={52}
                  height={52}
                  className="object-contain opacity-100"
                />
                <Image
                  src={interactLogo}
                  alt="INTERACT Logo"
                  width={52}
                  height={52}
                  className="object-contain opacity-100"
                />
              </div>

              {/* Title */}
              <div className="flex items-center gap-2">
                <h1
                  className="font-display text-4xl font-black tracking-tighter"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  INTERACT
                </h1>
                <span
                  className="font-display text-2xl font-black tracking-tight"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  2K26
                </span>
              </div>

              <p
                className="font-mono-jb text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: "hsl(var(--muted))" }}
              >
                NATIONAL LEVEL INTER-COLLEGIATE 2026
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 py-7">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="font-mono-jb text-xs font-semibold tracking-widest uppercase"
                        style={{ color: "hsl(var(--muted))" }}
                      >
                        Registered Email ID
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-11 transition-all duration-200"
                          style={{
                            background: "hsl(var(--background))",
                            color: "hsl(var(--foreground))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "var(--radius)",
                          }}
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="font-mono-jb text-xs font-semibold tracking-widest uppercase"
                        style={{ color: "hsl(var(--muted))" }}
                      >
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="h-11 pr-10 transition-all duration-200"
                            style={{
                              background: "hsl(var(--background))",
                              color: "hsl(var(--foreground))",
                              borderColor: "hsl(var(--border))",
                              borderRadius: "var(--radius)",
                            }}
                            type={visibility ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                          />
                          <button
                            type="button"
                            id="password-visibility-toggle"
                            onClick={() => setVisibility((prev) => !prev)}
                            className="absolute right-3 top-3 transition-colors duration-200"
                            style={{ color: "hsl(var(--muted))" }}
                          >
                            {visibility ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                      <div className="flex justify-end">
                        <Link
                          href="/auth/forgotpassword"
                          className="text-xs hover:underline"
                          style={{ color: "hsl(var(--primary))" }}
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Inline error */}
                {emailNotFound ? (
                  <div className="text-xs text-center bg-amber-400/10 border border-amber-400/30 rounded-lg px-3 py-3 space-y-1.5">
                    <p className="text-amber-400 font-semibold">Email isn&apos;t registered.</p>
                    <p style={{ color: "hsl(var(--muted-foreground))" }}>
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/auth/signup"
                        className="font-bold underline"
                        style={{ color: "hsl(var(--primary))" }}
                      >
                        Create one now →
                      </Link>
                    </p>
                  </div>
                ) : error ? (
                  <div className="text-xs text-red-400 text-center bg-red-400/5 border border-red-400/20 rounded-lg px-3 py-2">
                    {error}
                  </div>
                ) : null}

                {/* Submit */}
                <MagneticButton className="w-full">
                  <LoadingButton
                    type="submit"
                    id="signin-submit-btn"
                    loading={isLoading}
                    className="w-full font-bold tracking-wide transition-shadow duration-300 h-11"
                    style={{
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                      borderRadius: "calc(var(--radius) - 2px)",
                    }}
                  >
                    Sign In
                  </LoadingButton>
                </MagneticButton>
              </form>
            </Form>
          </div>

          {/* Card footer note */}
          <div
            className="px-8 pb-7 border-t pt-5"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <p
              className="text-xs text-center"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-semibold hover:underline"
                style={{ color: "hsl(var(--primary))" }}
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
