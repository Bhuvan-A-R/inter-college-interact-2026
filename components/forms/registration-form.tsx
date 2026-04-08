"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registrantSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ParticipantTypeSelect } from "./participant-type-select";
import { DocumentUploadSection } from "./document-upload-section";
import { EventSelection } from "./event-selection";
import { Card } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { FormHeader } from "./form-header";
import { PersonalInfoFields } from "./personal-info-fields";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function RegistrationForm() {
    const router = useRouter();
    const [events, setEvents] = useState<
        Array<{ name: string; attended: boolean }>
    >([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(registrantSchema),
    });

    const onSubmit = async (data: any) => {
        console.log(data);
        // Handle form submission

        const formData = new FormData();
        formData.append(
            "data",
            JSON.stringify({
                name: data.name,
                usn: data.usn,
                type: data.type,
                events: data.events,
            })
        );
        formData.append("sslc", data.sslc);
        formData.append("puc", data.puc);
        formData.append("aadhar", data.aadhar);
        formData.append("admission", data.admission);
        formData.append("idcard", data.idcard);
        formData.append("photo", data.photo);

        try {
            const response = await fetch("/api/register", {
                body: formData,
                method: "POST",
            });

            if (response.ok) {
                // Handle success
                const result = await response.json();
                toast.success("Registration successful!", {
                    position: "top-right",
                    duration: 3000,
                    className: "text-green",
                });

                router.push("/getdetails");
                console.log(result);
            } else {
                // Handle failure
                const errorMessage = await response.text();
                toast.error(`Registration failed: ${errorMessage}`, {
                    position: "top-right",
                    duration: 3000,
                    className: "text-red",
                });
            }
        } catch (error) {
            // Handle error
            toast.error("An unexpected error occurred!", {
                position: "top-right",
            });
            console.error(error);
        }
    };

    return (
        <Card className="p-6 space-y-8">
            <FormHeader />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <PersonalInfoFields register={register} errors={errors} />

                <ParticipantTypeSelect
                    onValueChange={(value) => setValue("type", value)}
                />

                <EventSelection
                    events={events}
                    onChange={(newEvents) => {
                        setEvents(newEvents);
                        setValue("events", newEvents);
                    }}
                />

                <DocumentUploadSection setValue={setValue} errors={errors} />

                <Button type="submit" className="w-full">
                    Register
                </Button>
            </form>
        </Card>
    );
}
