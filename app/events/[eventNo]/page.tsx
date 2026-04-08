import { notFound } from "next/navigation";
import { eventCategories } from "@/data/eventCategories";
import { eventsList } from "@/data/eventList";
import EventDetailClient from "./EventDetailClient";

interface Props {
  params: { eventNo: string };
}

export async function generateStaticParams() {
  return eventCategories.map((e) => ({ eventNo: String(e.eventNo) }));
}

export default function EventDetailPage({ params }: Props) {
  const eventNo = parseInt(params.eventNo, 10);
  if (isNaN(eventNo)) notFound();

  const category = eventCategories.find((e) => e.eventNo === eventNo);
  if (!category) notFound();

  // Find matching eventList entry(ies) by eventNo mapping
  const details = eventsList.filter((e) => e.eventNo === eventNo);

  return <EventDetailClient category={category} details={details} />;
}
