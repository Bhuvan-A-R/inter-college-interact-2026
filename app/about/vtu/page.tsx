"use client";
import React from "react";
import Image from "next/image";
// Main VTU banner image – update the path as needed.
import vtuImage from "@/components/images/vtu.jpg";

// Regional center images – update these paths as needed.
import bengaluruImg from "@/components/images/bengaluru.jpg";
import belagaviImg from "@/components/images/belagavi.jpg";
import kalaburagiImg from "@/components/images/kalaburagi.jpg";
import mysuruImg from "@/components/images/mysuru.jpg";

const AboutVTU = () => {
  return (
    <div>
      <div className="overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] text-[#003366]">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="px-4 md:px-12 xl:px-6">
            <div className="relative">
              <div className="lg:w-2/3 md:text-center mx-auto">
                <h1 className="text-[#003366] font-bold text-5xl md:text-7xl xl:text-8xl">
                  About <span className="text-[#F4D03F]">VTU</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Main Section: VTU Image & Introductory Text */}
          <div className="flex flex-col lg:flex-row items-center justify-between mt-10">
            {/* VTU Image */}
            <div className="w-full lg:w-1/2 px-4">
              <div className="relative z-10 transition-all duration-300 rounded-2xl cursor-pointer filter">
                <Image
                  src={vtuImage}
                  alt="Visvesvaraya Technological University"
                  className="w-full h-[250px] object-cover rounded-2xl"
                />
              </div>
            </div>
            {/* Introductory Text */}
            <div className="w-full lg:w-1/2 px-4 mt-8 lg:mt-0">
              <div>
                <p className="text-body-color text-justify mb-6 text-xl">
                  VTU is one of the largest Technological Universities in India with{" "}
                  <strong className="text-[#F4D03F]">27 years of tradition</strong> of excellence in Engineering &amp; Technical Education, Research, and Innovations. Established in <strong>1998</strong>, VTU was founded to meet the needs of Indian industries for trained technical manpower possessing both practical experience and sound theoretical knowledge.
                </p>
                <p className="text-body-color text-justify mb-6 text-xl">
                  The university has successfully unified various colleges – previously affiliated with different universities, with different syllabi, procedures, and traditions – under one umbrella.
                </p>
              </div>
            </div>
          </div>

          {/* University Composition Section */}
          <div className="px-4 md:px-12 xl:px-6 mt-16">
            <div className="mb-12">
              <h2 className="text-[#003366] font-bold text-4xl md:text-5xl xl:text-6xl text-center mb-8">
                University Composition
              </h2>
              {/* College Affiliations */}
              <div className="mb-10">
                <h3 className="text-3xl font-bold text-[#003366] mb-4">
                  College Affiliations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border border-[#003366] p-6">
                    <p className="text-4xl font-extrabold text-[#003366]">189</p>
                    <p className="text-2xl mt-2">Affiliated Colleges</p>
                  </div>
                  <div className="border border-[#003366] p-6">
                    <p className="text-4xl font-extrabold text-[#003366]">1</p>
                    <p className="text-2xl mt-2">Constituent College</p>
                  </div>
                  <div className="border border-[#003366] p-6">
                    <p className="text-4xl font-extrabold text-[#003366]">37</p>
                    <p className="text-2xl mt-2">Autonomous Colleges</p>
                  </div>
                </div>
              </div>
              {/* Programs Offered */}
              <div>
                <h3 className="text-3xl font-bold text-[#003366] mb-4">
                  Programs Offered
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border border-[#003366] p-6">
                    <p className="text-4xl font-extrabold text-[#003366]">37</p>
                    <p className="text-2xl mt-2">Undergraduate Programs</p>
                  </div>
                  <div className="border border-[#003366] p-6">
                    <p className="text-4xl font-extrabold text-[#003366]">96</p>
                    <p className="text-2xl mt-2">Postgraduate Programs</p>
                  </div>
                  <div className="border border-[#003366] p-6">
                    <p className="text-4xl font-extrabold text-[#003366]">7</p>
                    <p className="text-2xl mt-2">Faculty of Research Programs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Centers Section */}
          <div className="px-4 md:px-12 xl:px-6 mt-16">
            <div className="mb-12">
              <h2 className="text-[#003366] font-bold text-4xl md:text-5xl xl:text-6xl text-center mb-8">
                Regional Centers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Bengaluru */}
                <div className="border border-[#003366] rounded-xl overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={bengaluruImg}
                      alt="Bengaluru Center"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-3xl font-bold text-[#003366]">Bengaluru</h3>
                    <p className="text-xl">
                     The technological hub and innovation capital, home to VTU’s advanced research and development facilities.
                    </p>
                  </div>
                </div>
                {/* Belagavi */}
                <div className="border border-[#003366] rounded-xl overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={belagaviImg}
                      alt="Belagavi Center"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-3xl font-bold text-[#003366]">Belagavi</h3>
                    <p className="text-xl">
                     The administrative headquarters of VTU, fostering strong industry collaborations and academic excellence.

                    </p>
                  </div>
                </div>
                {/* Kalaburagi */}
                <div className="border border-[#003366] rounded-xl overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={kalaburagiImg}
                      alt="Kalaburagi Center"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-3xl font-bold text-[#003366]">Kalaburagi</h3>
                    <p className="text-xl">
                      A center for emerging technologies and research, supporting innovation in technical education.
                    </p>
                  </div>
                </div>
                {/* Mysuru */}
                <div className="border border-[#003366] rounded-xl overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={mysuruImg}
                      alt="Mysuru Center"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-3xl font-bold text-[#003366]">Mysuru</h3>
                    <p className="text-xl">
                     A city rich in cultural heritage, known for its serene academic environment and quality education.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="px-4 md:px-12 xl:px-6 mt-16">
            <div>
              <p className="text-body-color text-justify mb-6 text-xl">
                VTU is a multi-disciplinary and multi-level institution offering a wide range of programmes in engineering, technology, and management. The university is steadily progressing in developing and providing the best technical environment for education and will continue to serve the nation in the coming years.
              </p>
              <p className="text-body-color text-justify mb-6 text-xl">
                Equipped with an outstanding student body and faculty, robust partnerships with industry, government, and business, and strong support from alumni and friends, VTU is designing a future of global preeminence, leadership, and service.
              </p>
            </div>
          </div>

          {/* Footer Link */}
          <div className="text-center mt-12 px-4">
            <p className="text-xl">
              For comprehensive details, visit the official VTU website at:{" "}
              <a
                href="http://www.vtu.ac.in"
                target="_blank"
                rel="noreferrer"
                className="text-[#D32F23] font-bold"
              >
                www.vtu.ac.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutVTU;
