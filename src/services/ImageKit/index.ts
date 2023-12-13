import { EMPTY_IMAGE, IMAGE_KIT_URL } from "@/constants";

export type ImageKitProps = {
  src: string;
  width?: number;
  height?: number;
  quality?: number;
  alt: string;
  lazy?: boolean;
  "data-src"?: string;
};

export type ImageProps = Omit<ImageKitProps, "quality"> & {
  src: string;
  width?: number;
  height?: number;
  lazy?: boolean;
  "data-src"?: string;
};

const imageKitLoader = ({ src, width, quality }: ImageKitProps): string => {
  if (src.startsWith("/")) src = src.slice(1);

  const params = [];

  if (width) {
    params.push([`w-${width}`]);
  }
  if (quality) {
    params.push(`q-${quality}`);
  }

  const paramsString = params.join(",");

  return `${IMAGE_KIT_URL}/${src}?tr=${paramsString}`;
};

// Return props to render in Next/Image component
export const getImageProps = ({
  src,
  width,
  height,
  quality,
  alt,
  lazy,
}: ImageKitProps): ImageProps => {
  const imageKitUrl: string = lazy
    ? (EMPTY_IMAGE as string)
    : imageKitLoader({ src, width, quality, alt });

  return {
    src: imageKitUrl,
    "data-src": imageKitUrl,
    width,
    height,
    alt,
  };
};
