import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50">
      <div className="container flex flex-col items-center justify-center">
        <h1 className="py-4 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Photos
        </h1>

        <div className="grid max-w-[992] auto-rows-[200px] grid-cols-[repeat(3,minmax(320px,auto))] gap-4">
          <div className="relative overflow-hidden rounded-lg hover:shadow-lg">
            <Image
              src="https://ik.imagekit.io/mfimages/ella/ella-110.jpg"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 320px, 320px"
              alt="Ella gallery"
              priority
            />
          </div>
          <div className="relative overflow-hidden rounded-lg hover:shadow-lg">
            <Image
              src="https://ik.imagekit.io/mfimages/toby/toby-031.jpg"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 320px, 320px"
              alt="Toby gallery"
              priority
            />
          </div>
          <div className="relative overflow-hidden rounded-lg hover:shadow-lg">
            <Image
              src="https://ik.imagekit.io/mfimages/alps/alps-2015-037.jpg"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 320px, 320px"
              alt="Les Alpes gallery"
              priority
            />
          </div>
          <div className="relative overflow-hidden rounded-lg hover:shadow-lg">
            <Image
              src="https://ik.imagekit.io/mfimages/dogs/ted.jpg"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 320px, 320px"
              alt="Dogs gallery"
              priority
            />
          </div>
          <div className="relative overflow-hidden rounded-lg hover:shadow-lg">
            <Image
              src="https://ik.imagekit.io/mfimages/lakes/lakes-2011-002.jpg"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 320px, 320px"
              alt="Les Alpes gallery"
              priority
            />
          </div>
          <div className="relative overflow-hidden rounded-lg hover:shadow-lg">
            <Image
              src="https://ik.imagekit.io/mfimages/ski/meribel-2019-021.jpg"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 320px, 320px"
              alt="Meribel gallery"
              priority
            />
          </div>
          <div className="relative overflow-hidden rounded-lg hover:shadow-lg">
            <Image
              src="https://ik.imagekit.io/mfimages/venice/venice-070.jpg"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 320px, 320px"
              alt="Venice gallery"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
