/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { env } from "@/env.mjs";
import { type RequestError } from "@google-cloud/storage/build/cjs/src/file";

export async function POST(request: Request) {
  const { filename, contentType } = await request.json();

  try {
    const client = new S3Client({ region: env.AWS_REGION });
    const { url, fields } = await createPresignedPost(client, {
      Bucket: env.AWS_BUCKET_NAME,
      Key: filename,
      Conditions: [
        ["content-length-range", 0, 10485760], // up to 10 MB
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        acl: "public-read",
        "Content-Type": contentType,
      },
      Expires: 600, // Seconds before the presigned post expires
    });

    return Response.json({ url, fields });
  } catch (error) {
    return Response.json({ error: (error as RequestError).message });
  }
}
