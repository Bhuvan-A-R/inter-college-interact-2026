import prisma from "@/lib/db";
import { Data } from "@/components/register/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Type } from "@prisma/client";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { DataTableView } from "@/components/register/data-table-view";
import { ArrowLeft } from "lucide-react";

export const docStatusMap = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  APPROVED: "Success",
  REJECTED: "Failed",
} as const;

export default async function Page() {
  const session = await verifySession();
  if (!session) {
    redirect("/auth/signin");
  }
  const userIdFromSession = session.id as string;

  const registrants = await prisma.registrants.findMany({
    where: { userId: userIdFromSession },
    include: {
      eventRegistrations: {
        include: { event: true },
      },
    },
    orderBy: { usn: "asc" },
  });

  // Build final rows for table
  const results: Data[] = [];

  for (const registrant of registrants) {
    const registrations = registrant.eventRegistrations.map((reg) => ({
      type: reg.type,
      eventName: reg.event?.eventName ?? null,
    }));
    const hasEvents = registrations.length > 0;

    const participantEvents = registrations
      .filter((r) => r.type === "PARTICIPANT" && r.eventName)
      .map((r) => ({ eventName: r.eventName!, role: "Participant" as const }));
    const typeLabel = participantEvents.length > 0 ? "Participant" : "";

    // If no events or type not determined, push a blank record
    if (!hasEvents || typeLabel === "") {
      results.push({
        id: registrant.id,
        name: registrant.name,
        usn: registrant.usn,
        type: "",
        events: [],
        status: docStatusMap[registrant.docStatus],
      });
      continue;
    }

    // Combine events with role information
    const combinedEvents = participantEvents;

    results.push({
      id: `${registrant.id}#${typeLabel.toUpperCase()}`,
      name: registrant.name,
      usn: registrant.usn,
      type: typeLabel,
      events: combinedEvents,
      status: docStatusMap[registrant.docStatus],
    });
  }

  return (
    <div className="auth-shell items-start pt-10">
      <div className="relative z-10 w-full">
        <div className="mt-4 justify-center flex flex-col gap-4">
          <div className="max-w-4xl mx-auto p-4">
            <h1 className="auth-title text-5xl md:text-5xl xl:text-5xl mb-6">
              Registration List
            </h1>
          </div>
        </div>
        <div className="mx-auto w-full max-w-6xl auth-section p-4">
          <DataTableView data={results} />
        </div>

        <div className="flex w-full items-center justify-center pb-10">
          <Link href={"/auth/countdown"}>
            <Button className="auth-button auth-button-secondary px-6">
              <ArrowLeft className="ml-2 mr-2 h-4 w-4" />
              GO BACK
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
