import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
// Then use Prisma.SomeSpecificType

import { DataTable, Data } from "@/components/register/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { PenSquare, UserPlus } from "lucide-react";
import { PaymentDialog } from "@/components/getRegister/paymentDialog";

export const docStatusMap = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  APPROVED: "Success",
  REJECTED: "Failed",
} as const;

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
  if (!session) {
    redirect("/auth/signin");
  }
  const userIdFromSession = session.id as string;

  const user = await prisma.user.findUnique({
    where: { id: userIdFromSession },
    select: { id: true, name: true, usn: true },
  });
  if (!user) {
    redirect("/auth/signin");
  }

  const registrations = await prisma.registration.findMany({
    where: { userId: userIdFromSession },
    include: { event: true },
  });

  // Build final rows for table
  const results: Data[] = [];

  const participantEvents = registrations
    .filter((r: any) => r.event?.name)
    .map((r: any) => ({
      eventName: r.event?.name ?? "",
      role: "Participant" as const,
    }));
  const typeLabel = participantEvents.length > 0 ? "Participant" : "";

  if (typeLabel === "") {
    results.push({
      id: user.id,
      name: user.name,
      usn: user.usn ?? "",
      type: "",
      events: [],
      status: docStatusMap.PENDING,
    });
  } else {
    results.push({
      id: `${user.id}#${typeLabel.toUpperCase()}`,
      name: user.name,
      usn: user.usn ?? "",
      type: typeLabel,
      events: participantEvents,
      status: docStatusMap.PENDING,
    });
  }

  return (
    <div className="auth-shell items-start pt-20">
      <div className="relative z-10 w-full">
        <div className="mt-4 justify-center flex flex-col gap-4">
          <div className="max-w-4xl mx-auto p-4">
            <h1 className="auth-title text-5xl md:text-5xl xl:text-5xl mb-6">
              Registration List
            </h1>
          </div>
        </div>
        <div className="flex justify-center mt-4 gap-4 mb-3 flex-wrap">
          <Link href="/register/modifyevents">
            <Button
              variant="outline"
              className="auth-button auth-button-secondary px-6"
            >
              <PenSquare className="mr-2 h-5 w-5" />
              Modify Events
            </Button>
          </Link>
          <Link href="/register/addRegistrant">
            <Button
              variant="outline"
              className="auth-button auth-button-secondary px-6"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Add Registrant
            </Button>
          </Link>
        </div>

        <div className="mx-auto w-full max-w-6xl auth-section p-4">
          <DataTable data={results} />
        </div>

        <div className="flex flex-col items-center mt-8 mb-5 gap-4">
          {/* Render PaymentDialog only once. Assume PaymentDialog uses the trigger passed via children or className. */}
          <PaymentDialog className="auth-button px-6" />
        </div>
      </div>
    </div>
  );
}
