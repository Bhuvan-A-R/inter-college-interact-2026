import { updateFile } from "@/app/prismaClient/queryFunction";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(request: Request) {
    const formData = await request.formData();

    const registrantId: string = formData.get("registrantId") as string;

    const fileUrl: string = formData.get("fileUrl") as string;

    const field: string = formData.get("field") as string;

    // console.log(fileUrl,field,registrantId);

    if (!registrantId || !fileUrl || !field) {
        return NextResponse.json(
            { success: false, message: "invalid input" },
            { status: 400 }
        );
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const updatefile = await updateFile(registrantId, fileUrl, field);
        return NextResponse.json(
            { success: true, message: "file uploaded and updated" },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { success: false, message: err },
            { status: 400 }
        );
    }
}
