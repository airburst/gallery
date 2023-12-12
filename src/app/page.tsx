"use client";

import Image from "next/image";
import { Masonry } from "react-plock";

// TODO: fetch image urls from DB
const images = [
  {
    src: "https://ik.imagekit.io/mfimages/ella/ella-110.jpg",
    alt: "Ella gallery",
  },
  {
    src: "https://ik.imagekit.io/mfimages/toby/toby-031.jpg",
    alt: "Toby gallery",
  },
  {
    src: "https://ik.imagekit.io/mfimages/alps/alps-2015-037.jpg",
    alt: "Les Alpes gallery",
  },
  {
    src: "https://ik.imagekit.io/mfimages/dogs/ted.jpg",
    alt: "Dogs gallery",
  },
  {
    src: "https://ik.imagekit.io/mfimages/lakes/lakes-2011-002.jpg",
    alt: "Lakes gallery",
  },
  {
    src: "https://ik.imagekit.io/mfimages/venice/venice-070.jpg",
    alt: "Venice gallery",
  },
  {
    src: "https://ik.imagekit.io/mfimages/ski/meribel-2019-021.jpg",
    alt: "Ski gallery",
  },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50">
      <div className="container flex flex-col items-center justify-center">
        <h1 className="py-4 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Photos
        </h1>

        <Masonry
          items={images}
          config={{
            columns: [1, 2, 3],
            gap: [12, 24, 24],
            media: [640, 768, 1024],
          }}
          render={(item) => (
            <Image
              key={item.src}
              src={item.src}
              width={400}
              height={300}
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 320px, 320px"
              alt={item.alt}
              priority
            />
          )}
        />
      </div>
    </main>
  );
}
