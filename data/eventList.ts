import eventImage from "@/public/images/pexels-jidev-mohan-356965646-14469571.jpg";
import { StaticImageData } from "next/image";

export interface EventList {
    /** Maps to eventNo in eventCategories.ts */
    eventNo?: number;
    category: string;
    image: StaticImageData;
    name: string;
    rules: string[];
    coordinator?: {
        name: string;
        mobile: string;
    };
    coordinators?: {
        name: string;
        mobile: string;
    }[]
}

export const eventsList:EventList[]= [
    {
        eventNo: 15,
        category: "Music",
        image: eventImage,
        name: "Classical Vocal Solo (Hindustani/Carnatic)",
        rules: [
            "Only 1 participant per institute.",
            "Duration: 15 minutes (including set-up and clearance time).",
            "Maximum of 2 accompanists are allowed, excluding a Shruthi box.",
            "Karaoke is strictly not allowed.",
            "The item can be presented in either Hindustani or Carnatic style.",
            "Film songs are not allowed for this competition.",
            "Sufficient thought and care must be exercised in the choice of Raga and composition.",
        ],
        coordinator: {
            name: "Ms. Chandana K R",
            mobile: "97381 18585",
        },
    },
    {
        eventNo: 12,
        category: "Music",
        image: eventImage,
        name: "Classical Instrumental Solo (Percussion Tala Vadya)",
        rules: [
            "Only 1 participant per institute.",
            "Duration: 15 minutes (including set-up and clearance time).",
            "A maximum of 2 accompanists are allowed, excluding a Shruthi Box.",
            "Participants shall bring their own instruments. Keyboards are not allowed.",
            "The item can be presented in either Hindustani or Carnatic style.",
        ],
        coordinator: {
            name: "Dr. Shwetha V",
            mobile: "96207 07800",
        },
    },
    {
        eventNo: 12,
        category: "Music",
        image: eventImage,
        name: "Classical Instrumental Solo (Non-Percussion Swara Vadya)",
        rules: [
            "Only 1 participant per institute.",
            "Duration: 15 minutes (including set-up and clearance time).",
            "A maximum of 2 accompanists are allowed, excluding a Shruthi Box.",
            "Participants shall bring their own instruments. Keyboards are not allowed.",
            "The item can be presented in either Hindustani or Carnatic style.",
            "Instruments of western origin adopted to the Indian Raga system are allowed.",
        ],
        coordinator: {
            name: "Mr. Naresh D C",
            mobile: "99024 02409",
        },
    },
    {
        eventNo: 14,
        category: "Music",
        image: eventImage,
        name: "Light Vocal Solo (Indian)",
        rules: [
            "Only 1 participant per institute.",
            "Duration: 7 minutes (including set-up and clearance time).",
            "A maximum of 2 accompanists are allowed, excluding a Shruthi box.",
            "Only non-film songs can be presented. [Examples: Geet, Ghazal, Bhajan, Bhavageethe, Shabad and Abhangs].",
            "Karaoke is strictly not allowed.",
        ],
        coordinator: {
            name: "Mr. Prasanna Kumar D C",
            mobile: "96113 66404",
        },
    },
    {
        eventNo: 16,
        category: "Music",
        image: eventImage,
        name: "Western Vocal Solo",
        rules: [
            "Only 1 participant per institute.",
            "Duration: 7 minutes (including set-up and clearance time).",
            "A maximum of 2 accompanists are allowed.",
            "The song(s) must only be in English.",
            "Karaoke or Programmed Music is strictly not allowed.",
        ],
        coordinator: {
            name: "Ms. Leelavathi B",
            mobile: "99026 53555",
        },
    },
    {
        eventNo: 18,
        category: "Music",
        image: eventImage,
        name: "Group Song (Indian)",
        rules: [
            "Only 1 team (up to 6 participants) per institute.",
            "Duration: 15 minutes (including set-up and clearance time).",
            "A maximum of 3 accompanists are allowed.",
            "A team has to present two songs, one patriotic and one folk.",
            "Only Indian languages will be used for group songs.",
            "The lyrics of the songs transliterated in English must be submitted at the reporting time to the event incharge.",
            "Film songs are strictly not allowed.",
        ],
        coordinator: {
            name: "Ms. Chandini A G",
            mobile: "91135 18084",
        },
    },
    {
        eventNo: 17,
        category: "Music",
        image: eventImage,
        name: "Group Song (Western)",
        rules: [
            "Only 1 team (up to 6 participants) per institute.",
            "Duration: 15 minutes (including set-up and clearance time).",
            "A maximum of 3 accompanists are allowed.",
            "The song(s) must only be in English.",
            "Karaoke or Programmed Music is strictly not allowed.",
            "Drums will be provided by the host institute.",
        ],
        coordinator: {
            name: "Ms. Chandini A G",
            mobile: "91135 18084",
        },
    },
    {
        eventNo: 13,
        category: "Music",
        image: eventImage,
        name: "Folk Orchestra",
        rules: [
            "Only 1 team (up to 12 participants) per institute.",
            "Duration: 15 minutes (including set-up and clearance time).",
            "A maximum of 3 accompanists are allowed. They should be dressed differently from the participants for ease of identification.",
            "The accompanists shall sit or stand separately from the participants and shall not lead the team.",
            "The team should present only folk tunes, preferably the ones recognized as folk tunes of Karnataka.",
            "Vocal singing is not allowed; however, teams may use vocal punctuations as a chorus.",
            "Use of musical instruments backed by electrical power, amplifiers, etc., are not allowed.",
        ],
        coordinators: [
            { name: "Ms. Chandrakala", mobile: "97402 38315" },
            { name: "Ms. Gayathri V", mobile: "99022 55277" },
        ],
    },
    {
        eventNo: 10,
        category: "Dance",
        image: eventImage,
        name: "Folk / Tribal Dance",
        rules: [
            "Only 1 team (up to 10 participants) per institute.",
            "Duration: 15 minutes (including set-up and clearance time).",
            "A maximum of 5 accompanists are allowed.",
            "The dance form can be either folk or tribal (Indian Style) but not a classical form.",
            "Three copies containing a brief description of the performance are to be submitted in a typed format in English at the reporting time to the event incharge.",
            "Pre-recorded music in MP3 format is to be submitted in a pendrive at the reporting time to the event incharge.",
            "The participating team will be entirely responsible for the removal of their sets, props, etc., immediately after the completion of their performance.",
        ],
        coordinator: {
            name: "Dr. Veena",
            mobile: "96118 77682",
        },
    },
    {
        eventNo: 7,
        category: "Dance",
        image: eventImage,
        name: "Classical Dance Solo",
        rules: [
            "Only 1 participant per institute.",
            "Duration: Maximum 12 minutes (including set-up and clearance time).",
            "A maximum of 3 accompanists are allowed.",
            "The classical dance can be from any of the approved schools of dance such as Kathak, Kathakali, Bharat Natyam, Sattriya, Manipuri, Kuchipudi, Mohiniattam, Odissi, and Chhau.",
            "Three copies containing a brief explanation of the theme are to be submitted in a typed format in English at the reporting time to the event incharge.",
            "Pre-recorded music in MP3 format is to be submitted in a pendrive at the reporting time to the event incharge.",
        ],
        coordinators: [
            { name: "Ms. Anitha", mobile: "91644 26160" },
            { name: "Ms. Likitha", mobile: "95388 50226" },
        ],
    },
    {
        eventNo: 4,
        category: "Theatre",
        image: eventImage,
        name: "Skit",
        rules: [
            "Only 1 team (up to 6 participants) per institute.",
            "Duration: 10 minutes (including set-up and clearance time).",
            "A maximum of 3 accompanists are allowed.",
            "Use of make-up, backdrops, and background music is allowed.",
            "Each team should submit three copies of the synopsis of the skit in the language of presentation (English, Hindi, or Kannada) at the reporting time to the event incharge.",
            "Defamation, derogation, and belittlement will not be entertained.",
            "Profanity, suggestive speech, euphemisms, and vulgarity in action or speech are strictly prohibited. Satire and humour devoid of the above are accepted.",
        ],
        coordinators: [{ name: "Dr. Mamatha K S", mobile: "81230 30614" }],
    },
    {
        eventNo: 3,
        category: "Theatre",
        image: eventImage,
        name: "Mime",
        rules: [
            "Only 1 team (up to 6 participants) from each institute.",
            "Duration: 6 minutes.",
            "A maximum of 2 accompanists are allowed.",
            "Background music is to be pre-recorded and submitted in a pendrive in MP3 format at the reporting time to the event incharge.",
        ],
        coordinators: [
            { name: "Dr. Ravikumar T R", mobile: "97383 50479" },
            { name: "Dr. Nandini L", mobile: "99459 30899" },
        ],
    },
    {
        eventNo: 1,
        category: "Theatre",
        image: eventImage,
        name: "Mimicry",
        rules: [
            "Only 1 participant per institute.",
            "Duration: 5 minutes.",
            "Participants may mimic voices and speech of well-known personalities, as well as other common sounds.",
            "Profanity, suggestive speech, euphemisms, and vulgarity in action or speech are strictly prohibited. Satire and humour devoid of the above are accepted.",
        ],
        coordinators: [
            { name: "Ms. Shruthi G", mobile: "98454 54645" },
            { name: "Dr. Srinivasa G", mobile: "99869 71640" },
        ],
    },
    {
        eventNo: 2,
        category: "Theatre",
        image: eventImage,
        name: "One Act Play",
        rules: [
            "Only 1 team (up to 9 participants) per institute.",
            "Duration: 30 minutes (performance time) + 10 minutes (set-up and clearance time).",
            "A maximum of 3 musical accompanists and 2 technical accompanists are allowed.",
            "Lighting and basic furniture will be provided on prior request (subject to availability).",
            "All other props and paraphernalia such as costumes, make-up, stage decorations, backdrops, etc., shall be the responsibility of the team.",
            "The preferred language for the act would be English, Hindi, or Kannada. The synopsis of the play in English, Hindi, or Kannada must be submitted at the reporting time to the event incharge.",
            "Accompanists shall either speak from the background or play upon musical instruments for background music. They shall be required to appear on the stage only during curtain call.",
        ],
        coordinators: [
            { name: "Ms. Padmavathi S", mobile: "99452 34351" },
            { name: "Dr. Bhanumathi S", mobile: "97409 91643" },
            { name: "Dr. Nandini S", mobile: "81237 49017" },
        ],
    },
    {
        eventNo: 38,
        category: "Literary",
        image: eventImage,
        name: "Quiz",
        rules: [
            "Only 1 team (up to 3 participants) per institute.",
            "There will be a written preliminary round through which teams will be selected for the final round.",
            "Finals will be in standard quizzing format, which will be explained by the quiz master.",
            "The specific rules regarding evaluation procedure, time to reply to a particular question, and the type of round will be given before the start of the round.",
        ],
        coordinators: [{ name: "Mr. Adarsha M R", mobile: "90199 53604" }],
    },
    {
        eventNo: 23,
        category: "Literary",
        image: eventImage,
        name: "Debate",
        rules: [
            "Only 1 team of 2 participants per institute.",
            "Duration: 5 minutes per speaker (10 minutes per team).",
            "The competition will be held in two rounds: preliminary and finals.",
            "The final round will follow the British Parliamentary debate format.",
            "The topics for both rounds will be given on the spot with appropriate preparation time.",
            "Only English shall be the medium of presentation.",
            "Teams will alternate between speakers.",
            "Reading off a paper is not allowed.",
        ],
        coordinators: [
            { name: "Mr. Manjunatha P V", mobile: "82777 81210" },
            { name: "Dr. Manjunath K N", mobile: "96323 33100" },
        ],
    },
    {
        eventNo: 24,
        category: "Literary",
        image: eventImage,
        name: "Elocution",
        rules: [
            "Only 1 participant per institute.",
            "Duration: 5 minutes.",
            "The participant shall present either prose or poetry and not a song.",
            "The sequence of speakers will be decided by a draw of lots.",
            "Medium of expression shall be English only.",
            "Subject/Topic of elocution will be announced a day in advance.",
            "Reading off a paper is allowed but not recommended, and will adversely affect points.",
        ],
        coordinators: [
            { name: "Dr. Manjunath B C", mobile: "96863 54149" },
            { name: "Mr. Girish B G", mobile: "96203 07516" },
            { name: "Ms. Rashmi K A", mobile: "85534 19599" },
        ],
    },
    {
        eventNo: 33,
        category: "Fine Arts",
        image: eventImage,
        name: "Collage",
        rules: [
            "Only 1 participant per institute.",
            "Duration: 2 hours 30 minutes.",
            "The artwork shall be made on the spot on the given topic.",
            "Only one standard A2 size paper will be provided by the host institute.",
            "Collage has to be prepared from old magazines, newspapers, paints, and markers only.",
            "Participants shall bring their own scissors, glue, magazines, newspapers, and other materials required for the contest.",
        ],
        coordinators: [
            { name: "Ms. Pavithra A V", mobile: "78928 44558" },
            { name: "Ms. Bhavya S", mobile: "98446 63709" },
        ],
    },
    {
        eventNo: 32,
        category: "Fine Arts",
        image: eventImage,
        name: "Rangoli",
        rules: [
            "Only 1 participant per institute.",
            "Duration: 2 hours 30 minutes.",
            "Participants shall bring their own material.",
            "The participants shall prepare a Rangoli within the space provided by the organizers, by free hand only.",
            "Only one of the following mediums shall be used: Poster Colours, Flower Petals, Sawdust, Pulses, or Rice without pasting.",
        ],
        coordinators: [{ name: "Ms. Mamatha G", mobile: "78921 14038" }],
    },
    {
        eventNo: 28,
        category: "Fine Arts",
        image: eventImage,
        name: "Cartooning",
        rules: [
            "Only 1 participant per institute.",
            "Duration: 2 hours 30 minutes.",
            "The artwork will be made on the spot on the given topic/idea.",
            "Only one standard A2 size paper will be provided by the host institute.",
            "All writing or drawing instruments have to be brought by the participant.",
        ],
        coordinators: [
            { name: "Ms. Swetha T", mobile: "94495 29580" },
            { name: "Ms. Bhavya R A", mobile: "88847 50158" },
        ],
    },
    {
        eventNo: 27,
        category: "Fine Arts",
        image: eventImage,
        name: "Installation",
        rules: [
            "Only 1 team (up to 4 participants) per institute.",
            "Duration: 2 hours 30 minutes.",
            "The artwork shall be made on the spot on the given topic.",
            "Materials or products required for the competition shall be brought by the participants. They can also use materials used in other art compositions like Cartooning, Painting, Rangoli, Poster Making, Collage, and Clay Modeling.",
            "Participants can also use waste materials available in the surroundings. However, they are not allowed to use any already composed images or forms available in the market. They should compose or create their own image with the raw material.",
            "The space for the installation shall be provided by the host institute.",
            "The participant shall create and install an atmosphere related to the subject or title of the installation in the assigned area. The maximum size of the installation shall be 5' x 5' x 5'.",
        ],
        coordinators: [
            { name: "Ms. Dhanushree", mobile: "74066 88161" },
            { name: "Dr. Ravi Kumar M", mobile: "97380 75498" },
            { name: "Mr. Sridhar J", mobile: "97385 51313" },
        ],
    },
    {
        eventNo: 26,
        category: "Fine Arts",
        image: eventImage,
        name: "Poster Making",
        rules: [
            "Only 1 participant per institute.",
            "Duration: 2 hours 30 minutes.",
            "The artwork will be made on the spot on the given topic.",
            "Only one standard A2 size paper will be provided by the host institute.",
            "The participant shall bring their own scissors, glue, and other materials required for the event.",
        ],
        coordinators: [{ name: "Mr. Darshan A", mobile: "79752 13438" }],
    },
    {
        eventNo: 29,
        category: "Fine Arts",
        image: eventImage,
        name: "Clay Modelling",
        rules: [
            "Only 1 participant per institute.",
            "Duration: 2 hours 30 minutes.",
            "The artwork will be made on the spot on the given topic.",
            "The topics and other specific rules shall be announced on the spot.",
            "2 kg of natural clay shall be provided by the host institute. No additional clay can be used.",
            "Die and moulds are strictly not allowed.",
        ],
        coordinators: [
            { name: "Mr. Santhosh Kumar M", mobile: "95910 72027" },
            { name: "Ms. Veena N", mobile: "90358 63789" },
        ],
    },
    {
        eventNo: 30,
        category: "Fine Arts",
        image: eventImage,
        name: "On Spot Painting",
        rules: [
            "Only 1 participant per institute.",
            "Duration: 2 hours 30 minutes.",
            "The artwork shall be made on the spot on the given topic.",
            "Only one standard A2 size paper will be provided by the host institute.",
            "Types of paints allowed are watercolors, poster paints, oil paints, and pastel colors.",
            "Candidates shall bring their own materials such as brushes, paints, palettes, etc.",
        ],
        coordinators: [
            { name: "Dr. Mallaradya H M", mobile: "97427 27670" },
            { name: "Ms. Nirupama N Swamy", mobile: "78995 75961" },
        ],
    },
    {
        eventNo: 34,
        category: "Fine Arts",
        image: eventImage,
        name: "Spot Photography",
        rules: [
            "Only 1 participant per institute.",
            "Duration: 4 hours.",
            "The participant shall get their own digital camera and memory card. The memory card shall be formatted by the judges before the commencement of the contest.",
            "Mobile phones, drones, and other forms of image capturing technologies are not allowed.",
            "The participant has to capture 5 photographs on the theme announced on the spot by the judges.",
            "No mixing, matching, or morphing of photographs will be permitted.",
            "Image manipulation software such as Photoshop, Gimp, etc., for enhancing images are not permitted.",
            "The subject of the photo should be within defined geographic limits.",
            "The organizers shall have the rights for the use of these pictures at their discretion.",
            "Any additional instructions will be announced on the spot.",
        ],
        coordinators: [
            { name: "Ms. Ambika S R", mobile: "86180 07859" },
            { name: "Ms. Nirmaladevi A C", mobile: "94496 95592" },
            { name: "Ms. Sri Vani E N", mobile: "91641 54766" },
        ],
    },
];
