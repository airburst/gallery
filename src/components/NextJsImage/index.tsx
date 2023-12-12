import Image from "next/image";
import {
  type SlideImage,
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
} from "yet-another-react-lightbox";

type NextJsImageType = {
  slide: SlideImage;
  rect: {
    width: number;
    height: number;
  };
};

function isNextJsImage(slide: SlideImage): boolean {
  return (
    isImageSlide(slide) &&
    typeof slide?.width === "number" &&
    typeof slide?.height === "number"
  );
}

export default function NextJsImage({ slide, rect }: NextJsImageType) {
  const { imageFit } = useLightboxProps().carousel;
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) {
    return undefined;
  }

  const slideWidth = slide.width ?? 1;
  const slideHeigth = slide.height ?? 1;

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / (slideHeigth ?? 1)) * slideWidth),
      )
    : rect.width;

  const height = !cover
    ? Math.round(Math.min(rect.height, (rect.width / slideWidth) * slideHeigth))
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt=""
        src={slide.src}
        loading="eager"
        draggable={false}
        // placeholder={slide.blurDataURL ? "blur" : undefined}
        style={{ objectFit: cover ? "cover" : "contain" }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
      />
    </div>
  );
}
