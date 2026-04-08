import React from "react";
import { FileText } from "lucide-react";
import UserData from "@/lib/user";

interface DocumentsListProps {
  user: UserData;
}

export function DocumentsList({ user }: DocumentsListProps) {
  const documents = [
    { name: "Photo", url: user.photoUrl },
    { name: "ID Card", url: user.idcardUrl },
  ].filter((doc): doc is { name: string; url: string } => !!doc.url);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Documents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <a
            key={doc.name}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 transition-colors"
          >
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">{doc.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
