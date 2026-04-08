import { PrismaClient, Prisma } from '@prisma/client' // <-- Add Prisma here

const prisma = new PrismaClient()

// Add the type definition to the array here:
const eventsData: Prisma.EventCreateManyInput[] = [
    // THEATRE
    {
        name: "Mime",
        category: "THEATRE",
        type: "TEAM",
        price: 600,
        maxTeamSize: 6,
        isActive: true,
        rules: "Participation: Only up to 6 participants.\nDuration: 6 minutes.\nBackground music is to be submitted at the reporting time to the event in-charge."
    },
    {
        name: "Skit",
        category: "THEATRE",
        type: "TEAM",
        price: 600,
        maxTeamSize: 6,
        isActive: true,
        rules: "Participation: Only up to 6 participants per team.\nDuration: 10 minutes (including set-up and clearance time).\nA Maximum of 3 accompanists are allowed.\nUse of make-up, backdrops and background music is allowed.\nEach team should submit three copies of the synopsis of the skit in the language of presentation (English, Kannada) at the reporting time to the event co-ordinator.\nDefamation, derogation and belittlement will not be entertained.\nProfanity, suggestive speech, euphemisms and vulgarity in action or speech is strictly prohibited. Satire and humor that is devoid of the above is accepted.\nBackground music is to be submitted at the reporting time to the event in-charge."
    },
    {
        name: "Mono Acting",
        category: "THEATRE",
        type: "SOLO",
        price: 200,
        maxTeamSize: 1,
        isActive: true,
        rules: "Participation: Only 1 participant.\nDuration: Up to 5 minutes.\nThe participant can play numerous roles in the same scene.\nProfanity, suggestive speech, euphemisms and vulgarity in action or speech is strictly prohibited. Satire and humour that is devoid of the above is accepted."
    },
    {
        name: "Mimicry",
        category: "THEATRE",
        type: "SOLO",
        price: 200,
        maxTeamSize: 1,
        isActive: true,
        rules: "Participation: Only 1 participant.\nDuration: Up to 5 minutes.\nParticipants may mimic voices and speech of well-known personalities, as well as other common sounds.\nProfanity, suggestive speech, euphemisms and vulgarity in action or speech is strictly prohibited. Satire and humor that is devoid of the above is accepted."
    },

    // DANCE
    {
        name: "Western Solo Dance",
        category: "DANCE",
        type: "SOLO",
        price: 200,
        maxTeamSize: 1,
        isActive: true,
        rules: "Participation: Only 1 participant.\nThe performance duration must be between 2 to 4 minutes.\nParticipants may perform in any Western dance style (Hip-hop, Contemporary, Jazz, etc.).\nPre-recorded music must be submitted to the co-ordinators in MP3 format prior to the event.\nParticipants must ensure that their track is properly edited and cued; no extra time will be given for technical delays.\nUse of props is allowed, but participants must bring their own and set them up within the allotted time.\nThe performance must be appropriate and free from vulgar or offensive content.\nExceeding the time limit will result in negative marking or disqualification.\nAny form of dangerous stunts or unsafe acts is strictly prohibited."
    },
    {
        name: "Classical Solo Dance",
        category: "DANCE",
        type: "SOLO",
        price: 200,
        maxTeamSize: 1,
        isActive: true,
        rules: "Participation: Only 1 participant.\nThe performance duration must be between 3 to 5 minutes.\nThe performance must strictly adhere to recognized Indian classical dance forms.\nParticipants are expected to maintain authenticity in movements, expressions, and costume.\nPre-recorded music must be submitted to the co-ordinators prior to the event.\nParticipants must ensure that their audio track is properly edited and ready for playback.\nUse of appropriate costumes and makeup is encouraged to enhance the performance.\nProps, if used, must be minimal and managed within the allotted time.\nAny form of fusion or deviation from classical standards may lead to deduction of marks.\nExceeding the time limit will result in negative marking or disqualification."
    },
    {
        name: "Dance Battle",
        category: "DANCE",
        type: "SOLO",
        price: 200,
        maxTeamSize: 1,
        isActive: true,
        rules: "Participation: Only 1 Participant.\nThe competition will be conducted in elimination rounds.\nEach participant will get 1–2 minutes per round to perform.\nMusic will be provided by the organizers; participants must be ready to perform on random tracks.\nThe style is open (freestyle), allowing participants to showcase versatility and adaptability.\nParticipants must be prepared to perform instantly without prior rehearsal on the given track.\nBattle format (one-on-one or group rounds) will be decided by the organizers/judges on the spot.\nUse of props is not allowed during the battle.\nAny form of inappropriate behavior, physical contact, or disrespect towards opponents will lead to immediate disqualification.\nParticipants must be present throughout the rounds; absence when called will lead to elimination."
    },
    {
        name: "Western Group Dance",
        category: "DANCE",
        type: "TEAM",
        price: 600,
        maxTeamSize: 14,
        isActive: true,
        rules: "Participation: Groups of 6 to 14 members.\nTime: Must be between 5 to 10 minutes.\nTeams may perform any Western dance styles.\nPre-recorded music must be submitted to the Co-Ordinator prior to the event.\nTeams must ensure their track is properly edited and finalized; no additional time will be provided for corrections.\nUse of props is permitted, but all props must be arranged and cleared within the allotted time.\nCostumes should be appropriate, coordinated, and relevant to the performance theme.\nAny form of vulgarity or offensive content in music, costume, or performance will lead to disqualification.\nExceeding the time limit will result in penalties or disqualification.\nDangerous stunts or lifts that may risk participant safety are strictly prohibited."
    },
    {
        name: "Semi Classical Group",
        category: "DANCE",
        type: "TEAM",
        price: 600,
        maxTeamSize: 14,
        isActive: true,
        rules: "Participation: Groups of 6 to 14 members.\nTime: Must be between 5 to 10 minutes.\nThe performance must be semi-classical in nature, where classical elements are clearly evident.\nFusion is allowed, but the base should reflect Indian classical dance forms.\nPre-recorded music must be submitted to the Co-Ordinator prior to the event.\nTeams must ensure their track is properly edited and finalized; no additional time will be provided for corrections.\nUse of props is permitted, but all props must be arranged and cleared within the allotted time.\nCostumes should be appropriate, coordinated, and relevant to the performance theme.\nAny performance lacking clear classical elements may result in deduction of marks.\nExceeding the time limit will result in penalties or disqualification.\nDangerous stunts or lifts that may risk participant safety are strictly prohibited."
    },

    // MUSIC
    {
        name: "Instrumental Solo",
        category: "MUSIC",
        type: "SOLO",
        price: 200,
        maxTeamSize: 1,
        isActive: true,
        rules: "Duration: 7 minutes (including set-up and clearance time).\nParticipants must bring their own instruments and necessary cables/processors. A standard drum kit or keyboard may be provided based on venue availability.\nKaraoke/Backing tracks are allowed only for rhythm/percussion accompaniment and must not contain the lead melody. Must be submitted prior to the performance.\nAny genre (Classical, Jazz, Pop, Rock, etc.) is permitted.\nPerformance will be judged on technique, tonal quality, and improvisation."
    },
    {
        name: "Voice of Interact",
        category: "MUSIC",
        type: "SOLO",
        price: 200,
        maxTeamSize: 1,
        isActive: true,
        rules: "Duration: 8 minutes (including set-up and clearance time).\nNo language bar; however, lyrics must be appropriate and free from offensive content.\nThis category focuses on audience engagement and stage presence alongside vocal prowess.\nKaraoke is allowed (no lead vocals) or a maximum of one acoustic instrument for accompaniment.\nKaraoke tracks must be submitted to the organizers at least 15 minutes prior to the event."
    },
    {
        name: "Classical Vocal Solo",
        category: "MUSIC",
        type: "SOLO",
        price: 200,
        maxTeamSize: 1,
        isActive: true,
        rules: "Duration: 15 minutes (including set-up and clearance time).\nThe performance must strictly adhere to either Hindustani or Carnatic classical traditions.\nElectronic Tanpura/Sruti box is allowed. Maximum of two live accompanists (Tabla/Mridangam/Harmonium/Violin) are permitted.\nKaraoke and film-based 'semi-classical' songs are strictly prohibited.\nThe choice of Raga, Thala, and the complexity of the Bandish/Kriti will be key factors in evaluation."
    },
    {
        name: "Western Singing Solo",
        category: "MUSIC",
        type: "SOLO",
        price: 200,
        maxTeamSize: 1,
        isActive: true,
        rules: "Duration: 7 minutes (including set-up and clearance time).\nSongs must be performed in English only.\nKaraoke is allowed, provided it contains no lead or prominent backing vocals. Tracks must be provided in MP3 format and submitted prior to the performance.\nParticipants may self-accompany on a guitar or keyboard if they prefer an acoustic set.\nExplicit lyrics or themes are strictly prohibited and will lead to immediate disqualification."
    },
    {
        name: "Battle of Bands",
        category: "MUSIC",
        type: "TEAM",
        price: 200,
        maxTeamSize: 8,
        isActive: true,
        rules: "Participation: A minimum of 3 and a maximum of 8 members per team.\nDuration: 20 minutes (including 'Plug-and-Play' set-up and clearance).\nThe organizers will provide a basic 'Backline' (Drum kit, Bass amp, Guitar amps). Bands must bring their own guitars, processors, and drumsticks.\nPre-recorded sequences or programmed tracks are strictly not allowed. Every sound must be produced live.\nHigh-decibel levels are expected, but any activity that endangers the stage equipment or audience is prohibited."
    },
    {
        name: "Beatboxing",
        category: "MUSIC",
        type: "SOLO",
        price: 200,
        maxTeamSize: 1,
        isActive: true,
        rules: "Participation: Solo performance.\nDuration: 20 minutes (including 'Plug-and-Play' set-up and clearance).\nThe organizers will provide a basic 'Backline' (Drum kit, Bass amp, Guitar amps).\nPre-recorded sequences or programmed tracks are strictly not allowed. Every sound must be produced live.\nHigh-decibel levels are expected, but any activity that endangers the stage equipment or audience is prohibited."
    },

    // FASHION
    {
        name: "Group Ramp Walk",
        category: "FASHION",
        type: "TEAM",
        price: 200,
        maxTeamSize: 12,
        isActive: true,
        rules: "Team size: Minimum of 8 and maximum of 12 members.\nTime limit: 9+1 minutes. Exceeding the time limit will lead to negative marking.\nWalking on barefoot is not allowed.\nNo gender restrictions on team constitution.\nAny form of obscenity or vulgarity leads to direct disqualification.\nParticipants are to mandatorily bring their songs and submit it to the coordinators prior to the performance.\nUse of cigarettes, alcohol and any unfair means as property is strongly prohibited.\nTeams will be judged on costumes, theme, walking stance and attitude.\nThe group should decide their own theme and perform accordingly."
    }
];

async function main() {
  console.log(`Start seeding ...`)
  
  const result = await prisma.event.createMany({
    data: eventsData,
    skipDuplicates: true,
  })
  
  console.log(`Successfully seeded ${result.count} events!`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })