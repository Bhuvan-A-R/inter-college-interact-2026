"use client"
import Link from "next/link";

interface WarningMessageProps {
  label: string;        // Message label
  buttonText: string;   // Button text
  to: string;           // Link destination
}

export function WarningMessage({ label, buttonText, to }: WarningMessageProps) {
  return (
    <div className="text-sm font-medium text-center py-4">
      <div className="text-gray-700">{label}</div>
      <Link href={to} className="pointer underline text-yellow-500 hover:text-yellow-600">
        {buttonText}
      </Link>
    </div>
  );
}
