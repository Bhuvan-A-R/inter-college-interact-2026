"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type ButtonProps = {
  label: string;
  onClick: () => void | Promise<void>;
  className?: string;
  disabled?: boolean;
};

// Custom Button Component
const Button = ({ label, onClick, className, disabled }: ButtonProps) => (
  <button
    className={`bg-gray-500 text-white text-sm px-6 py-2 rounded-md transition-transform duration-300 hover:scale-105 hover:bg-gray-600 ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

type RowItem = {
  slno: number;
  name: string;
  usn: string;
  phone: string;
  totalEvents: number;
  id: string;
};

type RegistrantApi = {
  id: string;
  name: string;
  usn: string;
  phone: string;
  events: unknown[];
};

const StudentTable = () => {
  const [rows, setRows] = useState<RowItem[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function getAllregistrant() {
      const res = await fetch("/api/getallregister", {
        method: "GET",
      });

      const data = await res.json();
      const resData = data.registrant;
      console.log(resData);

      const ListData: RowItem[] =
        (resData as RegistrantApi[] | undefined)?.map(
          (registrant, index: number) => ({
            slno: index + 1,
            name: registrant.name,
            usn: registrant.usn,
            phone: registrant.phone,
            totalEvents: registrant.events.length,
            id: registrant.id,
          }),
        ) || [];

      setRows(ListData);
    }
    getAllregistrant();
  }, []);

  const handleUpdate = async (id: string) => {
    router.push(`/register/updateregister/${id}`);
  };
  const handleRemove = async (id: string) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    try {
      const response = await fetch("/api/deleteregister", {
        method: "DELETE",
        body: JSON.stringify({ registrantId: id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      alert(data.message);
    } catch (err) {
      alert(err);
    }
    setRows(updatedRows);
  };

  return (
    <div id="webcrumbs">
      <div className="w-full bg-gradient-to-br from-white via-blue-50 to-white shadow-2xl rounded-lg overflow-hidden border border-neutral-300">
        <div className="p-5 ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-title font-semibold text-neutral-950 uppercase tracking-wide">
              List of students registered for the event
            </h2>
            <div className="flex gap-4">
              <Button
                label={"ADD Events"}
                className=""
                onClick={() => router.push("/register/eventregister")}
              />
              <span className="bg-primary-100 text-primary-950 text-sm rounded-full px-4 py-2 font-medium">
                {rows?.length}/45
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="max-h-[300px] overflow-y-scroll">
              <table className="min-w-full border-t border-neutral-300">
                <thead className="sticky top-0">
                  <tr className="bg-neutral-950 shadow-sm">
                    <th className="text-left py-4 px-6 text-white font-semibold uppercase tracking-wide">
                      Sl. No
                    </th>
                    <th className="text-left py-4 px-6 text-white font-semibold uppercase tracking-wide">
                      Name
                    </th>
                    <th className="text-left py-4 px-6 text-white font-semibold uppercase tracking-wide">
                      USN
                    </th>
                    <th className="text-left py-4 px-6 text-white font-semibold uppercase tracking-wide">
                      Phone
                    </th>
                    <th className="text-left py-4 px-6 text-white font-semibold uppercase tracking-wide">
                      Events Registered
                    </th>
                    <th className="text-left py-4 px-6 text-white font-semibold uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows?.map((student, index) => {
                    const colors = [
                      "text-neutral-900",
                      "text-neutral-800",
                      "text-neutral-700",
                      "text-neutral-600",
                      "text-neutral-500",
                    ];
                    const rowColor = colors[index % colors.length];
                    return (
                      <tr
                        key={student.slno}
                        className={`${
                          index % 2 === 0 ? "bg-blue-50" : "bg-white"
                        } hover:bg-gray-200 transition-all duration-300`}
                      >
                        <td
                          className={`border-t border-neutral-300 py-4 px-6 ${rowColor}`}
                        >
                          {student.slno}
                        </td>
                        <td
                          className={`border-t border-neutral-300 py-4 px-6 ${rowColor}`}
                        >
                          {student.name}
                        </td>
                        <td
                          className={`border-t border-neutral-300 py-4 px-6 ${rowColor}`}
                        >
                          {student.usn}
                        </td>
                        <td
                          className={`border-t border-neutral-300 py-4 px-6 ${rowColor}`}
                        >
                          {student.phone}
                        </td>
                        <td
                          className={`border-t border-neutral-300 py-4 px-6 ${rowColor}`}
                        >
                          {student.totalEvents}
                        </td>
                        <td className="border-t border-neutral-300 py-4 px-6 flex items-center gap-2">
                          <Button
                            label="Update"
                            onClick={() => handleUpdate(student.id)}
                          />
                          <Button
                            label="Remove"
                            onClick={() => handleRemove(student.id)}
                            className="bg-red-500 hover:bg-red-600"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center mt-4 gap-4">
            <Button
              label="Add"
              onClick={() => router.push("/register/documentupload")}
              className="bg-yellow-600 hover:bg-yellow-600 hover:scale-105"
              disabled={rows?.length > 45}
            />
            <Button
              label="Submit"
              className="bg-yellow-600 hover:bg-yellow-600 hover:scale-105"
              onClick={() => router.push("/paymentinfo")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
