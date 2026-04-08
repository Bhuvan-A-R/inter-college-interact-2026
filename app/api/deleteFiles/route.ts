import { verifySession } from "@/lib/session";
import { utapi } from "@/app/api/uploadthing/uploadthing";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    try {
        const session = await verifySession();
        if (!session) {
            redirect("/auth/signin");
        }
        const data = await request.json();
        // console.log(data);
        const deleteStatus = await utapi.deleteFiles(data.files);
        console.log(deleteStatus);
        return NextResponse.json({
            success: true,
            message: "Files deleted",
        });
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: err,
        });
    }
}
