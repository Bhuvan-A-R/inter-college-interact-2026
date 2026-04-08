import Image from "next/image";
import brandKarnatakaImg from "@/components/images/brand-karnataka.jpg";

const ThemeSection = () => {
  return (
    <div className="max-w-5xl mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-lg mb-8">
      <section className="bg-background py-16 px-4 md:px-8">
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
            Karnataka is not just a state; it is an identity, a legacy, a
            cultural powerhouse. It is home to some of India's greatest artists,
            musicians, dancers, playwrights, and thinkers. The world knows
            Karnataka for its heritage, literature, folk traditions, and
            classical arts, and at the same time, it recognizes Bengaluru as a
            global hub of innovation and talent.
          </p>

          <h4 className="text-2xl font-bold text-[#D32F23] mb-4">
            What Makes Karnataka a Cultural Brand?
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div className="border border-[#003366] p-4 rounded-lg shadow hover:shadow-2xl transition">
              <div className="text-3xl mb-2">🎶</div>
              <h5 className="text-xl font-bold text-[#D32F23] mb-1">
                Music &amp; Dance
              </h5>
              <p className="text-lg text-[#003366]">
                From mesmerizing Carnatic music to Dollu Kunitha’s powerful
                beats, Karnataka has given the world some of its finest artists.
              </p>
            </div>
            <div className="border border-[#003366] p-4 rounded-lg shadow hover:shadow-2xl transition">
              <div className="text-3xl mb-2">🎭</div>
              <h5 className="text-xl font-bold text-[#D32F23] mb-1">
                Theater &amp; Storytelling
              </h5>
              <p className="text-lg text-[#003366]">
                Birthplace of Yakshagana, puppet theatre, and modern Kannada
                theatre, bringing captivating stories to life.
              </p>
            </div>
            <div className="border border-[#003366] p-4 rounded-lg shadow hover:shadow-2xl transition">
              <div className="text-3xl mb-2">📜</div>
              <h5 className="text-xl font-bold text-[#D32F23] mb-1">
                Literary Powerhouse
              </h5>
              <p className="text-lg text-[#003366]">
                With 8 Jnanpith Award winners, Karnataka has enriched Indian
                literature through timeless classics.
              </p>
            </div>
            <div className="border border-[#003366] p-4 rounded-lg shadow hover:shadow-2xl transition">
              <div className="text-3xl mb-2">🎨</div>
              <h5 className="text-xl font-bold text-[#D32F23] mb-1">
                Art &amp; Handicrafts
              </h5>
              <p className="text-lg text-[#003366]">
                Exquisite Mysore paintings, Kasuti embroidery, and Channapatna
                toys showcase deep artistic roots.
              </p>
            </div>
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
            <div className="border border-[#003366] p-4 rounded-lg shadow hover:shadow-2xl transition">
              <div className="text-3xl mb-2">🌍</div>
              <h5 className="text-xl font-bold text-[#D32F23] mb-1">
                Bengaluru – Tradition &amp; Future
              </h5>
              <p className="text-lg text-[#003366]">
                Bengaluru exemplifies the blend of ancient traditions with
                modern innovation and creativity.
              </p>
            </div>
          </div>

          <h4 className="text-2xl font-bold text-[#D32F23] mb-4">
            Experience the Cultural Brilliance of Brand Karnataka at VTU Youth
            Fest 2025
          </h4>
          <p className="text-xl text-justify text-[#003366] mb-4">
            This grand cultural fest will bring together the best talents from
            across Karnataka to celebrate music, dance, theatre, and
            literature—all inspired by the essence of Namma Karnataka and Namma
            Bengaluru.
          </p>
          <p className="text-xl text-[#003366] mb-4">
            <strong>Date:</strong> 24th - 27th March 2025 •{" "}
            <strong>Venue:</strong> Global Academy of Technology, Bengaluru
          </p>
          <p className="text-xl text-justify text-[#003366]">
            Come, immerse yourself in the soul of Karnataka and the pulse of
            Bengaluru. Let’s showcase Karnataka not just as a state, but as a
            brand of tradition, culture, and creativity!
          </p>
        </div>
      </section>
    </div>
  );
};

export default ThemeSection;
