"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ParticipantTypeSelectProps {
  onValueChange: (value: string) => void;
}

export function ParticipantTypeSelect({ onValueChange }: ParticipantTypeSelectProps) {
  return (
    <Select onValueChange={onValueChange} defaultValue="PARTICIPANT">
      <SelectTrigger>
        <SelectValue placeholder="Select Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PARTICIPANT">Participant</SelectItem>
      </SelectContent>
    </Select>
  );
}