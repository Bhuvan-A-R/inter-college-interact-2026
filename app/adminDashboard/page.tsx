import prisma from "@/lib/db";
import { DataTable, Data } from "@/components/register/admin-table";
import { Type } from "@prisma/client";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import Image from "next/image";

// import DataTableSkeleton from "@/components/register/data-table-skeleton";

export const docStatusMap = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  APPROVED: "Success",
  REJECTED: "Failed",
} as const;

interface AggregatedRow {
  registrantId: string;
  name: string;
  usn: string;
  collegeName: string;
  photoUrl: string;
  docStatus: keyof typeof docStatusMap;
  gender: string;
  phone: string;
  email: string;
  blood: string;
  collegeCode: string;
  registrations: Array<{
    type: Type | null;
    eventName: string | null;
    deptCode?: string | null;
    teamNumber?: number | null;
  }>;
}

const formatEventLabel = (
  eventName: string,
  deptCode?: string | null,
  teamNumber?: number | null,
) => {
  const dept = deptCode ? ` ${deptCode}` : "";
  const team = teamNumber ? ` Team ${teamNumber}` : "";
  return `${eventName}${dept}${team}`.trim();
};

export default async function Page() {
  const session = await verifySession();
  if (!session || session.role != "ADMIN") {
    redirect("/auth/signin");
  }

  // Single query with JSON aggregation + user filtering
  const aggregatedData: AggregatedRow[] = await prisma.$queryRaw`
    SELECT
      r.id AS "registrantId",
      r.name,
      r.usn,
      r."photoUrl",
      r.email,
      r.gender,
      r.blood,
      r."docStatus",
      r.phone,
      u."collegeName" AS "collegeName",
      u."collegeCode" AS "collegeCode",
      COALESCE(
        json_agg(
          json_build_object(
            'type', er.type,
            'eventName', e."eventName",
            'deptCode', e."deptCode",
            'teamNumber', e."teamNumber"
          )
        )
        FILTER (WHERE er.id IS NOT NULL),
        '[]'
      ) AS "registrations"
    FROM "Registrants" r
    LEFT JOIN "Users" u ON r."userId" = u.id
    LEFT JOIN "EventRegistrations" er ON r.id = er."registrantId"
    LEFT JOIN "Events" e ON er."eventId" = e.id
    GROUP BY r.id, u."collegeName", u."collegeCode"
    ORDER BY r.usn
  `;
  console.log(aggregatedData);

  // Build final rows for table
  const results: Data[] = [];

  for (const row of aggregatedData) {
    const hasEvents = row.registrations && row.registrations.length > 0;
    // Gather participant events
    const participantEvents = row.registrations
      .filter((r) => r.type === "PARTICIPANT" && r.eventName)
      .map((r) => ({
        eventName: formatEventLabel(r.eventName!, r.deptCode, r.teamNumber),
        role: "Participant" as const,
      }));

    const typeLabel = participantEvents.length > 0 ? "Participant" : "";

    // If no events or type not determined, push a blank record
    if (!hasEvents || typeLabel === "") {
      results.push({
        id: row.registrantId,
        name: row.name,
        usn: row.usn,
        collegeCode: row.collegeCode,
        phone: row.phone,
        collegeName: row.collegeName,
        photo: row.photoUrl,
        type: "",
        blood: row.blood,
        email: row.email,
        gender: row.gender,
        events: [],
        status: docStatusMap[row.docStatus],
      });
      continue;
    }

    // Combine events with role information
    const combinedEvents = participantEvents;

    results.push({
      id: `${row.registrantId}#${typeLabel.toUpperCase()}`,
      name: row.name,
      usn: row.usn,
      collegeName: row.collegeName,
      collegeCode: row.collegeCode,
      photo: row.photoUrl,
      phone: row.phone,
      type: typeLabel,
      blood: row.blood,
      email: row.email,
      gender: row.gender,
      events: combinedEvents,
      status: docStatusMap[row.docStatus],
    });
  }

  return (
    <div className="relative bg-background min-h-screen pt-10">
      {/* Watermark */}

      {/* Main Content */}
      <div className="relative z-10">
        <div className="mt-4 justify-center flex flex-col gap-4">
          <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-black font-bold text-5xl md:text-5xl xl:text-5xl mb-6">
              Admin: All registrants
            </h1>
          </div>
        </div>
        <div className="flex justify-center mt-4 gap-4 mb-3 flex-wrap">
          {/* Additional buttons can be placed here if needed */}
        </div>
        <DataTable data={results} />
      </div>
    </div>
  );
}
