"use client";

import { UploadDropzone } from "@/components/UploadDropzone/UploadDropzone";
import batch, { type ActionParams } from "@/utils/batch";
import axios, { type AxiosProgressEvent, type AxiosRequestConfig } from "axios";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [progress, setProgress] = useState<Record<string, number>>({});

  // Get a signed url from AWS and then upload file to bucket
  const uploadFile = async (file: File): Promise<void> => {
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });

    if (!response.ok) {
      alert("Failed to get pre-signed URL.");
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { url, fields }: { url: string; fields: Record<string, string> } =
        await response.json();
      const formData = new FormData();

      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", file);

      const options: AxiosRequestConfig = {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          // Calculate the progress percentage
          const { loaded, total } = progressEvent;
          const t = total ?? 1;
          const percentage = (loaded * 100) / t;

          setProgress((prevProgress) => ({
            ...prevProgress,
            [file.name]: +percentage.toFixed(2),
          }));
        },
      };

      await axios.post<{
        data: {
          url: string;
        };
      }>(url, formData, options);

      // TODO: Toast with success
    } catch (e: unknown) {
      console.error(e);
      // TODO: Toast with error
    }
  };

  const uploadFiles = async (files: File[]) => {
    // Use TaskQueue to throttle one file at a time
    const action = (args: ActionParams) => uploadFile(args.record as File);
    await batch(1)({ records: files, action });
  };

  return (
    <div>
      <main className="py-10">
        <div className="mx-auto w-full max-w-3xl px-3">
          <UploadDropzone onUpload={uploadFiles} uploadProgress={progress} />
        </div>
      </main>
    </div>
  );
};

export default Home;
