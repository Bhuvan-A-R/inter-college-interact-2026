"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { EventCategory } from "@/data/eventCategories";

interface SelectYourEventsProps {
  allEvents: EventCategory[];
  selectedEvents: number[];
  onToggleSelect: (eventNo: number) => void;
  isDisabled: boolean;
}

const SelectYourEvents: React.FC<SelectYourEventsProps> = ({
  allEvents,
  selectedEvents,
  onToggleSelect,
  isDisabled,
}) => {
  const groupedEvents = React.useMemo(() => {
    return allEvents.reduce<Record<string, EventCategory[]>>((acc, evt) => {
      acc[evt.category] = acc[evt.category] || [];
      acc[evt.category].push(evt);
      return acc;
    }, {});
  }, [allEvents]);

  return (
    <div className="bg-card text-card-foreground shadow-2xl rounded-2xl p-6">
      <h2
        className="text-2xl font-semibold text-foreground mb-4"
        aria-label="Available events"
        tabIndex={0}
      >
        Select Your Events
      </h2>

      {allEvents.length === 0 ? (
        <p className="text-sm text-muted-foreground" role="status">
          No available events.
        </p>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(groupedEvents).map(([category, events]) => {
            const selectedCount = events.filter((evt) =>
              selectedEvents.includes(evt.eventNo),
            ).length;
            return (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger
                  className="flex justify-between items-center w-full px-4 py-2 text-left rounded-lg hover:bg-secondary/80 transition-all duration-200"
                  aria-label={`Show or hide events for ${category}`}
                >
                  <span className="text-lg font-medium">
                    {category} ({events.length})
                  </span>
                  {selectedCount > 0 && (
                    <div className="flex ml-auto mr-2">
                      <span
                        className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm"
                        aria-live="polite"
                      >
                        {selectedCount}
                      </span>
                    </div>
                  )}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
                    {events.map((event) => {
                      const isSelected = selectedEvents.includes(event.eventNo);
                      return (
                        <div
                          key={event.eventNo}
                          role="button"
                          tabIndex={0}
                          aria-pressed={isSelected}
                          aria-label={`Select or deselect ${event.eventName}`}
                          onClick={() =>
                            !isDisabled && onToggleSelect(event.eventNo)
                          }
                          onKeyDown={(e) => {
                            if (
                              !isDisabled &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              onToggleSelect(event.eventNo);
                            }
                          }}
                          className={`p-4 border-2 rounded-lg shadow-md cursor-pointer transition duration-300 outline-none focus:ring-2 focus:ring-blue-500 ${
                            isSelected
                              ? "border-primary bg-primary/10"
                              : "border-border bg-card hover:border-blue-200"
                          } ${
                            isDisabled ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {event.eventName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Max Participants:{" "}
                            <span className="font-medium text-foreground">
                              {event.maxParticipant}
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
};

export default SelectYourEvents;
