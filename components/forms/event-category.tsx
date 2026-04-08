"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface Event {
  name: string;
  attended: boolean;
}

interface EventCategoryProps {
  category: string;
  events: string[];
  selectedEvents: Event[];
  onEventChange: (eventName: string, checked: boolean) => void;
}

export function EventCategory({
  category,
  events,
  selectedEvents,
  onEventChange,
}: EventCategoryProps) {
  const isEventSelected = (eventName: string) => {
    return selectedEvents.some((event) => event.name === eventName && event.attended);
  };

  const selectedCount = events.filter(eventName => isEventSelected(eventName)).length;

  return (
    <AccordionItem value={category}>
      <AccordionTrigger className="text-lg font-semibold group">
        <div className="flex items-center gap-2">
          {category}
          {selectedCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {selectedCount} selected
            </Badge>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2 pt-2">
          {events.map((eventName) => (
            <div 
              key={eventName} 
              className="flex items-center space-x-2 pl-4 py-1 hover:bg-accent rounded-md transition-colors"
            >
              <Checkbox
                id={eventName}
                checked={isEventSelected(eventName)}
                onCheckedChange={(checked) =>
                  onEventChange(eventName, checked as boolean)
                }
              />
              <Label 
                htmlFor={eventName} 
                className="text-sm cursor-pointer flex-1"
              >
                {eventName}
              </Label>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}