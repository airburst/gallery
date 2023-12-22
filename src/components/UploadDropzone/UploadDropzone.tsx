import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Thumbs, type FileWithPreview } from "./Thumbs";

export const UploadDropzone = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  // const onDrop = (acceptedFiles: File[]) => {
  //   acceptedFiles.forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onabort = () => console.log("file reading was aborted");
  //     reader.onerror = () => console.log("file reading has failed");
  //     reader.onload = () => {
  //       // Do whatever you want with the file contents
  //       const binaryStr = reader.result;
  //       console.log(binaryStr);
  //     };
  //     reader.readAsArrayBuffer(file);
  //   });
  // };

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

  // Set styles
  const classes = clsx(
    "cursor-grab  rounded border-2 border-dashed border-neutral-300 text-neutral-400",
    isDragActive && "border-red-500",
  );

  return (
    <section className="flex flex-col">
      <div {...getRootProps()} className={classes}>
        <input {...getInputProps()} />
        <div className="flex w-full flex-col items-center justify-center gap-2 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16"
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
          <p className="p-2">Drag and drop photos to upload</p>
          <button className="btn btn-primary" type="button" onClick={open}>
            Or click to select files
          </button>
        </div>
      </div>

      <Thumbs files={files} />
    </section>
  );
};
