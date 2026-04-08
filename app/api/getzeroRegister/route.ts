import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){

    const test = await prisma.registrants.findMany({
        where:{
            userId: { not: "" }
        },
        include :{
            user : true,
            _count : {
                select : {
                    events : true,
                    eventRegistrations : true
                }
            }
        }
    });

    const ar = [];
    for(let i=0; i< test.length; i++){
        if((test[i]._count.events ===0) || (test[i]._count.eventRegistrations === 0)){
            ar.push(test[i]);
        }
    }
    return NextResponse.json({ar},{status:200});
}