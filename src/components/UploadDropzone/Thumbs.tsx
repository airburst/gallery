import { useAutoAnimate } from "@formkit/auto-animate/react";
// import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatFileSize } from "@/utils/general";
// import { TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export interface FileWithPreview extends File {
  preview?: string;
}

type ThumbsProps = {
  files: FileWithPreview[];
  onLoad?: () => void;
  uploadProgress?: Record<string, number>;
};

export const Thumbs = ({ files, uploadProgress }: ThumbsProps) => {
  const [animationParent] = useAutoAnimate();

  const thumbs = files.map((file) => {
    const progress = uploadProgress?.[file.name] ?? 0;
    const isUploaded = progress === 100;

    if (isUploaded) {
      return null;
    }

    return (
      <div className="border-b py-2 text-neutral-700" key={file.name}>
        <div className="flex flex-row items-center gap-8 rounded">
          {file.preview && (
            <>
              <div className="flex w-full flex-row items-end gap-4 pb-2">
                <Image
                  className="rounded"
                  src={file.preview}
                  width={64}
                  height={64}
                  alt={file.name}
                />
                <div className="flex flex-1 flex-col truncate">{file.name}</div>
                <div className="flex flex-col">{formatFileSize(file.size)}</div>
                {/* <div className="flex flex-col">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      console.log("TODO: Delete Object", file.name)
                    }
                  >
                    <TrashIcon className="h-8 w-8" />
                  </Button>
                </div> */}
              </div>
            </>
          )}
        </div>
        <Progress value={progress} max={100} />
      </div>
    );
  });

  return (
    <aside
      ref={animationParent}
      className="mx-auto mt-4 flex w-full max-w-3xl flex-col"
    >
      {thumbs}
    </aside>
  );
};
