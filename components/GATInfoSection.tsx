import Image from "next/image";
import collegeImg from "@/components/images/college.jpg";

const GATInfoSection = () => {
  return (
    <div className="max-w-5xl mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-lg mb-8">
      <section className="bg-[#003366] text-white py-8 px-4 md:px-8">
        <div className="mb-6 text-left">
          <p className="text-4xl font-bold text-[#F4D03F]">
            GLOBAL ACADEMY OF TECHNOLOGY
          </p>
          <p className="text-2xl font-bold text-[#D32F23] mt-2">
            GROWING AHEAD OF TIME
          </p>
          <p className="text-2xl font-bold text-white mt-2">
            AN AUTONOMOUS INSTITUTE, AFFILIATED TO VTU
          </p>
        </div>

        <div className="text-left text-xl space-y-6">
          <div>
            <p className="font-semibold">-- WHO WE ARE</p>
            <div className="relative">
              <div className="hidden md:block float-right ml-4 mb-4 w-64">
                <Image
                  src={collegeImg}
                  alt="College Image"
                  className="rounded-lg"
                />
              </div>
              <p>
                Global Academy of Technology is an A-grade College counted among
                the best engineering colleges in Bangalore. Equipped with modern
                technology and top-notch infrastructure, the institution fosters
                an ambience and culture that accelerates learning. The
                Management, Principal, and Staff believe in the overall
                development of students, encouraging active participation in
                co-curricular, extra-curricular, and sports events.
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold">-- Why is 2025 iconic for GAT?</p>
            <p>
              This year 2025 marks a momentous milestone as the institution
              celebrates its Silver Jubilee – 25 years of academic excellence,
              innovation, and transformative education. With a legacy of shaping
              future leaders and achievers, GAT continues to set benchmarks in
              higher education, solidifying its position as a premier
              destination for aspiring engineers and managers.
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <div className="flex space-x-2 items-center">
            <svg
              className="w-6 h-6 text-[#bbc5c6]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className="text-[#bbc5c6]">24th March 2025</span>
          </div>
          <div className="flex space-x-2 items-center">
            <svg
              className="w-6 h-6 text-red-600"
              viewBox="0 0 24 24"
              fill="red"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2 C7.03 2 3 6.03 3 11 C3 16.55 12 22 12 22 C12 22 21 16.55 21 11 C21 6.03 16.97 2 12 2 Z"></path>
              <circle cx="12" cy="11" r="4"></circle>
            </svg>
            <a href="https://maps.app.goo.gl/SQYGicDVGunvnhYc7">
              <span className="text-blue-200 font-semibold">
                Global Academy of Technology
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GATInfoSection;
