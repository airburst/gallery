import Image from "next/image";
import { Progress } from "../Progress";

export interface FileWithPreview extends File {
  preview?: string;
}

type ThumbsProps = {
  files: FileWithPreview[];
  onLoad?: () => void;
};

export const Thumbs = ({ files }: ThumbsProps) => {
  const thumbs = files.map((file) => (
    <div className="rounded p-2 text-neutral-700" key={file.name}>
      <div className="flex flex-row items-center gap-8 rounded">
        {file.preview && (
          <div className="flex w-full flex-row items-end gap-4 border-b-2 pb-4">
            <Image
              className="rounded"
              src={file.preview}
              width={64}
              height={64}
              alt={file.name}
            />
            <div className="flex flex-1 flex-col">
              {file.name}
              <div className="w-full">
                <Progress value={0} max={100} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ));

  return <aside className="mt-4 flex flex-col">{thumbs}</aside>;
};
