import { createUploadThing } from "uploadthing/next";

const f = createUploadThing();

export const ourFileRouter = {
  productImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ metadata, file }) => {
    const userId = (metadata).userId;
    console.log("Upload complete for userId:", userId);
    console.log("file url", file.url);
  }),
} 

export default typeof ourFileRouter;

