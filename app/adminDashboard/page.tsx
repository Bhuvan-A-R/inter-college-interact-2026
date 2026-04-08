// 1. Change the import from Type to EventType
import { EventType as Type } from "@prisma/client";
import prisma from "@/lib/db";

// Add this back for the 'docStatusMap' error
export const docStatusMap = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  APPROVED: "Success",
  REJECTED: "Failed",
} as const;
// ... other imports

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
    type: Type | null; // This now correctly uses EventType
    eventName: string | null;
    deptCode?: string | null;
    teamNumber?: number | null;
  }>;
}

// 2. Fix your $queryRaw to use the correct table names (User, Event, Registration)
const aggregatedData: AggregatedRow[] = await prisma.$queryRaw`
    SELECT
      r.id AS "registrantId",
      r.name,
      r.usn,
      r."photoUrl",
      r.email,
      r.gender,
      r.blood,
      r."docStatus", -- Ensure this field exists in your User model
      r.phone,
      u."collegeName" AS "collegeName",
      u."collegeCode" AS "collegeCode",
      COALESCE(
        json_agg(
          json_build_object(
            'type', er.type,
            'eventName', e."name",
            'deptCode', e."deptCode", -- Verify if deptCode exists in Event model
            'teamNumber', e."teamNumber" -- Verify if teamNumber exists in Event model
          )
        )
        FILTER (WHERE er.id IS NOT NULL),
        '[]'
      ) AS "registrations"
    FROM "User" r
    LEFT JOIN "User" u ON r.id = u.id -- Adjust join logic if necessary
    LEFT JOIN "Registration" er ON r.id = er."userId"
    LEFT JOIN "Event" e ON er."eventId" = e.id
    GROUP BY r.id, u."collegeName", u."collegeCode"
    ORDER BY r.usn
  `;
