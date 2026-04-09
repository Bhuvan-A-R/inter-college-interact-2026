// Declarations for static image imports used with next/image
declare module "*.png" {
  import type { StaticImageData } from "next/image";
  const content: StaticImageData;
  export default content;
}

// CSS side-effect imports
declare module "*.css";

// qrcode — no @types package available
declare module "qrcode";

declare module "*.jpg" {
  import type { StaticImageData } from "next/image";
  const content: StaticImageData;
  export default content;
}

declare module "*.jpeg" {
  import type { StaticImageData } from "next/image";
  const content: StaticImageData;
  export default content;
}

declare module "*.webp" {
  import type { StaticImageData } from "next/image";
  const content: StaticImageData;
  export default content;
}

declare module "*.gif" {
  import type { StaticImageData } from "next/image";
  const content: StaticImageData;
  export default content;
}

declare module "*.svg" {
  import type { StaticImageData } from "next/image";
  const content: StaticImageData;
  export default content;
}
