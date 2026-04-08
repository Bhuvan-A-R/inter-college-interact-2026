"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface FileUploadFieldProps {
  label: string;
  onChange: (file: File | null) => void;
  error?: string;
}

export function FileUploadField({
  label,
  onChange,
  error,
}: FileUploadFieldProps) {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      onChange(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <div className="relative">
        <Input
          id={label.toLowerCase()}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.pdf"
        />
        <div
          className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50"
          onClick={() => document.getElementById(label.toLowerCase())?.click()}
        >
          <Upload className="w-4 h-4" />
          <span className="text-sm text-gray-600">
            {fileName || "Choose file..."}
          </span>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
