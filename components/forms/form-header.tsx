"use client";

import { UserPlus } from "lucide-react";

export function FormHeader() {
  return (
    <div className="flex items-center gap-4">
      <UserPlus className="w-8 h-8 text-primary" />
      <div>
        <h1 className="text-2xl font-bold">Participant Registration</h1>
        <p className="text-muted-foreground">
          Fill in the details to register for events
        </p>
      </div>
    </div>
  );
}