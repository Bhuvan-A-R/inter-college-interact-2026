"use client";

import React, { useEffect, useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ArrowLeft, Save } from "lucide-react";
import { Event } from "@/app/register/addRegistrant/page";
import { participantFormSchema } from "@/lib/schemas/register";

type SelectRolesAndEventsProps = {
  allEvents: Event[];
};

export default function SelectRolesAndEvents({
  allEvents,
}: SelectRolesAndEventsProps) {
  const router = useRouter();
  const [selectedEvents, setSelectedEvents] = useState<
    {
      eventId: string;
      eventNo: number;
      eventName: string;
      teamNumber?: number | null;
      type: "PARTICIPANT";
    }[]
  >([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof participantFormSchema>>({
    resolver: zodResolver(participantFormSchema),
    defaultValues: {
      name: "",
      usn: "",
      phone: "",
      events: [],
      email: "",
      gender: null,
      blood: null,
      documents: {
        photo: null,
        idCard: null,
      },
    },
  });

  useEffect(() => {
    setValue("events", selectedEvents);
  }, [selectedEvents, setValue]);

  const onToggleSelect = (event: Event) => {
    setSelectedEvents((prev) => {
      const idx = prev.findIndex((item) => item.eventId === event.id);
      if (idx >= 0) {
        return prev.filter((item) => item.eventId !== event.id);
      }
      return [
        ...prev,
        {
          eventId: event.id,
          eventName: event.eventName,
          eventNo: event.eventNo,
          teamNumber: event.teamNumber ?? null,
          type: "PARTICIPANT",
        },
      ];
    });
  };

  const onParticipantSubmit = async (
    data: z.infer<typeof participantFormSchema>,
  ) => {
    const payload = {
      ...data,
      gender: null,
      blood: null,
      documents: {
        photo: null,
        idCard: null,
      },
    };
    setDisabled(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to register");
      }
      toast.success("Registered Successfully.");
      router.push("/register/getallregister");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred.");
      }
    } finally {
      setDisabled(false);
    }
  };

  const onParticipantError = (
    err: FieldErrors<z.infer<typeof participantFormSchema>>,
  ) => {
    console.log("Validation Error:", err);
    toast.error("Please fix the validation errors and try again.");
  };

  const groupedEvents = allEvents.reduce(
    (acc, ev) => {
      acc[ev.category] = acc[ev.category] || [];
      acc[ev.category].push(ev);
      return acc;
    },
    {} as Record<string, Event[]>,
  );

  const formatEventLabel = (event: Event) => {
    const dept = event.deptCode ? ` ${event.deptCode}` : "";
    const team = event.teamNumber ? ` Team ${event.teamNumber}` : "";
    return `${event.eventName}${dept}${team}`.trim();
  };

  return (
    <Card className="shadow-xl w-full px-10">
      <form onSubmit={handleSubmit(onParticipantSubmit, onParticipantError)}>
        <CardHeader>
          <CardTitle className="text-center text-[#D32F23] font-bold">
            Register (Participant)
          </CardTitle>
          <CardDescription className="text-center text-[#F4D03F] font-bold">
            Add details for Participant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-start">
              <div className="w-full md:w-1/3 space-y-1.5">
                <Label htmlFor="name">
                  Name of the Student
                  <span className="block font-normal"><small className="text-red-600">(As mentioned on 10th or any equivalent marks card)*</small></span>
                </Label>
                <Input
                  {...register("name")}
                  id="name"
                  placeholder="Full Name - will be printed in your certificate"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="w-full md:w-1/3 space-y-1.5">
                <Label htmlFor="usn">
                  USN of the Student 
                  <span className="block font-normal mt-1"><small className="text-red-600">(Should be in format 1GA22CS000)*</small></span>
                </Label>
                <Input
                  {...register("usn")}
                  id="usn"
                  placeholder="University Seat Number"
                />
                {errors.usn && (
                  <p className="text-red-500 text-sm">{errors.usn.message}</p>
                )}
              </div>
              <div className="w-full md:w-1/3 space-y-1.5">
                <Label htmlFor="phone">
                  Phone number of the Student{" "}
                  <span className="block font-normal mt-1"><small className="text-red-600">(Correct Number and it should be entered once)*</small></span>
                </Label>
                <Input
                  id="phone"
                  placeholder="Phone Number"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full items-start">
              <div className="w-full md:w-1/3 space-y-1.5">
                <Label htmlFor="email">
                  Email 
                  <span className="block font-normal mt-1"><small className="text-red-600">(Correct E-Mail and it should be entered once)*</small></span>
                </Label>
                <Input
                  {...register("email")}
                  id="email"
                  name="email"
                  placeholder="Enter the email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-card text-card-foreground p-4 rounded-md">
            <h2
              className="text-2xl font-semibold text-foreground mb-4"
              aria-label="Available events"
              tabIndex={0}
            >
              Select the events that you are Participating in
            </h2>
            <h2
              className="text-xl font-semibold text-foreground mb-4"
              aria-label="Available events"
              tabIndex={0}
            >
              Click on the event tile to confirm selection of the event
            </h2>

            {allEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground" role="status">
                No available events.
              </p>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(groupedEvents).map(([category, events]) => (
                  <AccordionItem key={category} value={category}>
                    <AccordionTrigger>{category}</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1.5">
                        {events.map((event) => {
                          const selectedObj = selectedEvents.find(
                            (item) => item.eventId === event.id,
                          );
                          const isSelected = !!selectedObj;
                          return (
                            <div
                              key={event.id}
                              role="button"
                              tabIndex={0}
                              aria-pressed={isSelected}
                              onClick={() => onToggleSelect(event)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  onToggleSelect(event);
                                }
                              }}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition duration-300 flex flex-col h-full ${
                                isSelected
                                  ? "border-primary bg-primary/10"
                                  : "border-border bg-card"
                              }`}
                            >
                              <h3 className="text-lg font-semibold mb-2">
                                {formatEventLabel(event)}
                              </h3>
                              <div className="mt-auto flex items-end justify-between">
                                <div>
                                  <p className="text-sm">
                                    Max Participants: {event.maxParticipant}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
            {errors.events && (
              <p className="text-red-500 text-sm">{errors.events.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-5">
          <Button className="px-8 text-xl" type="submit" disabled={disabled}>
            <Save className="w-5 h-5 mr-2" /> Save
          </Button>

          <Link href="/register/getallregister">
            <Button
              variant="outline"
              className="border hover:border-primary px-8 text-xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Back
            </Button>
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
