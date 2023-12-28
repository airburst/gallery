/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button } from "@/components/ui/button";
import { CameraIcon, ReloadIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Thumbs, type FileWithPreview } from "./Thumbs";

type UploadDropzoneProps = {
  isUploading: boolean;
  onUpload?: (files: File[]) => void;
  uploadProgress?: Record<string, number>;
};

export const UploadDropzone = ({
  isUploading,
  onUpload,
  uploadProgress,
}: UploadDropzoneProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const hasFiles = files?.length > 0;

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks; run on unmount
    return () =>
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
  }, [files]);

  const handleUpload = () => {
    if (!isUploading) {
      onUpload?.(files);
    }
  };

  // Set styles
  const classes = clsx(
    "cursor-grab rounded border-4 border-dashed border-neutral-300 text-neutral-400",
    isDragActive && "border-red-500",
  );

  return (
    <section className="flex flex-col">
      {!hasFiles && (
        <div {...getRootProps()} className={classes}>
          <input {...getInputProps()} />
          <div className="flex w-full flex-col items-center justify-center gap-2 p-4">
            <CameraIcon className="h-16 w-16" />
            <p className="p-2">
              Drag and drop photos to upload (10MB max file size)
            </p>
            <Button onClick={open}>Or click to select files</Button>
          </div>
        </div>
      )}

      {hasFiles && (
        <Button
          className="self-center"
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Upload Photos
        </Button>
      )}

      <Thumbs files={files} uploadProgress={uploadProgress} />
    </section>
  );
};
