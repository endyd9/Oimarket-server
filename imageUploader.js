import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3Uploader = multerS3({
  s3: s3,
  bucket: "oi-market/images",
  acl: "public-read",
});

export const fileUploader = multer({
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
  storage: s3Uploader,
});
