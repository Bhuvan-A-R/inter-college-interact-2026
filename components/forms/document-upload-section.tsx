"use client";

import { FileUploadField } from "./file-upload";

interface DocumentUploadSectionProps {
  setValue: (name: string, value: any) => void;
  errors: any;
}

export function DocumentUploadSection({ setValue, errors }: DocumentUploadSectionProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <FileUploadField
          label="Photo"
          onChange={(file) => setValue("photo", file)}
          error={errors.photo?.message as string}
        />
        <FileUploadField
          label="Aadhar"
          onChange={(file) => setValue("aadhar", file)}
          error={errors.aadhar?.message as string}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <FileUploadField
          label="SSLC"
          onChange={(file) => setValue("sslc", file)}
          error={errors.sslc?.message as string}
        />
        <FileUploadField
          label="PUC"
          onChange={(file) => setValue("puc", file)}
          error={errors.puc?.message as string}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <FileUploadField
          label="Admission"
          onChange={(file) => setValue("admission", file)}
          error={errors.admission?.message as string}
        />
        <FileUploadField
          label="ID Card"
          onChange={(file) => setValue("idcard", file)}
          error={errors.idcard?.message as string}
        />
      </div>
    </>
  );
}