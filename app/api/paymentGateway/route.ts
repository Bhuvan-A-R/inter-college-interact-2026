import { getAllEventsByUser, PaymentValid, savePayment } from "@/app/prismaClient/queryFunction";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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

    const { txnNumber, paymentUrl, Amount } = await request.json();
    // console.log(txnNumber,paymentUrl,userId);


    try {

        const eventNotRegisterList = await PaymentValid(userId);

        const userEvents = await getAllEventsByUser(userId);
        const amount = userEvents.reduce(
            (sum, event) => sum + (event.amount ?? 0),
            0
        );
        

        if(eventNotRegisterList.length>0){
            return NextResponse.json({success : false, message : `There are zero Registrations for these events : ${eventNotRegisterList.map(value => value.eventName).join(', ')}`}, {status:400});
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const paymentResult = await savePayment(
            userId,
            txnNumber,
            paymentUrl,
            amount
        );
        return NextResponse.json(
            { success: true, message: "Payment Details are saved" },
            { status: 200 }
        );
    } catch (err:unknown) {
        console.log(err);
        return NextResponse.json(
            { success: false, message: "payment error" },
            { status: 500 }
        );
    }
}
