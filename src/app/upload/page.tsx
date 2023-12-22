"use client";

import { Progress } from "@/components/Progress";
import { Previews } from "@/components/Upload/Previews";
import axios, { type AxiosProgressEvent, type AxiosRequestConfig } from "axios";
import type { NextPage } from "next";
import Image from "next/image";
import { useState, type ChangeEvent } from "react";

const Home: NextPage = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      alert("No file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }

    const file = fileInput.files[0];

    /** File validation */
    if (!file?.type.startsWith("image")) {
      alert("Please select a valide image");
      return;
    }

    /** Setting file state */
    setFile(file); // we will use the file state, to send it later to the server
    setPreviewUrl(URL.createObjectURL(file)); // we will use this to show the preview of the image

    /** Reset file input */
    e.currentTarget.type = "text";
    e.currentTarget.type = "file";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

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

          setProgress(+percentage.toFixed(2));
        },
      };

      setUploading(true);

      await axios.post<{
        data: {
          url: string;
        };
      }>(url, formData, options);

      setUploading(false);

      // TODO: Toast with success
    } catch (e: unknown) {
      console.error(e);
      // TODO: Toast with error
    }
  };

  return (
    <div>
      <main className="py-10">
        <div className="mx-auto w-full max-w-3xl px-3">
          <form
            className="w-full rounded border-2 border-dashed border-neutral-300 p-4"
            onSubmit={handleSubmit}
          >
            <div className="flex-flex-col pb-4">
              {previewUrl ? (
                <div className="flex flex-row items-center gap-8 rounded bg-white p-2 shadow-lg">
                  <Image
                    className="rounded"
                    alt="file uploader preview"
                    src={previewUrl}
                    width={64}
                    height={64}
                  />
                  <div className="w-full">
                    <Progress value={progress} max={100} />
                  </div>
                </div>
              ) : (
                <label className="flex h-full cursor-pointer flex-col items-center justify-center py-3 transition-colors duration-150 hover:text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                  <strong className="text-sm font-medium">
                    Select an image
                  </strong>
                  <input
                    className="block h-0 w-0"
                    name="file"
                    type="file"
                    onChange={onFileUploadChange}
                  />
                </label>
              )}
            </div>

            {!uploading && (
              <button className="btn btn-primary" type="submit">
                UPLOAD
              </button>
            )}
          </form>

          <Previews />
        </div>
      </main>
    </div>
  );
};

export default Home;
