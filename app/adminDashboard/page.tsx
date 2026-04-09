import prisma from "@/lib/db";
import { DataTable, Data } from "@/components/register/admin-table";
import { getAuthSession } from "@/lib/authCookie";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const newSession = await getAuthSession();
  const legacySession = await verifySession();
  const session = newSession ?? legacySession;

  if (!session?.id) {
    redirect("/auth/signin");
  }

  // Fresh DB check — do not rely on JWT claims alone
  const currentUser = await prisma.user.findUnique({
    where: { id: session.id as string },
    select: { role: true, emailVerified: true },
  });

  const isAdmin = currentUser?.role === "SUPER_ADMIN";

  if (!currentUser || !isAdmin || !currentUser.emailVerified) {
    redirect("/dashboard?error=unauthorized");
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

  const results: Data[] = users.map((user) => {
    const events = user.registrations.map((r) => ({
      eventName: r.event.name,
      role: "Participant" as const,
    }));

    return {
      id: user.id,
      name: user.name,
      usn: user.usn ?? "",
      collegeName: user.collegeName,
      photo: user.photoUrl ?? "",
      email: user.email,
      phone: user.phone,
      // Fields removed from schema — passed as empty strings for table compatibility
      collegeCode: "",
      gender: "",
      blood: "",
      type: events.length > 0 ? "Participant" : "",
      events,
      status: "Pending" as const,
    };
  });

  return (
    <div className="bg-background min-h-screen pt-10">
      <div className="mt-4 justify-center flex flex-col gap-4">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-primary font-bold text-5xl md:text-5xl xl:text-5xl mb-6">
            Admin Dashboard
          </h1>
        </div>
      </div>
      <DataTable data={results} />
    </div>
  );
}
