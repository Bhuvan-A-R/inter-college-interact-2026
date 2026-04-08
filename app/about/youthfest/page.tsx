"use client";
import React from "react";
import Image from "next/image";

// Main Youth Fest banner image – update the path as needed.
// import youthFestBanner from "@/components/images/youthfest-banner.jpg";

// Youth Fest edition images – update these paths as needed.
// import youthFest2018 from "@/components/images/youthfest2018.jpg";
// import youthFest2019 from "@/components/images/youthfest2019.jpg";
// import youthFest2020 from "@/components/images/youthfest2020.jpg";
// import youthFest2021 from "@/components/images/youthfest2021.jpg";

const AboutYouthFest = () => {
  return (
    <div>
      <div className="overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] text-[#003366]">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="px-4 md:px-12 xl:px-6">
            <div className="relative">
              <div className="lg:w-2/3 md:text-center mx-auto">
                <h1 className="text-[#003366] font-bold text-5xl md:text-7xl xl:text-8xl">
                  About <span className="text-[#F4D03F]">Youth Fest</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Main Section: Youth Fest Banner & Introductory Text */}
          <div className="flex flex-col lg:flex-row items-center justify-between mt-10">
            {/* Youth Fest Banner Image */}
            <div className="w-full lg:w-1/2 px-4">
              <div className="relative z-10 transition-all duration-300 rounded-2xl cursor-pointer filter">
                {/* <Image
                  src={youthFestBanner }
                  alt="VTU Youth Fest Banner"
                  className="w-full h-[250px] object-cover rounded-2xl"
                /> */}
              </div>
            </div>
            {/* Introductory Text */}
            <div className="w-full lg:w-1/2 px-4 mt-8 lg:mt-0">
              <div>
                <p className="text-body-color text-justify mb-6 text-xl">
                  VTU Youth Fest is an annual celebration that encapsulates the spirit, creativity, and innovation of student life. Since its inception, the fest has grown into a vibrant platform where talents from various disciplines converge to compete, collaborate, and create unforgettable experiences.
                </p>
                <p className="text-body-color text-justify mb-6 text-xl">
                  With an exciting blend of competitions, workshops, cultural performances, and interactive sessions, Youth Fest continuously sets new benchmarks in collegiate events.
                </p>
              </div>
            </div>
          </div>

          {/* Fest Highlights Infographics Section */}
          <div className="px-4 md:px-12 xl:px-6 mt-16">
            <div className="mb-12">
              <h2 className="text-[#003366] font-bold text-4xl md:text-5xl xl:text-6xl text-center mb-8">
                Fest Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-[#003366] p-6">
                  <p className="text-4xl font-extrabold text-[#003366]">10+</p>
                  <p className="text-2xl mt-2">Years of Celebrations</p>
                </div>
                <div className="border border-[#003366] p-6">
                  <p className="text-4xl font-extrabold text-[#003366]">5000+</p>
                  <p className="text-2xl mt-2">Participants</p>
                </div>
                <div className="border border-[#003366] p-6">
                  <p className="text-4xl font-extrabold text-[#003366]">200+</p>
                  <p className="text-2xl mt-2">Events & Competitions</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="border border-[#003366] p-6">
                  <p className="text-4xl font-extrabold text-[#003366]">150+</p>
                  <p className="text-2xl mt-2">Workshops & Seminars</p>
                </div>
                <div className="border border-[#003366] p-6">
                  <p className="text-4xl font-extrabold text-[#003366]">50+</p>
                  <p className="text-2xl mt-2">Live Performances</p>
                </div>
                <div className="border border-[#003366] p-6">
                  <p className="text-4xl font-extrabold text-[#003366]">100+</p>
                  <p className="text-2xl mt-2">Sponsors & Partners</p>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Editions Section */}
          <div className="px-4 md:px-12 xl:px-6 mt-16">
            <div className="mb-12">
              <h2 className="text-[#003366] font-bold text-4xl md:text-5xl xl:text-6xl text-center mb-8">
                Previous Editions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Youth Fest 2018 */}
                <div className="border border-[#003366] rounded-xl overflow-hidden">
                  <div className="relative h-48">
                    {/* <Image
                      src={youthFest2018}
                      alt="Youth Fest 2018"
                      className="object-cover w-full h-full"
                    /> */}
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-3xl font-bold text-[#003366]">Youth Fest 2018</h3>
                    <p className="text-xl">
                      The inaugural edition that set the stage for a legacy of creative celebrations.
                    </p>
                  </div>
                </div>
                {/* Youth Fest 2019 */}
                <div className="border border-[#003366] rounded-xl overflow-hidden">
                  <div className="relative h-48">
                    {/* <Image
                      src={youthFest2019}
                      alt="Youth Fest 2019"
                      className="object-cover w-full h-full"
                    /> */}
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-3xl font-bold text-[#003366]">Youth Fest 2019</h3>
                    <p className="text-xl">
                      A dynamic fusion of competitions and cultural events that elevated the fest experience.
                    </p>
                  </div>
                </div>
                {/* Youth Fest 2020 */}
                <div className="border border-[#003366] rounded-xl overflow-hidden">
                  <div className="relative h-48">
                    {/* <Image
                      src={youthFest2020}
                      alt="Youth Fest 2020"
                      className="object-cover w-full h-full"
                    /> */}
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-3xl font-bold text-[#003366]">Youth Fest 2020</h3>
                    <p className="text-xl">
                      Innovating with a virtual twist, this edition redefined digital engagement.
                    </p>
                  </div>
                </div>
                {/* Youth Fest 2021 */}
                <div className="border border-[#003366] rounded-xl overflow-hidden">
                  <div className="relative h-48">
                    {/* <Image
                      src={youthFest2021}
                      alt="Youth Fest 2021"
                      className="object-cover w-full h-full"
                    /> */}
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-3xl font-bold text-[#003366]">Youth Fest 2021</h3>
                    <p className="text-xl">
                      A hybrid celebration blending live and virtual events to showcase unstoppable creativity.
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
                VTU Youth Fest is more than just an event—it's a journey of exploration, self-expression, and collective enthusiasm. Each edition brings new ideas, innovative formats, and boundless energy that continues to redefine what a collegiate fest can be.
              </p>
              <p className="text-body-color text-justify mb-6 text-xl">
                As the fest evolves with each passing year, it remains committed to providing a platform where students can push their creative boundaries, form lasting collaborations, and celebrate the spirit of youth.
              </p>
            </div>
          </div>

          {/* Footer Link */}
          <div className="text-center mt-12 px-4">
            <p className="text-xl">
              For more details and updates on upcoming editions, visit the official Youth Fest page at:{" "}
              <a
                href="http://www.vtuyouthfest.ac.in"
                target="_blank"
                rel="noreferrer"
                className="text-[#D32F23] font-bold"
              >
                www.vtuyouthfest.ac.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutYouthFest;