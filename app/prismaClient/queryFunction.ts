import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { EventCreate } from "../api/eventsregister/route";
import { RegistrantDetailUpdate } from "../api/updateregisterdetails/route";
import { UpdateRole } from "../api/updateroleinevent/route";
import type { AddEvent } from "../api/addeventregister/route";
import { Registrant, UserEventsType } from "../api/register/route";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function insertRegistrant(
    arg: Registrant,
    userEvents: UserEventsType[]
) {
    try {
        const eventList: any[] = [];

        arg.events.forEach((x) => {
            const selectedEvent = userEvents.find((y) => y.id === x.eventId);

            if (selectedEvent) {
                if (x.type === "PARTICIPANT") {
                    if (
                        selectedEvent.registeredParticipant + 1 <=
                        selectedEvent.maxParticipant
                    ) {
                        selectedEvent.registeredParticipant += 1;
                        eventList.push({ ...selectedEvent, type: x.type });
                    }
                }
            }
        });
        // console.log(eventList,arg);

        const result = await prisma.$transaction(
            async (prisma) => {
                const registrant = await prisma.registrants.create({
                    data: {
                        name: arg.name,
                        usn: arg.usn,
                        email: arg.email,
                        phone: arg.phone,
                        photoUrl: arg.photoUrl,
                        idcardUrl: arg.idcardUrl,
                        deptCode: arg.deptCode,
                        gender: arg.gender,
                        blood: arg.blood,
                        user: {
                            connect: { id: arg.userId },
                        },
                    },
                });

                const events = await Promise.all(
                    eventList.map((event: any) =>
                        prisma.events.update({
                            where: {
                                id: event.id,
                            },
                            data: {
                                registrants: {
                                    connect: { id: registrant.id },
                                },
                                registeredParticipant:
                                    event.registeredParticipant,
                            },
                        })
                    )
                );

                const updatedEvents = events.map((x: any) => {
                    const findEvent = eventList.find((y) => y.id === x.id);
                    return { ...x, type: findEvent.type };
                });

                const eventRegistrant = await Promise.all(
                    updatedEvents.map((event: any) =>
                        prisma.eventRegistrations.create({
                            data: {
                                registrantId: registrant.id,
                                eventId: event.id,
                                type: event.type,
                            },
                        })
                    )
                );
                return { registrant, events, eventRegistrant };
            },
            {
                maxWait: 15000, // default: 2000
                timeout: 60000, // default: 5000
                isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
            }
        );
        return result;
    } catch (err: unknown) {
        handlePrismaError(err);
    }
}

function handlePrismaError(err: unknown): never {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(err);
        switch (err.code) {
            case "P2002":
                console.error(
                    `Unique constraint failed on the field: ${err.meta?.target}`
                );
                throw new Error(
                    `Unique constraint failed on the field: ${err.meta?.target}`
                );
            case "P2025":
                console.error("Record not found");
                throw new Error("Record not found");
            default:
                console.error(`Prisma error: ${err.message}`);
                throw new Error(`Prisma error: ${err.message}`);
        }
    } else if (err instanceof Prisma.PrismaClientValidationError) {
        console.error(err.message);
        throw new Error(`Validation error: ${err.message}`);
    } else if (err instanceof Error) {
        console.error("Unexpected error:", err.message);
        throw new Error(err.message || "An unexpected error occurred");
    } else {
        console.error("Unexpected error:", err);
        throw new Error("An unexpected error occurred");
    }
}

export async function getRegistrantsByCollege(arg: string) {
    try {
        const registerant = await prisma.registrants.findMany({
            where: {
                userId: arg,
            },
            include: {
                events: true,
            },
        });
        return registerant;
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle specific Prisma error codes
            switch (err.code) {
                case "P2002":
                    throw new Error(
                        `Unique constraint failed on the field: ${err.meta?.target}`
                    );
                case "P2025":
                    throw new Error("Record not found");
                default:
                    throw new Error(`Prisma error: ${err.message}`);
            }
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(`Validation error: ${err.message}`);
        } else {
            // Generic error handling
            console.error("Unexpected error:", err);
            if (err instanceof Error) {
                throw new Error(err.message || "An unexpected error occurred");
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    }
}

export async function getUser(id: string) {
    const user = await prisma.users.findFirst({
        where: {
            id: id,
        },
        include: {
            registrants: true,
            events: true,
        },
    });
    // console.log(user);
    return user;
}

export async function getRegistrantCount(id: string) {
    const count = await prisma.registrants.count({ where: { userId: id } });
    return count;
}

export async function getRegistrant(usn: string) {
    try {
        const registrant = await prisma.registrants.findUnique({
            where: {
                usn: usn,
            },
            include: {
                events: true,
                eventRegistrations: true,
            },
        });
        return registrant;
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            throw new Error(`Database error occurred: ${err.message}`);
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(`Validation error occurred: ${err.message}`);
        } else if (err instanceof Error) {
            throw new Error(`Unexpected error occurred: ${err.message}`);
        } else {
            throw new Error(
                "An unknown error occurred while registering events."
            );
        }
    }
}

export async function getRegistrantById(registrantId: string) {
    try {
        const registrant = await prisma.registrants.findUnique({
            where: {
                id: registrantId,
            },
            include: {
                events: true,
                eventRegistrations: true,
            },
        });
        return registrant;
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            throw new Error(`Database error occurred: ${err.message}`);
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(`Validation error occurred: ${err.message}`);
        } else if (err instanceof Error) {
            throw new Error(`Unexpected error occurred: ${err.message}`);
        } else {
            throw new Error("An unknown error occurred while fetching registrant.");
        }
    }
}

export async function getRegistrantByPhone(id: string) {
    try {
        const registerant = await prisma.registrants.findFirst({
            where: {
                phone: id,
            },
        });
        return registerant;
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            throw new Error(`Database error occurred: ${err.message}`);
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(`Validation error occurred: ${err.message}`);
        } else if (err instanceof Error) {
            throw new Error(`Unexpected error occurred: ${err.message}`);
        } else {
            throw new Error(
                "An unknown error occurred while registering events."
            );
        }
    }
}

export async function updateRegistrant(usn: string, eventId: string) {
    // Fetch the registrant
    try {
        const result = await prisma.$transaction(async (prisma) => {
            const registrant = await prisma.registrants.findFirst({
                where: {
                    usn,
                },
                include: {
                    eventRegistrations: true,
                    events: true,
                },
            });

            if (!registrant) {
                return "Registrant not found";
            }

            // Fetch the current attendanceStatus
            const existingRegistration =
                await prisma.eventRegistrations.findUnique({
                    where: {
                        id: eventId,
                    },
                });

            if (!existingRegistration) {
                return "Event registration not found";
            }

            const updatedRegistrant = await prisma.eventRegistrations.update({
                where: {
                    id: eventId,
                },
                data: {
                    prize: existingRegistration.prize === 1 ? 0 : 1,
                },
            });
            return updatedRegistrant.prize === 1;
        });
        return result;
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            throw new Error(`Database error occurred: ${err.message}`);
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(`Validation error occurred: ${err.message}`);
        } else if (err instanceof Error) {
            throw new Error(`Unexpected error occurred: ${err.message}`);
        } else {
            throw new Error(
                "An unknown error occurred while registering events."
            );
        }
    }

    // Return the updated registrant if needed
}

export async function markVerified(usn: string) {
    try {
        const updatedRegistrant = await prisma.registrants.update({
            where: {
                usn,
            },
            data: {
                docStatus: "APPROVED",
            },
        });
        return updatedRegistrant;
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            throw new Error(`Database error occurred: ${err.message}`);
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(`Validation error occurred: ${err.message}`);
        } else if (err instanceof Error) {
            throw new Error(`Unexpected error occurred: ${err.message}`);
        } else {
            throw new Error(
                "An unknown error occurred while registering events."
            );
        }
    }
}

export async function registerUserEvents(
    userId: string,
    events: EventCreate[]
) {
    try {
        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: { deptCode: true },
        });

        const existingTeams = await prisma.events.groupBy({
            by: ["eventNo"],
            where: { userId },
            _max: { teamNumber: true },
        });

        const teamMap = new Map<number, number>();
        existingTeams.forEach((row) => {
            teamMap.set(row.eventNo, row._max.teamNumber ?? 0);
        });

        const createData = events.flatMap((event) => {
            const teamCount = event.teamCount ?? 1;
            const startAt = (teamMap.get(event.eventNo) ?? 0) + 1;
            const items = Array.from({ length: teamCount }, (_, index) => ({
                userId,
                eventName: event.eventName,
                eventNo: event.eventNo,
                maxParticipant: event.maxParticipant,
                category: event.category,
                amount: event.amount,
                teamNumber: startAt + index,
                deptCode: user?.deptCode ?? null,
            }));
            teamMap.set(event.eventNo, startAt + teamCount - 1);
            return items;
        });

        const userEvents = await prisma.events.createMany({
            data: createData,
        });
        return userEvents;
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            throw new Error(`Database error occurred: ${err.message}`);
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(`Validation error occurred: ${err.message}`);
        } else if (err instanceof Error) {
            throw new Error(`Unexpected error occurred: ${err.message}`);
        } else {
            throw new Error(
                "An unknown error occurred while registering events."
            );
        }
    }
}

