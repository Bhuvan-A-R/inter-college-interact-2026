import { NextResponse } from "next/server";

import { markVerified } from "../../prismaClient/queryFunction";

export async function POST(request : Request){
    
    const {usn} = await request.json();
    if(!usn){
        return NextResponse.json({success:false,message:"usn is required"},{status:400});
    }

    try{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updatedRegistrant = await markVerified(usn as string);
    return NextResponse.json({success:true,message:"registrant verified"},{status:200});
    }
    catch(error){
        return NextResponse.json({success:false,error},{status:500});
    }
}