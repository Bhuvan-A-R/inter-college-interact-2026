"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import cheif1 from "@/public/images/3.png";
import cheif2 from "@/public/dignitaries/Aisshwarya DKS Hegde (1).jpg";
import cheif3 from "@/public/dignitaries/Vice chancellor  S. Vidyashankar VTU.jpg";
import patron1 from "@/public/dignitaries/FinanceOfficer Prashanth Nayaka VTU.jpg";
import patron2 from "@/public/dignitaries/Physical Education Director Kadagada kai VTU.png";
import patron3 from "@/public/dignitaries/Registrar Dr. B. E. Rangaswamy VTU.jpg";
import patron4 from "@/public/dignitaries/Registrar Shrinivas VTU.png";
import patron5 from "@/public/images/1.png";
import organize1 from "@/public/dignitaries/hbp.png";
import organize2 from "@/public/dignitaries/snr.jpeg";
import organize3 from "@/public/images/2.png";
import organize4 from "@/public/images/placeholder.jpg";
import organize5 from "@/public/images/deanstudentaffairs.png";
const Dignitaries = () => {
    const committee = {
        chiefPatron: {
            title: "Chief Patron",
            members: [
                {
                    name: "SRI D K SHIVAKUMAR",
                    role: "CHAIRMAN, NEF",
                    image: cheif1,
                },
                {
                    name: "MS AISSHWARYA DKS HEGDE",
                    role: "TRUSTEE SECRETARY, NEF",
                    image: cheif2,
                },
                {
                    name: "Dr VIDYASHANKAR S",
                    role: "VICE CHANCELLOR VTU, BELAGAVI",
                    image: cheif3,
                },
            ],
        },
        patrons: {
            title: "Patrons",
            members: [
                {
                    name: "Dr NAGAMANI NAGARAJA",
                    role: "CHIEF OF STRATEGY AND SYSTEMS,NEF",
                    image: patron5,
                },
                {
                    name: "Dr B E RANGASWAMY",
                    role: "REGISTRAR VTU, BELAGAVI",
                    image: patron3,
                },
                {
                    name: "Dr PRASHANTHA NAYAKA G",
                    role: "FINANCE OFFICER VTU, BELAGAVI",
                    image: patron1,
                },
                {
                    name: "Dr T N SREENIVAS",
                    role: "REGISTRAR(EVALUATION) VTU, BELAGAVI",
                    image: patron4,
                },
                {
                    name: "Dr P V KADAGADAKAI ",
                    role: "DIRECTOR OF PHYSICAL EDUCATION I/C VTU, BELAGAVI",
                    image: patron2,
                },
            ],
        },
        organizingChairs: {
            title: "ORGANIZING CHAIRS",
            members: [
                {
                    name: "Dr. H B Balakrishna",
                    role: "PRINCIPAL , GAT",
                    image: organize1,
                },
                {
                    name: "Dr. A Sreedhar Kumar",
                    role: "CAMPUS DIRECTOR , GAT",
                    image: organize3,
                },
                {
                    name: "Dr. Latha Rajagopalan",
                    role: "Dean-Academics , GAT",
                    image: organize4,
                },
                {
                    name: "Dr. Ravi J",
                    role: "Dean-Student Affairs & Welfare, GAT",
                    image: organize5,
                },
                {
                    name: "Lt. Saravannan R",
                    role: "PHYSICAL EDUCATION DIRECTOR, GAT",
                    image: organize2,
                },
            ],
        },
    };

    return (
        <div>
            <div className="flex flex-col min-h-screen pt-20 px-28 mt-24 pb-12 lg:pt-[120px] bg-gradient-to-br from-background to-secondary">
                <div className="container  px-4">
                    {Object.entries(committee).map(([key, section]) => (
                        <div key={key} className="mb-16 ">
                            <h2 className="text-4xl font-semibold mb-8 text-center">
                                {section.title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {section.members.map((member, index) => (
                                    <Card
                                        key={index}
                                        className=" overflow-hidden hover:shadow-lg transition-shadow"
                                    >
                                        <CardHeader className="p-0 ">
                                            <div className="relative  h-80 bg-gray-200">
                                                <Image
                                                    src={
                                                        member.image ||
                                                        "/placeholder.svg?height=192&width=384"
                                                    }
                                                    alt={`Photo of ${member.name}`}
                                                    fill
                                                    className="object-fill"
                                                />
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-6 text-center">
                                            <h3 className="font-semibold text-xl mb-2">
                                                {member.name}
                                            </h3>
                                            <p className="text-xl text-muted-foreground">
                                                {member.role}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dignitaries;
