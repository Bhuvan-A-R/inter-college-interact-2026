"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// Define types for the student data
interface Event {
  id: string;
  eventNo: number;
  eventName: string;
  userId: string;
  maxParticipant: number;
  registeredParticipant: number;
  category: string;
  deptCode?: string | null;
  teamNumber?: number | null;
}

interface EventRegistrant {
  id: string;
  registrantId: string;
  eventId: string;
  prize: number;
}

interface StudentData {
  id: string;
  name: string;
  usn: string;
  events: Event[];
  photoUrl: string;
  idcardUrl?: string;
  userId: string;
  docStatus: "PENDING" | "PROCESSING" | "APPROVED" | "REJECTED";
  eventRegistrations: EventRegistrant[];
}

export default function GetRegistrant({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const formatEventLabel = (event: Event) => {
    const dept = event.deptCode ? ` ${event.deptCode}` : "";
    const team = event.teamNumber ? ` Team ${event.teamNumber}` : "";
    return `${event.eventName}${dept}${team}`.trim();
  };

  useEffect(() => {
    async function fetchRegistrant() {
      const slug = (await params).slug;
      const res = await fetch(`/api/getregister/${slug}`, {
        method: "GET",
      });

      const resData = await res.json();
      const data = resData.response;
      console.log(data);
      setStudentData(data);
      setIsVerified(data.docStatus === "APPROVED");
    }
    fetchRegistrant();
  }, []);

  // Handle toggle verification status
  const toggleVerification = async () => {
    setIsVerified(!isVerified);
    const res = await fetch("/api/markverified", {
      method: "POST",
      body: JSON.stringify({
        usn: studentData?.usn,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const resData = await res.json();
    alert(resData.message);
  };

  // Handle toggle attendance for event registration
  const toggleAttendance = async (
    usn: string,
    registrantId: string,
    eventId: string,
  ) => {
    console.log(eventId, usn, registrantId);
    const updatedRegistrations = studentData?.eventRegistrations.map(
      (registration) =>
        registration.registrantId === registrantId &&
        registration.eventId === eventId
          ? {
              ...registration,
              prize: registration.prize === 1 ? 0 : 1,
            }
          : registration,
    );

    if (studentData) {
      setStudentData({
        ...studentData,
        eventRegistrations: updatedRegistrations!,
      });
    }

    const res = await fetch("/api/attendancemark", {
      method: "POST",
      body: JSON.stringify({
        eventId,
        usn,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const resData = await res.json();
    alert(resData.message);
  };

  return (
    <div className="min-h-screen bg-50 flex items-center justify-center p-6">
      {/* Main Container centered */}
      <div className="w-full max-w-6xl mt-20 bg-white shadow-md rounded-lg p-6 ">
        {/* Header */}
        <div className="text-2xl font-bold mb-6">Student Dashboard</div>

        {/* Profile Section */}
        <Card className="mb-6">
          <div className="flex items-center space-x-6 p-5">
            <div className="w-32 h-32 border-4 border-blue-500 rounded-full flex items-center justify-center text-blue-500 font-bold">
              {/* Profile Picture */}
              {studentData?.photoUrl ? (
                <Image
                  src={`https://${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}.ufs.sh/f/${studentData.photoUrl}`}
                  alt="Profile"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 object-cover rounded-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <div>
              <div
                className={`text-xl font-semibold flex ${
                  isVerified ? "text-green-500" : "text-red-500"
                }`}
              >
                {studentData?.name}
                <div
                  // onClick={()=>toggleVerification()}
                  className={`ml-4 text-lg mx-4 mb-5 p-2 text-white rounded-lg ${isVerified ? "bg-green-600 hover:bg-green-600" : "bg-red-500 hover:bg-red-500"}`}
                  // disabled={isVerified ? true : false}
                >
                  {isVerified ? "Verified ✅" : "Unverified"}
                </div>
              </div>
              <div className="text-gray-500">USN: {studentData?.usn}</div>
            </div>
          </div>
        </Card>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Events Participated */}
          <Card>
            <div className="text-lg font-semibold mb-4 p-8">
              Events Registered
            </div>
            <ul className="space-y-2 p-5 overflow-auto">
              {studentData?.eventRegistrations.map((registration) => {
                const event = studentData?.events.find(
                  (e) => e.id === registration.eventId,
                );
                if (!event) return null;

                return (
                  <li
                    key={registration.id}
                    className={`p-3 rounded-lg ${
                      registration.prize === 1 ? "bg-blue-50" : "bg-gray-50"
                    } flex justify-between items-center`}
                  >
                    <span>{formatEventLabel(event)}</span>
                    <div className="flex space-x-2 items-center">
                      <Button
                        // onClick={() =>
                        //     toggleAttendance(
                        //         studentData.usn,
                        //         registration.registrantId,
                        //         registration.eventId
                        //     )
                        // }
                        className={`${
                          registration.prize === 1
                            ? "bg-green-500 hover:bg-green-500 "
                            : "bg-red-500 hover:bg-red-500 "
                        } text-white px-4 py-2 rounded`}
                      >
                        {registration.prize === 1 ? "Attended" : "Not Attended"}
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* Documents */}
          <Card>
            <div className="text-lg font-semibold mb-4 p-5 ">Documents</div>
            <div className="grid grid-cols-2 gap-3 p-5">
              {/* Render document links if you have them */}
              <a
                href={`https://${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}.ufs.sh/f/${studentData?.idcardUrl}`}
                className="bg-gray-100 p-3 rounded-lg flex items-center space-x-2 hover:bg-gray-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>📄</span>
                <span>ID Card</span>
              </a>

              {/* Add more documents similarly */}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
