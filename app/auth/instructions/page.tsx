"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowDownCircle,
  UserPlus,
  LogIn,
  List,
  User,
  CreditCard,
  CheckCircle,
  Clipboard,
} from "lucide-react";

interface InstructionStepProps {
  stepNumber: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  detailImage?: string;
}

function InstructionStep({
  stepNumber,
  title,
  description,
  icon,
  detailImage = "/images/Untitled design-3.png", // Replace with your image URL if needed
}: InstructionStepProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full max-w-xl bg-gradient-to-br from-yellow-300 to-yellow-500 border border-yellow-400 rounded-lg p-6 shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
      <div className="flex items-center mb-4">
        {icon && <div className="mr-4">{icon}</div>}
        <h2 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-red-600 via-[#800000] to-red-900 bg-clip-text text-transparent">
          Step {stepNumber}: {title}
        </h2>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="px-4 py-2 bg-yellow-300 text-red-800 font-bold rounded-full focus:outline-none hover:bg-yellow-400 transition-colors duration-200"
        >
          {expanded ? "Hide Details" : "Show Details"}
        </button>
      </div>
      <div
        className={`mt-4 overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-lg leading-relaxed text-red-600">{description}</p>
        {expanded && (
          <img
            src={detailImage}
            alt="Detail visual"
            className="mt-4 rounded-lg shadow-lg"
          />
        )}
      </div>
    </div>
  );
}

const instructions = [
  {
    stepNumber: 1,
    title: "SPOC Registration",
    description:
      "Each department nominates a SPOC who completes registration for all students. Students must submit their details to their department SPOC.",
    icon: <UserPlus className="h-10 w-10 text-red-700" />,
  },
  {
    stepNumber: 2,
    title: "SPOC Login",
    description:
      "The SPOC logs in with the credentials provided by the organizers. If there are issues, use the 'Forgot Password' option or contact support.",
    icon: <LogIn className="h-10 w-10 text-red-700" />,
  },
  {
    stepNumber: 3,
    title: "Select Events and Teams",
    description:
      "Select the events your department will participate in. If an event has multiple teams, increase the team count accordingly.",
    icon: <List className="h-10 w-10 text-red-700" />,
  },
  {
    stepNumber: 4,
    title: "Collect Student Details",
    description:
      "Students must submit their details and documents to the SPOC. The SPOC enters all student information in the portal.",
    icon: <User className="h-10 w-10 text-red-700" />,
  },
  {
    stepNumber: 5,
    title: "Review and Update",
    description:
      "Review the list of registered students. Update event selections, personal details, or documents if needed. Double-check all entries before payment.",
    icon: <Clipboard className="h-10 w-10 text-red-700" />,
  },
  {
    stepNumber: 6,
    title: "Proceed to Payment",
    description:
      "After all student entries are completed, proceed to payment from the portal.",
    icon: <CreditCard className="h-10 w-10 text-red-700" />,
  },
  {
    stepNumber: 7,
    title: "Complete Payment",
    description:
      "Make payment via UPI as per the fee structure provided by the organizers. Upload transaction details and a screenshot for verification. Once verified, registrations are confirmed.",
    icon: <CheckCircle className="h-10 w-10 text-red-700" />,
  },
];

export default function RegistrationInstructions() {
  return (
    <div className="min-h-screen bg-[#990000] text-yellow-300 flex flex-col items-center py-12">
      <h1 className="text-5xl font-extrabold mb-12 text-center tracking-wide drop-shadow-lg">
        Registration Process Instructions (SPOC)
      </h1>
      <div className="flex flex-col items-center space-y-8">
        {instructions.map((instruction, index) => (
          <React.Fragment key={instruction.stepNumber}>
            <InstructionStep {...instruction} />
            {index < instructions.length - 1 && (
              <ArrowDownCircle className="h-10 w-10 text-yellow-300 animate-bounce" />
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Bottom Navigation Buttons */}
      <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-center space-y-4 md:space-y-0 md:space-x-8">
        <Link
          href="/auth/signin"
          className="inline-block px-8 py-4 bg-yellow-300 text-red-700 font-extrabold rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300"
        >
          Go to Login
        </Link>
        <Link
          href="/faqs"
          className="inline-block px-8 py-4 bg-yellow-300 text-red-700 font-extrabold rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300"
        >
          FAQs
        </Link>
        <a
          href="https://drive.google.com/file/d/1QBE6_h0-ug72q9CDKtZ4_B3IKWzXC6sh/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-yellow-300 text-red-700 font-extrabold rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300"
        >
          For more detailed Info: Registration guide
        </a>
      </div>
      {/* Additional Image at the End */}
      <div className="mt-12">
        <img
          src="/images/Untitled design-3.png"
          alt="Additional Visual"
          className="mx-auto rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
}
