import prisma from "@/lib/db";
// import {  Data } from "@/components/register/registrations-view-table";
import { Type } from "@prisma/client";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Data, DataTable } from "@/components/register/data-table-college";

// import DataTableSkeleton from "@/components/register/data-table-skeleton";

export const docStatusMap = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  APPROVED: "Success",
  REJECTED: "Failed",
} as const;

interface AggregatedRow {
  id: string;
  collegeName: string;
  collegeOurCode: string | null;
  region: string;
  phone: string;
  email: string;
  paymentUrl: string | null;
  txnNumber: string | null;
  Amount: number | null;
  PaymentVerified: string | null;
  _count: {
    events: number;
    registrants: number;
  };
}

export default async function Page() {
  const session = await verifySession();
  if (!session || session.role != "REGISTRATION_TEAM") {
    redirect("/auth/signin");
  }

  // Single query with JSON aggregation + user filtering
  const aggregatedData: AggregatedRow[] = await prisma.users.findMany({
    select: {
      collegeOurCode: true,
      collegeName: true,
      region: true,
      id: true,
      txnNumber: true,
      paymentUrl: true,
      Amount: true,
      email: true,
      phone: true,
      PaymentVerified: true,
      _count: {
        select: {
          events: true,
          registrants: true,
        },
      },
    },
  });

  // Build final rows for table
  const results: Data[] = [];

  for (const row of aggregatedData) {
    results.push({
      id: row.id,
      collegeName: row.collegeName,
      collegeCode: row.collegeOurCode,
      region: row.region,
      email: row.email,
      paymentUrl: row.paymentUrl,
      paymentVerified: row.PaymentVerified,
      txnNumber: row.txnNumber,
      phone: row.phone,
      Amount: row.Amount || 0,
      events: row._count.events,
      registration: row._count.registrants,
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
