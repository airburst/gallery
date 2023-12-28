import ExifReader from "exifreader";

const formatDate = (date?: string): string => {
  if (!date) {
    return new Date().toISOString();
  }

  const [d, t] = date.split(" ");
  const isoD = d?.replace(/:/g, "-");
  return isoD ? `${isoD}T${t}.000Z` : new Date().toISOString();
};

export type ExifData = {
  imageDate: string;
  width?: number;
  height?: number;
};

export const readExif = async (file: File): Promise<ExifData> => {
  const tags = await ExifReader.load(file);

  return {
    imageDate: formatDate(tags.DateTimeOriginal?.description),
    width: tags["Image Width"]?.value,
    height: tags["Image Height"]?.value,
  };
};
