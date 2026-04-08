import { getRegistrant } from "@/app/prismaClient/queryFunction";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) {
    const slug = (await params).slug;
    
    if(!slug){
      return NextResponse.json({success:false,message:"usn is missing"},{status:400});
    }
    const usn = slug as string;
    
    const response = await getRegistrant(usn as string);

    return NextResponse.json({success:true,response})
  }