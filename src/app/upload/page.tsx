"use client";

import { UploadDropzone } from "@/components/UploadDropzone/UploadDropzone";
import axios, { type AxiosProgressEvent, type AxiosRequestConfig } from "axios";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [progress, setProgress] = useState<Record<string, number>>({});

  const uploadFile = async (file: File) => {
    // Get pre-signed url from AWS S3
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
    await Promise.all(files.map(uploadFile));
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
