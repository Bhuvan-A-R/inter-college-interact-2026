import fs from "fs";
import path from "path";
import GalleryClient from "./GalleryClient";

// Force dynamic to ensure it re-reads the directory if we run in dynamic contexts
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  let images: string[] = [];

  try {
    // Read the contents of the public/gallery directory
    const galleryDir = path.join(process.cwd(), "public", "gallery");
    
    // Check if directory exists
    if (fs.existsSync(galleryDir)) {
      const files = fs.readdirSync(galleryDir);
      
      // Filter out non-image files
      images = files.filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext);
      });
    }
  } catch (error) {
    console.error("Error reading gallery directory:", error);
  }

  return <GalleryClient images={images} />;
}
