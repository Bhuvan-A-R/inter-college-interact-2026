import { EmptyRegisterValidate, getAllEventsByUser, PaymentValid } from "@/app/prismaClient/queryFunction";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);
    // verify the jwt
    if (!session) {
        return NextResponse.json(
            { success: false, message: "unauthorized" },
            { status: 401 }
        );
    }
    const userId: string = session.id as string;

    try{
        const eventNotRegisterList = await PaymentValid(userId);
        const userEvents = await getAllEventsByUser(userId);

        const checkEmptyRegister = await EmptyRegisterValidate(userId);

        if(checkEmptyRegister === true){
            console.log("helfjdlaksjdf")
            return NextResponse.json({success:false,type:"text", message : "Participant without event registration exist, Please add the events to such registrant"},{status:400});
        }

        if(userEvents.length === 0){
            return NextResponse.json({success:false,type:"text", message : "You have not registered the Events"},{status:400});
        }
        else if(eventNotRegisterList.length>0){
            return NextResponse.json({success : false,type:"array", message : eventNotRegisterList}, {status:400});
        }
        else{
            return NextResponse.json({success:true,type:"array", message : []},{status:200});
        }
    }catch (err) {
        return NextResponse.json(
            { success: false, message: err },
            { status: 500 }
        );
    }
}