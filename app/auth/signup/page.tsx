"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, EyeOff, CheckCircle2, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { UploadButton } from "@/utils/uploadthing";
import { useAuthContext } from "@/contexts/auth-context";

import gatLogo from "@/public/images/gat-logo.png";
import interactLogo from "@/public/gat-logos/INTERACT2K26.png";

// ─── Schemas ────────────────────────────────────────────────────────────────

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const otpSchema = z.object({
  otp: z
    .string()
    .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

const registrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
  collegeName: z.string().min(2, "College name is required"),
  collegeIdNumber: z.string().min(1, "College ID number is required"),
  aadhaarNumber: z
    .string()
    .regex(/^\d{12}$/, "Aadhaar must be exactly 12 digits"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

type Step = "email" | "otp" | "form";

// ─── Component ───────────────────────────────────────────────────────────────

export default function SignUp() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuthContext();

  const [step, setStep] = useState<Step>("email");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Forms ──────────────────────────────────────────────────────────────────
  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const registrationForm = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      phone: "",
      collegeName: "",
      collegeIdNumber: "",
      aadhaarNumber: "",
      password: "",
    },
  });

  // ── Resend countdown ───────────────────────────────────────────────────────
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setInterval(() => setResendTimer((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [resendTimer]);

  // ── Step 1: Send OTP ───────────────────────────────────────────────────────
  const handleSendOtp = async (values: z.infer<typeof emailSchema>) => {
    setIsSending(true);
    try {
      const { data } = await axios.post("/api/auth/register/start", {
        email: values.email,
      });
      if (data.success) {
        setVerifiedEmail(values.email);
        setStep("otp");
        setResendTimer(30);
        toast.success("OTP sent!", {
          description: `Check your inbox at ${values.email}`,
        });
      } else {
        emailForm.setError("email", {
          message: data.error?.message ?? "Failed to send OTP",
        });
      }
    } catch (err: unknown) {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.error?.message
          ? err.response.data.error.message
          : "Failed to send OTP. Please try again.";
      emailForm.setError("email", { message: msg });
    } finally {
      setIsSending(false);
    }
  };

  // ── Step 1: Resend OTP ─────────────────────────────────────────────────────
  const handleResend = async () => {
    if (resendTimer > 0) return;
    setIsSending(true);
    try {
      const { data } = await axios.post("/api/auth/register/start", {
        email: verifiedEmail,
      });
      if (data.success) {
        setResendTimer(30);
        otpForm.reset();
        toast.success("OTP resent!");
      } else {
        toast.error(data.error?.message ?? "Failed to resend OTP");
      }
    } catch {
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  // ── Step 2: Verify OTP ─────────────────────────────────────────────────────
  const handleVerifyOtp = async (values: z.infer<typeof otpSchema>) => {
    setIsVerifying(true);
    try {
      const { data } = await axios.post("/api/auth/register/verify", {
        email: verifiedEmail,
        otp: values.otp,
      });
      if (data.success) {
        setStep("form");
        toast.success("Email verified!", {
          description: "Please complete your registration.",
        });
      } else {
        otpForm.setError("otp", {
          message: data.error?.message ?? "Invalid OTP",
        });
      }
    } catch (err: unknown) {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.error?.message
          ? err.response.data.error.message
          : "OTP verification failed.";
      otpForm.setError("otp", { message: msg });
    } finally {
      setIsVerifying(false);
    }
  };

  // ── Step 3: Submit Registration ────────────────────────────────────────────
  const handleRegister = async (
    values: z.infer<typeof registrationSchema>
  ) => {
    if (!photoUrl) {
      toast.error("Please upload your profile photo before submitting.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { data } = await axios.post("/api/auth/register/complete", {
        ...values,
        email: verifiedEmail,
        photoUrl,
      });
      if (data.success) {
        setIsLoggedIn(true);
        toast.success("Registration complete!", {
          description: "Welcome to INTERACT 2K26!",
        });
        router.push("/register/firstEventSelection");
      } else {
        toast.error(data.error?.message ?? "Registration failed.");
      }
    } catch (err: unknown) {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.error?.message
          ? err.response.data.error.message
          : "Registration failed. Please try again.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Shared card wrapper styles ──────────────────────────────────────────────
  const cardStyle = {
    background: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
  } as const;
  const labelStyle = {
    color: "hsl(var(--muted))",
  } as const;
  const inputStyle = {
    background: "hsl(var(--background))",
    color: "hsl(var(--foreground))",
    borderColor: "hsl(var(--border))",
    borderRadius: "var(--radius)",
  } as const;

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
      <div className="dot-grid absolute inset-0 pointer-events-none opacity-100" />

      {/* Ghost watermarks */}
      <div
        className="font-display absolute left-[-2%] bottom-[4%] font-black leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(90px,14vw,170px)", color: "hsl(var(--primary) / 0.1)", letterSpacing: "-0.02em" }}
        aria-hidden
      >
        INTERACT
      </div>
      <div
        className="font-display absolute right-[-2%] top-[4%] font-black leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(90px,14vw,170px)", color: "hsl(var(--primary) / 0.1)", letterSpacing: "-0.02em" }}
        aria-hidden
      >
        2K26
      </div>

      {/* Card */}
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
                <h1 className="font-display text-4xl font-black tracking-tighter" style={{ color: "hsl(var(--foreground))" }}>
                  INTERACT
                </h1>
                <span className="font-display text-2xl font-black tracking-tight" style={{ color: "hsl(var(--primary))" }}>
                  2K26
                </span>
              </div>
              <p className="font-mono-jb text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "hsl(var(--muted))" }}>
                {step === "email" && "Create Participant Account"}
                {step === "otp" && "Verify Your Email"}
                {step === "form" && "Complete Registration"}
              </p>

              {/* Step indicators */}
              <div className="flex items-center gap-2 mt-1">
                {(["email", "otp", "form"] as Step[]).map((s, idx) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                      style={{
                        background:
                          step === s
                            ? "hsl(var(--primary))"
                            : (step === "otp" && s === "email") || step === "form"
                            ? "hsl(var(--primary) / 0.3)"
                            : "hsl(var(--muted) / 0.2)",
                        color:
                          step === s
                            ? "hsl(var(--primary-foreground))"
                            : "hsl(var(--muted-foreground))",
                      }}
                    >
                      {((step === "otp" && s === "email") || step === "form") && s !== step ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        idx + 1
                      )}
                    </div>
                    {idx < 2 && (
                      <div
                        className="w-8 h-px transition-all duration-300"
                        style={{
                          background:
                            (step === "otp" && idx === 0) || step === "form"
                              ? "hsl(var(--primary) / 0.5)"
                              : "hsl(var(--border))",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Body */}
          <AnimatePresence mode="wait">
            {/* ── Step 1: Email ── */}
            {step === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="px-8 py-7"
              >
                <Form {...emailForm}>
                  <form onSubmit={emailForm.handleSubmit(handleSendOtp)} className="space-y-5">
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono-jb text-xs font-semibold tracking-widest uppercase" style={labelStyle}>
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@college.edu"
                              className="h-11"
                              style={inputStyle}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                    <LoadingButton
                      type="submit"
                      loading={isSending}
                      className="w-full font-bold tracking-wide h-11"
                      style={{
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                        borderRadius: "calc(var(--radius) - 2px)",
                      }}
                    >
                      Send OTP
                    </LoadingButton>
                  </form>
                </Form>
              </motion.div>
            )}

            {/* ── Step 2: OTP ── */}
            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="px-8 py-7"
              >
                <p className="text-sm text-center mb-5" style={{ color: "hsl(var(--muted-foreground))" }}>
                  We sent a 6-digit code to{" "}
                  <span className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                    {verifiedEmail}
                  </span>
                </p>
                <Form {...otpForm}>
                  <form onSubmit={otpForm.handleSubmit(handleVerifyOtp)} className="space-y-5">
                    <FormField
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono-jb text-xs font-semibold tracking-widest uppercase" style={labelStyle}>
                            One-Time Password
                          </FormLabel>
                          <FormControl>
                            <div className="flex justify-center">
                              <InputOTP maxLength={6} {...field}>
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs text-center" />
                        </FormItem>
                      )}
                    />
                    <LoadingButton
                      type="submit"
                      loading={isVerifying}
                      className="w-full font-bold tracking-wide h-11"
                      style={{
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                        borderRadius: "calc(var(--radius) - 2px)",
                      }}
                    >
                      Verify OTP
                    </LoadingButton>
                  </form>
                </Form>
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendTimer > 0 || isSending}
                    className="text-xs transition-colors"
                    style={{
                      color: resendTimer > 0 ? "hsl(var(--muted-foreground))" : "hsl(var(--primary))",
                      cursor: resendTimer > 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Registration Form ── */}
            {step === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="px-8 py-7"
              >
                <Form {...registrationForm}>
                  <form
                    onSubmit={registrationForm.handleSubmit(handleRegister)}
                    className="space-y-4"
                  >
                    {/* Name */}
                    <FormField
                      control={registrationForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono-jb text-xs font-semibold tracking-widest uppercase" style={labelStyle}>
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input className="h-11" style={inputStyle} placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Email (readonly) */}
                    <FormItem>
                      <FormLabel className="font-mono-jb text-xs font-semibold tracking-widest uppercase" style={labelStyle}>
                        Email Address
                      </FormLabel>
                      <Input
                        className="h-11 opacity-60 cursor-not-allowed"
                        style={inputStyle}
                        value={verifiedEmail}
                        readOnly
                        disabled
                      />
                    </FormItem>

                    {/* Phone */}
                    <FormField
                      control={registrationForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono-jb text-xs font-semibold tracking-widest uppercase" style={labelStyle}>
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input className="h-11" style={inputStyle} placeholder="10-digit mobile number" maxLength={10} {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* College Name */}
                    <FormField
                      control={registrationForm.control}
                      name="collegeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono-jb text-xs font-semibold tracking-widest uppercase" style={labelStyle}>
                            College Name
                          </FormLabel>
                          <FormControl>
                            <Input className="h-11" style={inputStyle} placeholder="Full college name" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* College ID Number */}
                    <FormField
                      control={registrationForm.control}
                      name="collegeIdNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono-jb text-xs font-semibold tracking-widest uppercase" style={labelStyle}>
                            College ID Number
                          </FormLabel>
                          <FormControl>
                            <Input className="h-11" style={inputStyle} placeholder="e.g. 1BG21CS001" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Aadhaar Number */}
                    <FormField
                      control={registrationForm.control}
                      name="aadhaarNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono-jb text-xs font-semibold tracking-widest uppercase" style={labelStyle}>
                            Aadhaar Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="h-11"
                              style={inputStyle}
                              placeholder="12-digit Aadhaar number"
                              maxLength={12}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Password */}
                    <FormField
                      control={registrationForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono-jb text-xs font-semibold tracking-widest uppercase" style={labelStyle}>
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                className="h-11 pr-10"
                                style={inputStyle}
                                type={showPassword ? "text" : "password"}
                                placeholder="Min 6 characters"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword((p) => !p)}
                                className="absolute right-3 top-3 transition-colors"
                                style={{ color: "hsl(var(--muted))" }}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-5 w-5" />
                                ) : (
                                  <Eye className="h-5 w-5" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Photo Upload */}
                    <div className="space-y-2">
                      <p className="font-mono-jb text-xs font-semibold tracking-widest uppercase" style={labelStyle}>
                        Profile Photo
                      </p>
                      <div
                        className="rounded-lg border p-3 text-xs leading-relaxed"
                        style={{
                          borderColor: "hsl(var(--border))",
                          color: "hsl(var(--muted-foreground))",
                          background: "hsl(var(--muted) / 0.08)",
                        }}
                      >
                        <Upload className="inline-block w-3.5 h-3.5 mr-1 -mt-0.5" />
                        This photo will be used for on-spot verification during
                        events you participate in. Make sure your face is
                        clearly visible and matches your identity documents.
                      </div>
                      {photoUrl ? (
                        <div className="flex items-center gap-2 text-xs" style={{ color: "hsl(var(--primary))" }}>
                          <CheckCircle2 className="w-4 h-4" />
                          Photo uploaded successfully.{" "}
                          <button
                            type="button"
                            className="underline"
                            onClick={() => setPhotoUrl(null)}
                          >
                            Change
                          </button>
                        </div>
                      ) : (
                        <UploadButton
                          endpoint="registrationPhotoUploader"
                          onClientUploadComplete={(res) => {
                            if (res?.[0]?.ufsUrl) {
                              setPhotoUrl(res[0].ufsUrl);
                              toast.success("Photo uploaded!");
                            }
                          }}
                          onUploadError={(err) => {
                            toast.error(`Upload failed: ${err.message}`);
                          }}
                          appearance={{
                            button: {
                              background: "hsl(var(--secondary))",
                              color: "hsl(var(--foreground))",
                              borderRadius: "calc(var(--radius) - 2px)",
                              fontSize: "12px",
                              fontWeight: 600,
                            },
                          }}
                        />
                      )}
                    </div>

                    <LoadingButton
                      type="submit"
                      loading={isSubmitting}
                      disabled={!photoUrl}
                      className="w-full font-bold tracking-wide h-11 mt-2"
                      style={{
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                        borderRadius: "calc(var(--radius) - 2px)",
                        opacity: !photoUrl ? 0.5 : 1,
                      }}
                    >
                      Complete Registration
                    </LoadingButton>
                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div
            className="px-8 pb-7 border-t pt-5"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <p className="text-xs text-center" style={{ color: "hsl(var(--muted-foreground))" }}>
              Already have an account?{" "}
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
