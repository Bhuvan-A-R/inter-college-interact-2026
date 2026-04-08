import prisma from "@/lib/db";
import { Data } from "@/components/register/registrations-view-table";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/register/registrations-view-table";

// import DataTableSkeleton from "@/components/register/data-table-skeleton";

export const docStatusMap = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  APPROVED: "Success",
  REJECTED: "Failed",
} as const;

const formatEventLabel = (
  eventName: string,
) => eventName.trim();

export default async function Page() {
  const session = await verifySession();
  if (!session || session.role != "REGISTRATION_TEAM") {
    redirect("/auth/signin");
  }

  const users = await prisma.user.findMany({
    include: {
      registrations: {
        include: {
          event: {
            select: { id: true, name: true, type: true, category: true },
          },
        },
      },
    },
    orderBy: [{ usn: "asc" }, { name: "asc" }],
  });

  // Build final rows for table
  const results: Data[] = [];

  for (const user of users) {
    const hasEvents = user.registrations.length > 0;

    const participantEvents = user.registrations.map((r) => ({
      eventName: formatEventLabel(r.event.name),
      role: "Participant" as const,
    }));

    const typeLabel = participantEvents.length > 0 ? "Participant" : "";

    if (!hasEvents || typeLabel === "") {
      results.push({
        id: user.id,
        name: user.name,
        usn: user.usn ?? "",
        collegeName: user.collegeName,
        photo: user.photoUrl ?? "",
        email: user.email,
        phone: user.phone,
        // Fields removed from schema — passed as empty strings for table compatibility
        collegeRegion: "",
        collegeCode: "",
        gender: "",
        idcardUrl: user.collegeIdCardUrl ?? "",
        dateOfBirth: "",
        type: "",
        events: [],
        status: "Pending",
      });
      continue;
    }

    results.push({
      id: `${user.id}#PARTICIPANT`,
      name: user.name,
      usn: user.usn ?? "",
      collegeName: user.collegeName,
      photo: user.photoUrl ?? "",
      email: user.email,
      phone: user.phone,
      collegeRegion: "",
      collegeCode: "",
      gender: "",
      idcardUrl: user.collegeIdCardUrl ?? "",
      dateOfBirth: "",
      type: typeLabel,
      events: participantEvents,
      status: "Pending",
    });
  }

  return (
    <div className="bg-background min-h-screen pt-10">
      <div className="mt-4 justify-center flex flex-col gap-4">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-primary font-bold text-5xl md:text-5xl xl:text-5xl mb-6">
            Registration Team : All registrants
          </h1>
        </div>
      </div>
      <div className="flex justify-center mt-4 gap-4 mb-3 flex-wrap "></div>

      <DataTable data={results} />
    </div>
  );
}
