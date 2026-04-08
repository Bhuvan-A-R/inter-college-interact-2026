"use client";

import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";

interface PersonalInfoFieldsProps {
  register: UseFormRegister<any>;
  errors: any;
}

export function PersonalInfoFields({ register, errors }: PersonalInfoFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-2">
        <Input
          placeholder="Full Name"
          {...register("name")}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-sm text-red-500">
            {errors.name.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          placeholder="USN"
          {...register("usn")}
          className={errors.usn ? "border-red-500" : ""}
        />
        {errors.usn && (
          <p className="text-sm text-red-500">
            {errors.usn.message as string}
          </p>
        )}
      </div>
    </div>
  );
}