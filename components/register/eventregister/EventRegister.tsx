"use client";

import React, { useState } from "react";
import { RegisteredEvent } from "@/app/register/firstEventSelection/page";
import { EventCategory } from "@/data/eventCategories";
import SelectYourEvents from "@/components/register/eventregister/selectYourEvents";
import { toast } from "sonner";
import axios from "axios";
import { LoadingButton } from "@/components/LoadingButton";
import { useRouter } from "next/navigation";

interface EventRegisterProps {
  initialRegisteredEvents: RegisteredEvent[];
  allEvents: EventCategory[];
  userId: string;
}

export default function EventRegister({
  initialRegisteredEvents,
  allEvents,
  userId,
}: EventRegisterProps) {
  const router = useRouter();
  const [selectedEvents, setSelectedEvents] = useState<number[]>(
    initialRegisteredEvents.map((evt) => evt.eventNo),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Toggle an event in the selected list
  const handleToggleSelect = (eventNo: number) => {
    if (isSubmitting) return;
    setSelectedEvents((prev) =>
      prev.includes(eventNo)
        ? prev.filter((no) => no !== eventNo)
        : [...prev, eventNo],
    );
  };

  // Optional: simple form validation
  const validateSelection = () => {
    if (selectedEvents.length === 0) {
      setErrorMsg("Please select at least one event.");
      return false;
    }
    setErrorMsg(null);
    return true;
  };

  // Submit final list of selected events to backend
  const handleSubmit = async () => {
    if (!validateSelection()) return;
    setIsSubmitting(true);

    // Prepare final event objects
    const eventsToRegister = allEvents.filter((evt) =>
      selectedEvents.includes(evt.eventNo),
    );

    try {
      const response = await axios.put("/api/firstEventRegister", {
        userId,
        events: eventsToRegister.map((e) => ({
          eventNo: e.eventNo,
          eventName: e.eventName,
          category: e.category,
          maxParticipant: e.maxParticipant,
          amount: e.amount ?? 0,
        })),
      });

      if (response.status === 200) {
        toast.success("Events registered successfully!");
      } else {
        throw new Error("Server responded with an error.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message || "Registration failed.");
      } else {
        toast.error("Registration failed.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentlySelected = allEvents.filter((evt) =>
    selectedEvents.includes(evt.eventNo),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-3/4">
          <SelectYourEvents
            allEvents={allEvents}
            selectedEvents={selectedEvents}
            onToggleSelect={handleToggleSelect}
            isDisabled={isSubmitting}
          />
        </div>

        <div className="w-full lg:w-1/4">
          <div className="bg-card p-4 rounded-xl border border-border h-full">
            <h2 className="font-semibold text-xl mb-4">
              Currently Selected Events ({currentlySelected.length})
            </h2>
            {currentlySelected.length === 0 ? (
              <p className="text-muted-foreground text-base">
                No events selected.
              </p>
            ) : (
              <ul className="space-y-2">
                {currentlySelected.map((evt, index) => (
                  <li key={evt.eventNo} className="text-base flex gap-2">
                    <span className="font-medium">{index + 1}.</span>
                    <span>
                      {evt.eventName} (#{evt.eventNo})
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {errorMsg && (
        <p className="text-red-600 text-sm" aria-live="assertive">
          {errorMsg}
        </p>
      )}

      <div className="flex justify-center gap-4 mt-10 ">
        <LoadingButton
          className="bg-primary w-50 text-2xl px-5 mt-10 px-6 py-2 font-semibold border border-primary"
          disabled={currentlySelected.length === 0}
          onClick={() => {
            handleSubmit();
            router.push("/register/getallregister");
          }}
        >
          Next {">"}
        </LoadingButton>
      </div>
    </div>
  );
}