export async function getAllEventsByUser(userId: string) {
    try {
        const userEvents = await prisma.events.findMany({
            where: {
                userId: userId,
            },
        });
        return userEvents;
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            throw new Error(`Database error occurred: ${err.message}`);
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(`Validation error occurred: ${err.message}`);
        } else if (err instanceof Error) {
            throw new Error(`Unexpected error occurred: ${err.message}`);
        } else {
            throw new Error(
                "An unknown error occurred while registering events."
            );
        }
    }
}

export async function deleteRegistrant(registrantId: string) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const transaction = await prisma.$transaction(async (prisma) => {
            const userEvents = await prisma.registrants.delete({
                where: {
                    id: registrantId,
                },
                include: {
                    eventRegistrations: true,
                },
            });

            const eventsUpdate = await Promise.all(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                userEvents.eventRegistrations.map(async (event: any) => {
                    if (event.type === "PARTICIPANT") {
                        await prisma.events.update({
                            where: {
                                id: event.eventId,
                            },
                            data: {
                                registeredParticipant: {
                                    decrement: 1,
                                },
                            },
                        });
                    }
                })
            );
            return { userEvents, eventsUpdate };
        });
        return transaction;
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle specific Prisma error codes
            switch (err.code) {
                case "P2002":
                    throw new Error(
                        `Unique constraint failed on the field: ${err.meta?.target}`
                    );
                case "P2025":
                    throw new Error("Record not found");
                default:
                    throw new Error(`Prisma error: ${err.message}`);
            }
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(`Validation error: ${err.message}`);
        } else {
            // Generic error handling
            console.error("Unexpected error:", err);
            if (err instanceof Error) {
                throw new Error(err.message || "An unexpected error occurred");
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    }
}

export async function updateRegisterDetails(data: RegistrantDetailUpdate) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const updatedRegister = await prisma.registrants.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                usn: data.usn,
                phone: data.phone,
                gender: data.gender,
                blood: data.blood,
                email: data.email,
            },
        });
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle specific Prisma error codes
            switch (err.code) {
                case "P2002":
                    throw new Error(
                        `Unique constraint failed on the field: ${err.meta?.target}`
                    );
                case "P2025":
                    throw new Error("Record not found");
                default:
                    throw new Error(`Prisma error: ${err.message}`);
            }
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(`Validation error: ${err.message}`);
        } else {
            // Generic error handling
            console.error("Unexpected error:", err);
            if (err instanceof Error) {
                throw new Error(err.message || "An unexpected error occurred");
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    }
}

