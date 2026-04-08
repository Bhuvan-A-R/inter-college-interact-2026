import React from "react";
import Image, { type StaticImageData } from "next/image";
import convener1 from "@/public/images/convener1.png";
import convener2 from "@/public/images/convener2.png";
import convener3 from "@/public/images/IMG_0101 - Akshith M.jpeg";
import convener5 from "@/public/images/Screenshot_20241112_141230_Instagram - Bhuvan Sudhakar.jpg";
import domain1 from "@/public/images/1710529304549.jpeg.jpg"
import domain2 from "@/public/images/image4 (2).jpg"
import domain4 from "@/public/images/WhatsApp Image 2025-02-28 at 11.30.48.jpeg"
import domain5 from "@/public/images/IMG_20250228_112313.jpg"
import faculty1 from"@/public/dignitaries/snr.jpeg"
import faculty2 from"@/public/images/300048.jpg"
import faculty3 from "@/public/images/anand.png"
import faculty4 from"@/public/images/Shyam.jpg"
import faculty5 from"@/public/images/WhatsApp Image 2025-02-28 at 12.32.21.jpeg"
import placeholder from "@/public/images/placeholder.jpg";

// Define the Member type to accept StaticImageData
type Member = { name: string; role: string; image: StaticImageData };

const conveners: Member[] = [
  { name: "Abhay Surya L R", role: "Student Convener", image: convener1 },
  { name: "Manya S", role: "Student Convener", image: convener2 },
  { name: "Akshith M", role: "Student Convener", image: convener3 },
  { name: "Bhumika Ganesh", role: "Student Convener", image: placeholder },
  { name: "Bhuvan Sudhakar", role: "Student Convener", image: convener5 },
];

const domainHeads: Member[] = [
  { name: "Bhuvan S A", role: "Domain Head", image: domain1 },
  { name: "Sohan K E", role: "Domain Head", image: domain2 },
  { name: "Chalana B Arun", role: "Domain Head", image: placeholder },
  { name: "Keerthan K Acharya", role: "Domain Head", image: domain4 },
  { name: "Bhavya Bhosale", role: "Domain Head", image: domain5 },
];

const coreCommittee: Member[] = [
  { name: "TBA", role: "Core Committee", image: placeholder },
  { name: "TBA", role: "Core Committee", image: placeholder },
  { name: "TBA", role: "Core Committee", image: placeholder },
  { name: "TBA", role: "Core Committee", image: placeholder },
];

const subCoreCommittee: Member[] = [
  { name: "TBA", role: "Sub-Core Committee", image: placeholder },
  { name: "TBA", role: "Sub-Core Committee", image: placeholder },
  { name: "TBA", role: "Sub-Core Committee", image: placeholder },
  { name: "TBA", role: "Sub-Core Committee", image: placeholder },
];

const facultyCoordinators: Member[] = [
  { name: "Lt. Saravanan R", role: "Organizing Secretary", image: faculty1 },
  { name: "Dr. Girish Rao Salnke", role: "Faculty Co-Convener", image: faculty2 },
  { name: "Prof. Anand Panduranga", role: "Faculty Co-Convener", image: faculty3 },
  { name: "Prof. Shyam Sundar Bhushan", role: "Faculty Co-Convener", image: faculty4 },
  { name: "Dr Vimuktha Evangeleen Salis", role: "Faculty Co-Convener", image: faculty5 },
];

interface TeamSectionProps {
  title: string;
  members: Member[];
  columns: string;
}

const TeamSection: React.FC<TeamSectionProps> = ({ title, members, columns }) => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-600 via-[#800000] to-red-900 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className={`grid gap-8 ${columns}`}>
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 hover:rotate-1 hover:shadow-3xl"
          >
            <div className="relative h-56 w-full">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-red-600 via-[#800000] to-red-900 bg-clip-text text-transparent">
                {member.name}
              </h3>
              <p className="text-gray-700">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function OurTeam() {
  return (
    <div className="min-h-screen pt-10 pb-10 bg-gradient-to-r from-[#FFD700] to-[#DAA520] p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-5xl md:text-6xl font-extrabold mb-12 bg-gradient-to-r from-red-600 via-[#800000] to-red-900 bg-clip-text text-transparent">
          Technical Committee
        </h1>

        <TeamSection
          title="Faculty Coordinators"
          members={facultyCoordinators}
          columns="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        />
        
        <TeamSection
          title="Student Conveners"
          members={conveners}
          columns="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        />

        <TeamSection
          title="Domain Heads"
          members={domainHeads}
          columns="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        />

        <TeamSection
          title="Core Committee"
          members={coreCommittee}
          columns="grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
        />

        <TeamSection
          title="Sub-Core Committee"
          members={subCoreCommittee}
          columns="grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
        />

    
      </div>
    </div>
  );
}

