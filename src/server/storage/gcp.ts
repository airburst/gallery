"use server";

// import { env } from "@/env.mjs";
// import { Storage } from "@google-cloud/storage";

// const handleUpload = async (req: Request, res: Response) => {
//   const storageOptions = {
//     projectId: env.PROJECT_ID,
//     credentials: {
//       type: "service_account",
//       client_email: env.CLIENT_EMAIL,
//       private_key: env.PRIVATE_KEY,
//     },
//   };
//   const storage = new Storage(storageOptions);
//   const bucket = storage.bucket(env.BUCKET_NAME);
//   const file = bucket.file(req.query.file);
//   const options = {
//     expires: Date.now() + 1 * 60 * 1000, //  1 minute,
//     fields: { "x-goog-meta-test": "data" },
//   };

//   const [response] = await file.generateSignedPostPolicyV4(options);
//   res.status(200).json(response);
// };

// export default handleUpload;

const temp = {};
export default temp;