export async function updateEventRole(data: UpdateRole) {
    try {
        if (data.type !== "PARTICIPANT") {
            return null;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = await prisma.$transaction(async (prisma) => {
            const getRole = await prisma.eventRegistrations.findFirst({
                where: {
                    id: data.eventRegistrantId,
                },
                include: {
                    event: true,
                },
            });
            if (!getRole) {
                throw new Error("Invalid Registrant unauthorized");
            }

            if (
                getRole.event.registeredParticipant + 1 <=
                getRole.event.maxParticipant
            ) {
                const updateRole = await prisma.eventRegistrations.update({
                    where: {
                        id: data.eventRegistrantId,
                    },
                    data: {
                        type: data.type,
                    },
                    include: {
                        event: true,
                    },
                });
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const updateEventCount = await prisma.events.update({
                    where: {
                        id: updateRole.event.id,
                    },
                    data: {
                        registeredParticipant: {
                            increment: 1,
                        },
                    },
                });
                return updateEventCount;
            }

            return null;
        });
        return result;
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle specific Prisma error codes
            switch (err.code) {
                case "P2002":
                    throw new Error(
                        `Unique constraint failed on the field: ${err.meta?.target}`
                    );
                case "P2025":
                    throw new Error("Record not found");
                default:
                    throw new Error(`Prisma error: ${err.message}`);
            }
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(`Validation error: ${err.message}`);
        } else {
            // Generic error handling
            console.error("Unexpected error:", err);
            if (err instanceof Error) {
                throw new Error(err.message || "An unexpected error occurred");
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    }
}

export async function updateFile(
    registrantId: string,
    file: string,
    field: string
) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const query = await prisma.registrants.update({
            where: {
                id: registrantId,
            },
            data: {
                [field]: file,
            },
        });
        return query;
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle specific Prisma error codes
            switch (err.code) {
                case "P2002":
                    throw new Error(
                        `Unique constraint failed on the field: ${err.meta?.target}`
                    );
                case "P2025":
                    throw new Error("Record not found");
                default:
                    throw new Error(`Prisma error: ${err.message}`);
            }
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(`Validation error: ${err.message}`);
        } else {
            // Generic error handling
            console.error("Unexpected error:", err);
            if (err instanceof Error) {
                throw new Error(err.message || "An unexpected error occurred");
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    }
}

export async function deleteEventOfRegistrant(eventId: string) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = await prisma.$transaction(async (prisma) => {
            const deleteQuery = await prisma.eventRegistrations.delete({
                where: {
                    id: eventId,
                },
                include: {
                    event: true,
                },
            });

            if (deleteQuery.type === "PARTICIPANT") {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const updateQuery = await prisma.events.update({
                    where: {
                        id: deleteQuery.eventId,
                    },
                    data: {
                        registeredParticipant: {
                            decrement: 1,
                        },
                    },
                });
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const deleteQueryRegister = await prisma.events.update({
                where: {
                    id: deleteQuery.eventId,
                },
                data: {
                    registrants: {
                        disconnect: { id: deleteQuery.registrantId },
                    },
                },
            });
        });
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle specific Prisma error codes
            switch (err.code) {
                case "P2002":
                    throw new Error(
                        `Unique constraint failed on the field: ${err.meta?.target}`
                    );
                case "P2025":
                    throw new Error("Record not found");
                default:
                    throw new Error(`Prisma error: ${err.message}`);
            }
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(`Validation error: ${err.message}`);
        } else {
            // Generic error handling
            console.error("Unexpected error:", err);
            if (err instanceof Error) {
                throw new Error(err.message || "An unexpected error occurred");
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    }
}

export async function AddEvent(arg: AddEvent) {
    try {
        const result = await prisma.$transaction(async (prisma) => {
            const eventRegistrantAdd = await prisma.eventRegistrations.create({
                data: {
                    registrantId: arg.registrantId,
                    eventId: arg.event.id,
                    type: arg.type,
                },
                include: {
                    event: true,
                },
            });
            if (arg.type === "PARTICIPANT") {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const addEvent = await prisma.events.update({
                    where: {
                        id: eventRegistrantAdd.eventId,
                    },
                    data: {
                        registeredParticipant: {
                            increment: 1,
                        },
                        registrants: {
                            connect: {
                                id: arg.registrantId,
                            },
                        },
                    },
                });
            }
        });
        return result;
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle specific Prisma error codes
            switch (err.code) {
                case "P2002":
                    throw new Error(
                        `Unique constraint failed on the field: ${err.meta?.target}`
                    );
                case "P2025":
                    throw new Error("Record not found");
                default:
                    throw new Error(`Prisma error: ${err.message}`);
            }
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(`Validation error: ${err.message}`);
        } else {
            // Generic error handling
            console.error("Unexpected error:", err);
            if (err instanceof Error) {
                throw new Error(err.message || "An unexpected error occurred");
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    }
}

export async function savePayment(
    userId: string,
    txnNumber: string,
    paymentUrl: string,
    amount: number
) {
    try {
        await prisma.users.update({
            where: {
                id: userId,
            },
            data: {
                txnNumber,
                paymentUrl,
                Amount:amount,
            },
        });
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle specific Prisma error codes
            switch (err.code) {
                case "P2002":
                    throw new Error(
                        `Unique constraint failed on the field: ${err.meta?.target}`
                    );
                case "P2025":
                    throw new Error("Record not found");
                default:
                    throw new Error(`Prisma error: ${err.message}`);
            }
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(`Validation error: ${err.message}`);
        } else {
            // Generic error handling
            console.error("Unexpected error:", err);
            if (err instanceof Error) {
                throw new Error(err.message || "An unexpected error occurred");
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    }
}

export async function addCollege(
    collegeName: string,
    email: string,
    hashedPassword: string,
    otp: string,
    phone: string,
    region: string,
    collegeCode: string
) {
    const newUser = await prisma.users.create({
        data: {
            deptCode: collegeCode as string,
            collegeName: collegeName as string,
            email: email as string,
            phone: phone as string,
            password: hashedPassword, // Store the hashed password
            collegeOurCode: collegeCode as string,
            region: region as string,
        },
    });
    return newUser;
}

export async function getCollegeRegion(userId: string) {
    try {
        const region = await prisma.users.findFirst({
            where: {
                id: userId,
            },
            select: {
                region: true,
            },
        });
        return region;
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle specific Prisma error codes
            switch (err.code) {
                case "P2002":
                    throw new Error(
                        `Unique constraint failed on the field: ${err.meta?.target}`
                    );
                case "P2025":
                    throw new Error("Record not found");
                default:
                    throw new Error(`Prisma error: ${err.message}`);
            }
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(`Validation error: ${err.message}`);
        } else {
            // Generic error handling
            console.error("Unexpected error:", err);
            if (err instanceof Error) {
                throw new Error(err.message || "An unexpected error occurred");
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    }
}

export async function getRegisterByCollegeName(collegeName: string) {
    try {
        const registrantList = await prisma.users.findFirst({
            where: {
                collegeName: collegeName,
            },
            include: {
                events: true,
                registrants: true,
            },
        });
        return registrantList;
    } catch (error: unknown) {
        handlePrismaError(error);
    }
}

export async function getPaymentInfo(userId: string) {
    try {
        const payment = await prisma.users.findFirst({
            where: {
                id: userId,
            },
            select: {
                paymentUrl: true,
                PaymentVerified: true,
                Amount : true
            },
        });
        return payment;
    } catch (error: unknown) {
        handlePrismaError(error);
    }
}

export async function saveDateTimeOfArrival(
    userId: string,
    dateOfArrival: string,
    timeOfArrival: string
) {
    try {
        throw new Error(
            "Arrival date/time fields are not available in the current schema."
        );
    } catch (error: unknown) {
        handlePrismaError(error);
    }
}


export async function checkUnique(email : string, phone: string){
    try{
        const check = await prisma.registrants.findFirst({
            where:{
                OR:[
                    {email},
                    {phone}
                ]
            },
            select:{
                id: true
            }
        });
        if(check){
            return true;
        }
        else{
            return false;
        }
    }catch(error: unknown){
        handlePrismaError(error);
    }
}

export async function checkUsnUnique(usn : string){
    try{
        const check = await prisma.registrants.findUnique({
            where:{
                usn :usn
            },
            select:{
                id : true
            }
        });
        if(check){
            return true;
        }
        else{
            return false;
        }
    }catch(error: unknown){
        handlePrismaError(error);
    }
}

export async function checkEmailUnique(email:string) {
    try{
        const check = await prisma.registrants.findFirst({
            where:{
                email
            },
            select:{
                id:true
            }
        });
        if(check){
            return true;
        }
        else{
            return false;
        }
    }catch(error:unknown){
        handlePrismaError(error);
    }
}

export async function checkPhoneUnique(phone : string){
    try{
        const check = await prisma.registrants.findFirst({
            where:{
                phone
            },
            select:{
                id:true
            }
        });
        if(check){
            return true;
        }
        else{
            return false;
        }
    }catch(error:unknown){
        handlePrismaError(error);
    }
}

export async function PaymentValid(userId : string){
    try{
        const eventList = await prisma.events.findMany({
            where:{
                userId : userId
            },
            select:{
                registrants: true,
                eventName:true
            }
        });
    
        const eventRegistrantList = eventList.map((event)=> ({
            eventName : event.eventName,
            count : event.registrants.length
        }));
    
        const FilteredNotRegister = eventRegistrantList.filter((value)=>
            value.count === 0
        )
        return FilteredNotRegister;
    }catch(error:unknown){
        handlePrismaError(error);
    }
}

export async function EmptyRegisterValidate(userId : string){
    try{
        const validateRegister = await prisma.registrants.findMany(
            {
                where : {
                    userId : userId
                },
                select : {
                    _count : {
                        select:{
                            eventRegistrations : true,
                            events : true
                        }
                    }
                }
            }
        )
        for(let i=0; i<validateRegister.length ; i++){
            if((validateRegister[i]._count.eventRegistrations === 0) || (validateRegister[i]._count.events === 0)){
                return true;
            }
        }
        return false;
    }catch(error : unknown){
        handlePrismaError(error);
    }
}