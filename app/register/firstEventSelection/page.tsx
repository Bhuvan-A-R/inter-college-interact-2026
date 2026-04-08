"use server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/session";
import { eventCategories } from "@/data/eventCategories";
import EventRegister from "@/components/register/eventregister/EventRegister";

export type RegisteredEvent = {
  id: string;
  eventNo: number;
  eventName: string;
};

export default async function Page() {
  const session = await verifySession();
  if (!session) {
    redirect("/auth/signin");
  }

  if (session && session.role === "ADMIN") {
    redirect("/adminDashboard");
  }

  if (session && session.role === "REGISTRATION_TEAM") {
    redirect("/registrationTeamDashboard/registrationdetails");
  }

  const registered: RegisteredEvent[] = await prisma.events.findMany({
    select: { id: true, eventNo: true, eventName: true },
    where: { userId: session.id as string },
  });

  if (registered.length > 0) {
    redirect("/register/getallregister");
  }

  return (
    <div className="auth-shell my-20">
      <div className="w-full px-4">
        <h1 className="auth-title text-center text-4xl md:text-6xl xl:text-7xl mb-6">
          Event Registration
        </h1>
        <div className="flex flex-col gap-8">
          <EventRegister
            initialRegisteredEvents={registered}
            allEvents={eventCategories}
            userId={session.id as string}
          />
        </div>
      </div>
    </div>
  );
}
