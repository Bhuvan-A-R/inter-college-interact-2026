import React from "react";

type EventItem = {
  name: string;
  attended: boolean;
};

interface EventsListProps {
  events: EventItem[];
}

export function EventsList({ events }: EventsListProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Events Participated</h3>
      <div className="space-y-2">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-blue-50 text-blue-700 px-4 py-2 rounded-md"
          >
            {event.name} - {event.attended ? "Attended" : "unattended"}
          </div>
        ))}
      </div>
    </div>
  );
}
