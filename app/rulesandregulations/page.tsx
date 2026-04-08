"use client";


// ...other imports

// Your component code here...
import React from "react";
import Image from "next/image";
import dance from "@/public/images/Dance.jpeg";
import music from "@/public/images/MusicBanner.jpeg";
import literature from "@/public/images/LiteraryArts.jpeg";
import theatre from "@/public/images/Theatre.jpeg";
import arts from "@/public/images/FineArts.jpeg";

const eventData = [
  {
    id: 1,
    title: "Dance",
    headerImage: dance,
    details: [
      {
        title: "Folk/Tribal Dance",
        icon: "💃",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 team (upto 10 participants) per institute.",
          "2: 15 minutes (including set-up and clearance time).",
          "3: A maximum of 5 accompanists are allowed.",
          "4: The dance form can be either folk or tribal (Indian Style) but not a classical form.",
          "5: Three copies, containing a brief description of the performance is to be submitted in a typed format in English at the reporting time to the event incharge.",
          "6: Pre-recorded music in MP3 format is to be submitted in a pendrive at the reporting time to the event incharge.",
          "7: The participating team will be entirely responsible for removal of their sets, props, etc., immediately after the completion of their performance.",
        ],
      },
      {
        title: "Classical Dance Solo",
        icon: "💃",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 participant per institute.",
          "2: 12 minutes (including set-up and clearance time).",
          "3: A maximum of 3 accompanists are allowed.",
          "4: The classical dance can be from any of the approved schools of dance such as Kathak, Kathakali, Bharat Natyam, Sattriya, Manipuri, Kuchipudi, Mohiniattam, Odissi and Chhau.",
          "5: Three copies, containing a brief description of the performance is to be submitted in a typed format in English at the reporting time to the event incharge.",
          "6: Pre-recorded music in MP3 format is to be submitted in a pendrive at the reporting time to the event incharge.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Music",
    headerImage: music,
    details: [
      {
        title: "Classical Vocal Solo (Hindustani/Carnatic)",
        icon: "🎼",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 participant per institute.",
          "2: 15 minutes (including set-up and clearance time).",
          "3: Maximum of 2 accompaniments are allowed, excluding a Shruthi box.",
          "4: Karaoke is strictly not allowed.",
          "5: The item can be presented in either Hindustani or Carnatic style.",
          "6: Film songs are not allowed for this competition.",
          "7: Sufficient thought and care must be exercised in the choice of Raga and composition.",
        ],
      },
      {
        title: "Classical Instrumental Solo (Percussion Tala Vadya)",
        icon: "🎼",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 participant per institute.",
          "2: 15 minutes (including set-up and clearance time).",
          "3: Maximum of 2 accompaniments are allowed, excluding a Shruthi box.",
          "4: Participants shall bring their own instruments. Keyboards are not allowed.",
          "5: The item can be presented in either Hindustani or Carnatic style.",
        ],
      },
      {
        title: "Classical Instrumental Solo (Non-Percussion Swara Vadya)",
        icon: "🎼",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 participant per institute.",
          "2: 15 minutes (including set-up and clearance time).",
          "3: Maximum of 2 accompaniments are allowed, excluding a Shruthi box.",
          "4: Participants shall bring their own instruments. Keyboards are not allowed.",
          "5: The item can be presented in either Hindustani or Carnatic style.",
          "6: Instruments of western origin adopted to the Indian Raga system are allowed.",
        ],
      },
      {
        title: "Light Vocal Solo (Indian)",
        icon: "🎼",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 participant per institute.",
          "2: 7 minutes (including set-up and clearance time).",
          "3: Maximum of 2 accompaniments are allowed, excluding a Shruthi box.",
          "4: Only non-film songs can be presented. [Examples: Geet, Ghazal, Bhajan, Bhavageethe, Shabad and Abhangs].",
          "5: Karaoke is strictly not allowed.",
        ],
      },
      {
        title: "Western Vocal Solo",
        icon: "🎼",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 participant per institute.",
          "2: 7 minutes (including set-up and clearance time).",
          "3: Maximum of 2 accompaniments are allowed.",
          "4: The song(s) must only be in English.",
          "5: Karaoke or Programmed Music is strictly not allowed.",
        ],
      },
      {
        title: "Group Song (Indian)",
        icon: "🎼",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 team (upto 6 participants) per institute.",
          "2: 15 minutes (including set-up and clearance time).",
          "3: Maximum of 3 accompaniments are allowed.",
          "4: A team has to present two songs, one patriotic and one folk.",
          "5: Only Indian languages will be used for group songs. The lyrics of the songs transliterated in English must be submitted at the reporting time to the event incharge.",
          "6: Film songs are strictly not allowed.",
        ],
      },
      {
        title: "Group Song (Western)",
        icon: "🎼",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 team (upto 6 participants) per institute.",
          "2: 15 minutes (including set-up and clearance time).",
          "3: Maximum of 3 accompaniments are allowed.",
          "4: The song(s) must only be in English.",
          "5: Karaoke or Programmed Music is strictly not allowed.",
          "6: Drums will be provided by the host institute.",
        ],
      },
      {
        title: "Folk Orchestra",
        icon: "🎼",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 team (up to 12 participants) per institute.",
          "2: 15 minutes (including set-up and clearance time).",
          "3: Maximum of 3 accompaniments are allowed.They should be dressed differently from the participants for ease of identification.",
          "4: The accompanists shall sit or stand separately from the participants and shall not lead the team.",
          "5: The team should present only folk tunes, preferably the ones recognized as folk tunes of Karnataka.",
          "6: Vocal singing is not allowed, however teams may use vocal punctuations as a chorus.",
          "7: Use of musical instruments backed by electrical power, amplifiers, etc., are not allowed.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Literary",
    headerImage: literature,
    details: [
      {
        title: "Quiz",
        icon: "❓",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 Team (upto 3 participants) per institute.",
          "2: There will be a written preliminary round through which teams will be selected for the final round.",
          "3: Finals will be in standard quizzing format which will be explained by the quiz master.",
          "4: The specific rules regarding evaluation procedure, time to reply to a particular question and the type of round will be given before the start of the round.",
        ],
      },
      {
        title: "Debate",
        icon: "🗣️",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 Team of 2 participants per institute.",
          "2: 5 minutes per speaker (10 minutes per team).",
          "3: The competition will be held in two rounds, preliminary and finals.",
          "4: The final round will follow British Parliamentary debate format.",
          "5: The topics for both rounds will be given on spot with appropriate preparation time.",
          "6: Only English shall be the medium of presentation.",
          "7: Teams will alternate between speakers.",
          "8: Reading off a paper is not allowed.",
        ],
      },
      {
        title: "Elocution",
        icon: "🎤",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 participant per institute.",
          "2: The participant shall present either prose or poetry and not a song.",
          "3: Performance duration must not exceed 5 minutes.",
          "4: The sequence of speakers will be decided by a draw of lots.",
          "5: Medium of expression shall be English only.",
          "6: Subject/Topic of elocution will be announced a day in advance.",
          "7: Reading off a paper is allowed but not recommended, and will adversely affect points.",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Theatre",
    headerImage: theatre,
    details: [
      {
        title: "Skit",
        icon: "🎭",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 Team (upto 6 participants) per institute.",
          "2: 10 minutes (including set-up and clearance time).",
          "3: A maximum of 3 accompanists are allowed.",
          "4: Use of make-up, backdrops and background music is allowed.",
          "5: Each team should submit three copies of the synopsis of the skit in the language of presentation (English, Hindi or Kannada) at the reporting time to the event incharge.",
          "6: Defamation, derogation and belittlement will not be entertained.",
          "7: Profanity, suggestive speech, euphemisms and vulgarity in action or speech is strictly prohibited. Satire and humour that is devoid of the above is accepted.",
        ],
      },
      {
        title: "Mime",
        icon: "🎭",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 Team (upto 6 participants) from each institute.",
          "2: Maximum of 6 minutes.",
          "3: A maximum of 2 accompanists are allowed.",
          "4: Background music is to be pre-recorded and submitted in a pendrive in MP3 format at the reporting time to the event incharge.",
        ],
      },
      {
        title: "Mimicry",
        icon: "🎭",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 participant per institute.",
          "2: Maximum of 5 minutes.",
          "3: Participants may mimic voices and speech of well known personalities, as well as other common sounds.",
          "4: Profanity, suggestive speech, euphemisms and vulgarity in action or speech is strictly prohibited. Satire and humour that is devoid of the above is accepted.",
        ],
      },
      {
        title: "One-Act Play",
        icon: "🎭",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 Team (upto 9 participants) per institute.",
          "2: 30 minutes (performance time) + 10 minutes (set-up and clearance time).",
          "3: A maximum of 3 musical accompanists and 2 technical accompanists are allowed.",
          "4: Lighting, and basic furniture will be provided on prior request (subject to availability). All other props and paraphernalia such as costumes, make up, stage decorations, backdrops, etc., shall be the responsibility of the team.",
          "5: The preferred language for the act would be English, Hindi or Kannada. The synopsis of the play in English, Hindi or Kannada must be submitted at the reporting time to the event incharge.",
          "6: Accompanists shall either speak from the background or play upon musical instruments for background music. They shall be required to appear on the stage only during curtain call.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Fine-Arts",
    headerImage: arts,
    details: [
      {
        title: "Collage",
        icon: "🖼️",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 participant per institute.",
          "2: The duration is 2 hours and 30 minutes.",
          "3: The artwork shall be made on the spot on the given topic.",
          "4: Only one standard A2 size paper will be provided by the host institute.",
          "5: Collage has to be prepared from old magazines, newspapers, paints and markers only.",
          "6: Participants shall bring their own scissors, glue, magazines, newspapers and other materials required for the contest.",
        ],
      },
      {
        title: "Rangoli",
        icon: "🌸",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 participant per institute.",
          "2: The duration is 2 hours and 30 minutes.",
          "3: Participants shall bring their own material.",
          "4: The participants shall prepare a Rangoli within the space provided by the organizers, by free hand only.",
          "5: Only one of the following meduium shall be used - Poster Colours, Flower Petals, Sawdust, Pulses or Rice without pasting.",
        ],
      },
      {
        title: "Cartooning",
        icon: "✏️",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 participant per institute.",
          "2: The duration is 2 hours and 30 minutes.",
          "3: The artwork will be made on the spot on the given topic/idea.",
          "4: Only one standard A2 size paper will be provided by the host institute.",
          "5: All writing or drawing instruments have to be brought by the participant.",
        ],
      },
      {
        title: "Installation",
        icon: "🏗️",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 team (upto 4 participants) per institute.",
          "2: The duration is 2 hours and 30 minutes.",
          "3: The artwork shall be made on the spot on the given topic.",
          "4: Materials or products required for the competition shall be brought by the participant. They can also use material which they use in other art compositions like Cartooning, Painting, Rangoli, Poster Making, Collage and Clay Modeling.",
          "5: Participants can also use waste materials which are aviailable in the surroundings. However, they are not allowed to use any already composed images or forms available in the market. They should compose or create their own image with the raw material.",
          "6: The space for the installation shall be provided by the host institute.",
          "7: The participant shall create and install an atmosphere realted to the subject or title of the installation in the assigned area. The maximum size of the installation shall be 5'x 5'x 5'.",
        ],
      },
      {
        title: "Poster Making",
        icon: "📜",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 participant per institute.",
          "2: 2 hours 30 minutes.3. The artwork will be made on the spot on the given topic.",
          "3: Only one standard A2 size paper will be provided by the host institute.",
          "4: The participant shall bring their own scissors, glue and other materials required for the event.",
        ],
      },
      {
        title: "Clay-Modelling",
        icon: "🏺",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 participant per institute.",
          "2: The artwork will be made on the spot on the given topic.",
          "3: The duration is 2 hours and 30 minutes.",
          "4: The topics and other specific rules shall be announced on the spot.",
          "5: 2 kg of natural clay shall be provided by the host institute. No additional clay can be used.",
          "6: Die and moulds are strictly not allowed.",
        ],
      },
      {
        title: "On Spot Painting",
        icon: "🖌️",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 participant per institute.",
          "2: The duration is 2 hours and 30 minutes.",
          "3: The artwork shall be made on the spot on the given topic.",
          "4: Only one standard A2 size paper will be provided by the host institute.",
          "5: Types of paints allowed are watercolors, poster paints, oil paints and pastel colors.",
          "6: Candidates shall bring their own materials such as brushes, paints, palettes, etc.",
        ],
      },
      {
        title: "On Spot Photography",
        icon: "📷",
        date: "TBD",
        content: [
          "Rules",
          "1: Only 1 participant per institute.",
          "2: The duration is 4 hours.",
          "3: The participant shall get their own digital camera and memory card. The memory card shall be formatted by the judges before the commencement of the contest.",
          "4: Mobile phones, drones and other forms of image capturing technologies are not allowed.",
          "5: The participant has to capture 5 photographs on the theme announced on the spot by the judges.",
          "6: No mixing, matching or morphing of photographs will be permitted.",
          "7: Image manipulation software such as Photoshop, Gimp, etc. for enhancing images are not permitted.",
          "8: The subject of the photo should be within defined geographic limits.",
          "9: The organizers shall have the rights for the use of these pictures at their discretion.",
          "10: Any additional instructions will be announced on the spot.",
        ],
      },
    ],
  },
];

