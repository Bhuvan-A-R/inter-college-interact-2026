import { updateEventRole } from "@/app/prismaClient/queryFunction";
import { NextResponse } from "next/server";
import { z } from "zod";

const UpdateRoleSchema = z.object({
    eventRegistrantId : z.string({message :"eventRegistrant Id is missing"}).min(1),
    type : z.enum(["PARTICIPANT"],{message:"invalid Type"})
}).strict();

export interface UpdateRole{
    eventRegistrantId : string;
    type : "PARTICIPANT"
} 

export async function PATCH(request:Request) {
    
    const body = await request.json();
    
    const result = UpdateRoleSchema.safeParse(body);

    if(!result.success){
        return NextResponse.json({success:false,
            message: result.error.errors
        },{status:400});
    }

    
    try{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const updateRole = await updateEventRole(result.data as UpdateRole);
    
        return NextResponse.json({success:true,message:"event Updated"},{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json({success:false,message:err},{status:400});
    }
}