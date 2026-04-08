import { verifySession } from "@/lib/session";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Existing route — requires authenticated session (legacy SPOC uploads)
    imageUploader: f({
        image: {
            maxFileSize: "256KB",
            maxFileCount: 1,
        },
    })
        .middleware(async () => {
            const session = await verifySession();
            if (!session?.id) throw new UploadThingError("Unauthorized");
            return { userId: String(session.id) };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.ufsUrl, file.key);
            return { uploadedBy: String(metadata.userId) };
        }),

    // New route — used during participant registration (no session required)
    registrationPhotoUploader: f({
        image: {
            maxFileSize: "2MB",
            maxFileCount: 1,
        },
    })
        .middleware(async () => {
            // No auth check: user is not logged in yet during registration
            return {};
        })
        .onUploadComplete(async ({ file }) => {
            return { url: file.ufsUrl };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