/////////////////////////////////////
// Back-To-Top Button Component
/////////////////////////////////////
const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      aria-label="Back to top"
    >
      ↑
    </button>
  ) : null;
};

/////////////////////////////////////
// Main Event Page Component
/////////////////////////////////////
const EventPage: React.FC = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Main Header */}
      <header className="relative pt-24 pb-12 md:pt-28 md:pb-16 text-center bg-gradient-to-b from-background to-secondary">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-primary font-bold text-4xl md:text-6xl xl:text-7xl mb-6">
            Events
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Welcome to the Events Page! Dive into the world of creativity, passion,
            and competition.
          </p>
        </div>
      </header>

      {/* Event Sections */}
      <div>
        {eventData.map((event) => (
          <section key={event.id} className="animate-fadeIn">
            {/* Image Section */}
            <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
              <Image
                src={event.headerImage}
                alt={`${event.title} Event`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
                sizes="100vw"
                quality={90}
              />
              {/* Gradient Overlay */}
              {/*<div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />*/}

              {/* Event Title */}
              <div className="absolute bottom-0 inset-x-0 p-6 md:p-10">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold text-foreground drop-shadow-lg">
                    {event.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto p-4 mb-12">
              {/* Info Cards */}
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {event.details.map((detail, index) => (
                  <div
                    key={index}
                    className="relative bg-card p-6 md:p-8 rounded-xl shadow-lg border border-border group min-h-[600px] transform transition duration-500 hover:scale-105 hover:shadow-[0_4px_15px_0_rgba(0,112,243,0.75)]"
                  >
                    {/* Default View */}
                    <div className="flex flex-col items-center justify-center h-full group-hover:opacity-0 transition-opacity duration-300">
                      <div className="text-3xl mb-4">{detail.icon}</div>
                      <h3 className="text-foreground font-semibold text-2xl">
                        {detail.title}
                      </h3>
                      <p className="text-muted-foreground text-base md:text-lg">
                        {detail.date}
                      </p>
                    </div>
                    {/* Hover View */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-600">
                      <div className="text-white p-4 overflow-y-auto max-h-full">
                        <ul className="space-y-1 text-xs md:text-base">
                          {detail.content.map((rule, idx) => (
                            <li key={idx}>{rule}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Back-To-Top Button */}
      <BackToTopButton />

      {/* Fade-In Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EventPage;
