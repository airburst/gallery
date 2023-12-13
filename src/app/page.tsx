"use client";

import useLightbox from "@/hooks/useLightbox";
import Image from "next/image";
import { Masonry } from "react-plock";
import "yet-another-react-lightbox/styles.css";
// TODO: fetch image urls from DB
import slides from "./slides";
import { useState } from "react";
import Header from "@/components/Header";

export default function HomePage() {
  const [index, setIndex] = useState<number>(0);
  const { openLightbox, renderLightbox } = useLightbox();

  const handleImageClick = (src: string) => {
    const index = slides.findIndex((slide) => slide.src === src);
    setIndex(index);
    openLightbox();
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50">
      <div className="container flex flex-col items-center justify-center">
        <Header />

        <Masonry
          items={slides}
          config={{
            columns: [1, 2, 3],
            gap: [12, 24, 24],
            media: [640, 768, 1024],
          }}
          render={(item) => (
            <Image
              className="cursor-pointer hover:shadow-lg"
              key={item.src}
              src={item.src}
              loader={imageKitLoader}
              width={400}
              height={300}
              // sizes="(max-width: 640px) 100vw, (max-width: 1280px) 320px, 320px"
              alt={"Lakeland picture"}
              onClick={() => handleImageClick(item.src)}
            />
          )}
        />
      </div>

      {renderLightbox({ slides, index })}
    </main>
  );
}
