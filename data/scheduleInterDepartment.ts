export interface Event {
    eventId: number;
    domain: string;
    eventName: string;
    venue: string;
    date: string;
    timings: string;
}

export const events: Event[] = [
    { eventId: 1, domain: "THEATRE", eventName: "Mimicry", venue: "Main Building 416", date: "25th April", timings: "8:30 to 10:30am" },
    { eventId: 2, domain: "THEATRE", eventName: "Mono Acting", venue: "Main Building 317", date: "25th April", timings: "8:30 to 10:30am" },
    { eventId: 3, domain: "THEATRE", eventName: "Mime", venue: "Auditorium", date: "9th May", timings: "8:30 to 10:30am" },
    { eventId: 4, domain: "THEATRE", eventName: "Skit", venue: "Auditorium", date: "25th April", timings: "2pm to 4pm" },
    { eventId: 5, domain: "DANCE", eventName: "Western Solo Dance", venue: "AIB 403", date: "9th May", timings: "8:30 to 10:30am" },
    { eventId: 6, domain: "DANCE", eventName: "Solo Dance (Faculty)", venue: "Auditorium", date: "25th April", timings: "11am to 1pm" },
    { eventId: 7, domain: "DANCE", eventName: "Classical Solo Dance", venue: "AIB 101", date: "9th May", timings: "8:30 to 10:30am" },
    { eventId: 8, domain: "DANCE", eventName: "Dance Battle", venue: "Silver Jubilee Presentation Hall", date: "9th May", timings: "11am to 1pm" },
    { eventId: 9, domain: "DANCE", eventName: "Group Dance (Faculty)", venue: "Auditorium", date: "25th April", timings: "11am to 1pm" },
    { eventId: 10, domain: "DANCE", eventName: "Western Group Dance (Student)", venue: "Auditorium", date: "9th May", timings: "2pm to 4pm" },
    { eventId: 11, domain: "DANCE", eventName: "Duo Dance Freestyle", venue: "Silver Jubilee Presentation Hall", date: "9th May", timings: "11am to 1pm" },
    { eventId: 12, domain: "MUSIC", eventName: "Instrumental Solo", venue: "AIB 402", date: "11th May", timings: "11am to 1pm" },
    { eventId: 13, domain: "MUSIC", eventName: "Voice of GAT (Faculty)", venue: "Auditorium", date: "9th May", timings: "11am to 1pm" },
    { eventId: 14, domain: "MUSIC", eventName: "Voice of GAT (Student)", venue: "Classroom", date: "11th May", timings: "2pm to 4pm" },
    { eventId: 15, domain: "MUSIC", eventName: "Classical Solo Vocal", venue: "Main Building 207", date: "11th May", timings: "11am to 1pm" },
    { eventId: 16, domain: "MUSIC", eventName: "Western Solo Vocal", venue: "AIB 102", date: "11th May", timings: "11am to 1pm" },
    { eventId: 17, domain: "MUSIC", eventName: "Group Song (Faculty)", venue: "Auditorium", date: "9th May", timings: "11am to 1pm" },
    { eventId: 18, domain: "MUSIC", eventName: "Group Song (Student)", venue: "Quadrangle Stage", date: "11th May", timings: "2pm to 4pm" },
    { eventId: 19, domain: "FASHION", eventName: "Group Ramp Walk (Faculty)", venue: "Auditorium", date: "12th May", timings: "11am to 1pm" },
    { eventId: 20, domain: "FASHION", eventName: "Group Ramp Walk (Student)", venue: "Auditorium", date: "12th May", timings: "2pm to 4pm" },
    { eventId: 21, domain: "FASHION", eventName: "Solo Ramp Walk (Faculty)", venue: "Auditorium", date: "12th May", timings: "11am to 1pm" },
    { eventId: 22, domain: "FASHION", eventName: "Solo Ramp Walk (Student)", venue: "Auditorium", date: "12th May", timings: "2pm to 4pm" },
    { eventId: 23, domain: "LITERARY", eventName: "Debate", venue: "Silver Jubilee Presentation Hall", date: "25th April", timings: "8:30 to 10:30am" },
    { eventId: 24, domain: "LITERARY", eventName: "Elocution", venue: "AIB 103", date: "25th April", timings: "8:30 to 10:30am" },
    { eventId: 25, domain: "LITERARY", eventName: "Pick and Speak", venue: "AIB 102", date: "25th April", timings: "8:30 to 10:30am" },
    { eventId: 26, domain: "LITERARY", eventName: "Poetry", venue: "Main Building 306", date: "25th April", timings: "11am to 1pm" },
    { eventId: 27, domain: "LITERARY", eventName: "On-Spot Creative Writing", venue: "Main Building 202", date: "25th April", timings: "11am to 1pm" },
    { eventId: 28, domain: "FINE ARTS", eventName: "Cartooning", venue: "AIB 101", date: "25th April", timings: "8:30 to 10:30am" },
    { eventId: 29, domain: "FINE ARTS", eventName: "Clay Modelling", venue: "Civil FM Lab", date: "25th April", timings: "11am to 1pm" },
    { eventId: 30, domain: "FINE ARTS", eventName: "On Spot Painting", venue: "Elephant Area", date: "25th April", timings: "11am to 1pm" },
    { eventId: 31, domain: "FINE ARTS", eventName: "Rangoli (Faculty)", venue: "Main Building Road", date: "25th April", timings: "8:30 to 10:30am" },
    { eventId: 32, domain: "FINE ARTS", eventName: "Rangoli (Student)", venue: "Main Building Road", date: "25th April", timings: "8:30 to 10:30am" },
    { eventId: 33, domain: "FINE ARTS", eventName: "Collage Making", venue: "Quadrangle Stage", date: "25th April", timings: "11am to 1pm" },
    { eventId: 34, domain: "FINE ARTS", eventName: "On Spot Photography", venue: "Main Building 316", date: "25th April", timings: "8:30 to 10:30am" },
    { eventId: 35, domain: "GENERAL EVENTS", eventName: "Cooking Without Fire (Faculty)", venue: "AIB 101, AIB 103", date: "9th May", timings: "11am to 1pm" },
    { eventId: 36, domain: "GENERAL EVENTS", eventName: "Cooking Without Fire (Student)", venue: "AIB 102", date: "9th May", timings: "11am to 1pm" },
    { eventId: 37, domain: "GENERAL EVENTS", eventName: "Kannada Quiz", venue: "Main Building 208", date: "9th May", timings: "11am to 1pm" },
    { eventId: 38, domain: "GENERAL EVENTS", eventName: "Entertainment Quiz", venue: "Main Building 208", date: "9th May", timings: "11am to 1pm" },
    { eventId: 39, domain: "GENERAL EVENTS", eventName: "Face Painting", venue: "Main Building 213", date: "9th May", timings: "8:30 to 10:30am" },
    { eventId: 40, domain: "GENERAL EVENTS", eventName: "Minute to Win it", venue: "Main Building 417", date: "9th May", timings: "8:30 to 10:30am" },
    { eventId: 41, domain: "GENERAL EVENTS", eventName: "Content Creation", venue: "Main Building 416", date: "9th May", timings: "8:30 to 10:30am" },
];

export const domains = [...new Set(events.map(e => e.domain))];

export function getEventsByDomain(domain: string): Event[] {
    return events.filter(e => e.domain === domain);
}

export function getEventsByDate(date: string): Event[] {
    return events.filter(e => e.date === date);
}

export function getEventById(id: number): Event | undefined {
    return events.find(e => e.eventId === id);
}