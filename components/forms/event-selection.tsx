"use client";

import { Card } from "@/components/ui/card";
import { EVENTS_CATEGORIES } from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Event {
  name: string;
  attended: boolean;
}

interface EventSelectionProps {
  events: Event[];
  onChange: (events: Event[]) => void;
}

export function EventSelection({ events, onChange }: EventSelectionProps) {
  const handleEventChange = (eventName: string, checked: boolean) => {
    const existingEvent = events.find((e) => e.name === eventName);

    if (existingEvent) {
      const updatedEvents = events.map((event) =>
        event.name === eventName ? { ...event, attended: checked } : event,
      );
      onChange(updatedEvents);
    } else {
      onChange([...events, { name: eventName, attended: checked }]);
    }
  };

  const isEventSelected = (eventName: string) => {
    return events.some((event) => event.name === eventName && event.attended);
  };

  const categories = Object.entries(EVENTS_CATEGORIES);
  const midpoint = Math.ceil(categories.length / 2);
  const leftCategories = categories.slice(0, midpoint);
  const rightCategories = categories.slice(midpoint);

  const CategorySection = ({
    categories,
  }: {
    categories: [string, readonly string[]][];
  }) => (
    <div className="space-y-6">
      {categories.map(([category, categoryEvents]) => (
        <div key={category} className="space-y-3">
          <h4 className="text-lg font-semibold text-primary">{category}</h4>
          <div className="space-y-2">
            {categoryEvents.map((eventName) => (
              <div
                key={eventName}
                className="flex items-center space-x-2 pl-4 py-1 hover:bg-accent rounded-md transition-colors"
              >
                <Checkbox
                  id={eventName}
                  checked={isEventSelected(eventName)}
                  onCheckedChange={(checked) =>
                    handleEventChange(eventName, checked as boolean)
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
        </div>
      ))}
    </div>
  );

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Select Events</h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <CategorySection categories={leftCategories} />
        </div>
        <div className="border-l pl-6">
          <CategorySection categories={rightCategories} />
        </div>
      </div>
    </Card>
  );
}
