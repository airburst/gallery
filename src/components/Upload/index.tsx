export default function Upload() {
  // const uploadPhoto = async (e) => {
  //   const file: File = e.target.files[0];
  //   const filename = encodeURIComponent(file.name);
  //   const res = await fetch(`/api/upload-url?file=${filename}`);
  //   const { url, fields } = await res.json();
  //   const formData = new FormData();

  //   Object.entries({ ...fields, file }).forEach(([key, value]) => {
  //     formData.append(key, value);
  //   });

  //   const upload = await fetch(url, {
  //     method: "POST",
  //     body: formData,
  //   });

  //   if (upload.ok) {
  //     console.log("Uploaded successfully!");
  //   } else {
  //     console.error("Upload failed.");
  //   }
  // };

  const uploadPhoto = console.log;

  return (
    <>
      <p>Upload a .png or .jpg image (max 1MB).</p>
      <input
        onChange={uploadPhoto}
        type="file"
        accept="image/png, image/jpeg"
      />
    </>
  );
}

// import { Storage } from '@google-cloud/storage';

// async function uploadFilesToGCS(bucketName: string, files: Express.Multer.File[]) {
//   /**
//    * This function uploads multiple files to a Google Cloud Storage bucket.
//    *
//    * Parameters:
//    * bucketName (string): The name of the bucket to upload the files to.
//    * files (Express.Multer.File[]): An array of files to upload.
//    *
//    * Returns:
//    * Promise<string[]>: A promise that resolves to an array of URLs for the uploaded files.
//    */
//   try {
//     // Create a new storage client
//     const storage = new Storage();

//     // Get the bucket to upload the files to
//     const bucket = storage.bucket(bucketName);

//     // Create an array to store the uploaded file URLs
//     const uploadedFileUrls: string[] = [];

//     // Loop through each file and upload it to the bucket
//     for (const file of files) {
//       // Create a new file object in the bucket
//       const gcsFileName = `${Date.now()}-${file.originalname}`;
//       const gcsFile = bucket.file(gcsFileName);

//       // Create a write stream to write the file to the bucket
//       const stream = gcsFile.createWriteStream({
//         metadata: {
//           contentType: file.mimetype,
//         },
//       });

//       // Pipe the file data to the write stream
//       stream.end(file.buffer);

//       // Wait for the file to finish uploading
//       await new Promise((resolve, reject) => {
//         stream.on('finish', resolve);
//         stream.on('error', reject);
//       });

//       // Get the URL for the uploaded file
//       const [url] = await gcsFile.getSignedUrl({
//         action: 'read',
//         expires: '03-17-2025',
//       });

//       // Add the URL to the array of uploaded file URLs
//       uploadedFileUrls.push(url);
//     }

//     // Return the array of uploaded file URLs
//     return uploadedFileUrls;
//   } catch (error) {
//     // Log the error
//     console.error(error);

//     // Return an empty array
//     return [];
//   }
// }
