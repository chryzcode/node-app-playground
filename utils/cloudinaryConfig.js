// cloudinaryConfig.js
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { Readable } from "stream";
import { promisify } from "util";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});
const uploadToCloudinary = file => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "PenPages/Media/",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
    Readable.from(file.buffer).pipe(uploadStream);
  });
};

// Multer configuration
const multerUpload = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
});

export { multerUpload, uploadToCloudinary };