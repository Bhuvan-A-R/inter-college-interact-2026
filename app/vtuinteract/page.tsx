// app/home/page.tsx
import React from "react";
import "@/app/globals.css";
import Header from "@/components/Background";
import Image from "next/image";

// Import your images – update the paths as needed.
import brandKarnatakaImg from "@/components/images/brand-karnataka.jpg"; // wide image: 884x220
import collegeImg from "@/components/images/college.jpg";

const Home = () => {
  return (
    <div className="bg-background sm:margins  md:pt-5 ">
      {/* Carousel / Header Section in an elegant bordered container with extra shadow */}
      <div className="max-w-5xl mx-auto border  border-gray-300 rounded-lg overflow-hidden shadow-2xl mb-8">
        <Header />
      </div>

      <div className="relative z-10">
        {/* Blue Box Section: Global Academy of Technology */}
        <div className="max-w-5xl mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-lg mb-8">
          <section className="bg-[#003366] text-white py-8 px-4 md:px-8">
            {/* Header Titles */}
            <div className="mb-6 text-left">
              <p className="text-4xl font-bold  text-[#F4D03F]">
                GLOBAL ACADEMY OF TECHNOLOGY
              </p>
              <p className="text-2xl font-bold text-[#D32F23] mt-2">
                GROWING AHEAD OF TIME
              </p>
              <p className="text-2xl font-bold text-white mt-2">
                AN AUTONOMOUS INSTITUTE, AFFILIATED TO VTU
              </p>
            </div>

            {/* Text Content with a floated image on medium screens and above */}
            <div className="text-left text-xl space-y-6"> 
              <div>
                <p className="font-semibold">-- WHO WE ARE</p>
                <div className="relative">
                  {/* College Image floated to the right on md and above */}
                  <div className="hidden md:block float-right ml-4 mb-4 w-64">
                    <Image
                      src={collegeImg}
                      alt="College Image"
                      className="rounded-lg"
                    />
                  </div>
                  <p>
                    Global Academy of Technology is an A-grade Cooollege counted
                    among the bestesr engineering colleges in Bangalore. Equipped
                    with modern technology and top‑notch infrastructure, the
                    institution fosters an ambience and culture that accelerates
                    learning. The Management, Principal, and Staff beiieve in th
                    overall development of students, encouraging active
                    participation in co‑curricular, extra‑curricular, and sports
                    events.
                  </p>
                </div>
              </div>
              <div>
                <p className="font-semibold">-- Why is 2025 iconic for GAT?</p>
                <p>
                  This year 2025 marks a momentous milestone as the institution
                  celebrates its Silver Jubilee – 25 years of academic excellence,
                  innovation, and transformative education. With a legacy of
                  shaping future leaders and achievers, GAT continues to set
                  benchmarks in higher education, solidifying its position as a
                  premier destination for aspiring engineers and managers.
                </p>
              </div>
            </div>

            {/* Quick Info */}
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

        {/* Our Theme Section */}
        <div className="max-w-5xl mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-lg mb-8">
          <section className="bg-background py-16 px-4 md:px-8">
            {/* Because the theme image is wide (884x220), we use it as a banner */}
            <div className="mb-8">
              <Image
                src={brandKarnatakaImg}
                alt="Brand Karnataka"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="text-center mb-12">
              <h3 className="text-[#F4D03F] font-bold text-3xl mb-4">
                VTU Youth Fest 2025 – Brand Karnataka
              </h3>
              <p className="text-xl text-[#003366]">
                Celebrating Culture, Tradition &amp; the Spirit of Bengaluru
              </p>
            </div>

            {/* Theme Details */}
            <div className="mb-12">
              <p className="text-xl text-justify text-[#003366] mb-6">
                Karnataka is a land where tradition meets modernity, where ancient
                art forms thrive alongside contemporary creativity. This year, the
                VTU Youth Fest 2025 proudly presents "Brand Karnataka", a theme
                dedicated to celebrating our state’s rich cultural heritage and the
                dynamic spirit of Bengaluru—the heart of Karnataka!
              </p>

              <h4 className="text-2xl font-bold text-[#D32F23] mb-4">
                Why ‘Brand Karnataka’?
              </h4>
              <p className="text-xl text-justify text-[#003366] mb-6">
                Karnataka is not just a state; it is an identity, a legacy, a cultural
                powerhouse. It is home to some of India's greatest artists, musicians,
                dancers, playwrights, and thinkers. The world knows Karnataka for its
                heritage, literature, folk traditions, and classical arts, and at the
                same time, it recognizes Bengaluru as a global hub of innovation and
                talent. This fest is a tribute to both—the timeless traditions of
                Karnataka and the unstoppable energy of Bengaluru.
              </p>

              {/* What Makes Karnataka a Cultural Brand Tiles */}
              <h4 className="text-2xl font-bold text-[#D32F23] mb-4">
                What Makes Karnataka a Cultural Brand?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                {/* Tile 1 */}
                <div className="border border-[#003366] p-4 rounded-lg shadow hover:shadow-2xl transition">
                  <div className="text-3xl mb-2">🎶</div>
                  <h5 className="text-xl font-bold text-[#D32F23] mb-1">
                    Music &amp; Dance
                  </h5>
                  <p className="text-lg text-[#003366]">
                    From mesmerizing Carnatic music to Dollu Kunitha’s powerful beats,
                    Karnataka has given the world some of its finest artists.
                  </p>
                </div>
                {/* Tile 2 */}
                <div className="border border-[#003366] p-4 rounded-lg shadow hover:shadow-2xl transition">
                  <div className="text-3xl mb-2">🎭</div>
                  <h5 className="text-xl font-bold text-[#D32F23] mb-1">
                    Theater &amp; Storytelling
                  </h5>
                  <p className="text-lg text-[#003366]">
                    Birthplace of Yakshagana, puppet theatre, and modern Kannada theatre,
                    bringing captivating stories to life.
                  </p>
                </div>
                {/* Tile 3 */}
                <div className="border border-[#003366] p-4 rounded-lg shadow hover:shadow-2xl transition">
                  <div className="text-3xl mb-2">📜</div>
                  <h5 className="text-xl font-bold text-[#D32F23] mb-1">
                    Literary Powerhouse
                  </h5>
                  <p className="text-lg text-[#003366]">
                    With 8 Jnanpith Award winners, Karnataka has enriched Indian literature
                    through timeless classics.
                  </p>
                </div>
                {/* Tile 4 */}
                <div className="border border-[#003366] p-4 rounded-lg shadow hover:shadow-2xl transition">
                  <div className="text-3xl mb-2">🎨</div>
                  <h5 className="text-xl font-bold text-[#D32F23] mb-1">
                    Art &amp; Handicrafts
                  </h5>
                  <p className="text-lg text-[#003366]">
                    Exquisite Mysore paintings, Kasuti embroidery, and Channapatna toys
                    showcase deep artistic roots.
                  </p>
                </div>
                {/* Tile 5 */}
                <div className="border border-[#003366] p-4 rounded-lg shadow hover:shadow-2xl transition">
                  <div className="text-3xl mb-2">🍛</div>
                  <h5 className="text-xl font-bold text-[#D32F23] mb-1">
                    Culinary Delight
                  </h5>
                  <p className="text-lg text-[#003366]">
                    From Bisi Bele Bath to Mysore Pak, the flavors of Karnataka are
                    as diverse as its culture.
                  </p>
                </div>
                {/* Tile 6 */}
                <div className="border border-[#003366] p-4 rounded-lg shadow hover:shadow-2xl transition">
                  <div className="text-3xl mb-2">🌍</div>
                  <h5 className="text-xl font-bold text-[#D32F23] mb-1">
                    Bengaluru – Tradition &amp; Future
                  </h5>
                  <p className="text-lg text-[#003366]">
                    Bengaluru exemplifies the blend of ancient traditions with modern
                    innovation and creativity.
                  </p>
                </div>
              </div>

              <h4 className="text-2xl font-bold text-[#D32F23] mb-4">
                Experience the Cultural Brilliance of Brand Karnataka at VTU Youth Fest 2025
              </h4>
              <p className="text-xl text-justify text-[#003366] mb-4">
                This grand cultural fest will bring together the best talents from across
                Karnataka to celebrate music, dance, theatre, and literature—all inspired
                by the essence of Namma Karnataka and Namma Bengaluru.
              </p>
              <p className="text-xl text-[#003366] mb-4">
                <strong>Date:</strong> 24th - 27th March 2025  • <strong>Venue:</strong> Global Academy
                of Technology, Bengaluru
              </p>
              <p className="text-xl text-justify text-[#003366]">
                Come, immerse yourself in the soul of Karnataka and the pulse of Bengaluru.
                Let’s showcase Karnataka not just as a state, but as a brand of tradition,
                culture, and creativity!
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
