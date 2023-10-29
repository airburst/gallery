import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50">
      <div className="container flex flex-col items-center justify-center">
        <h1 className="py-4 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Photos
        </h1>

        <div className="grid max-w-[992] auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="overflow-hidden rounded-lg hover:shadow-lg">
            <Image
              src="https://ik.imagekit.io/mfimages/ella/ella-110.jpg"
              width={320}
              height={200}
              alt="Ella gallery"
              priority
            />
          </div>
          <div className="overflow-hidden rounded-lg hover:shadow-lg">
            <Image
              src="https://ik.imagekit.io/mfimages/toby/toby-031.jpg"
              width={320}
              height={200}
              alt="Toby gallery"
              priority
            />
          </div>
          <div className="overflow-hidden rounded-lg hover:shadow-lg">
            <Image
              src="https://ik.imagekit.io/mfimages/alps/alps-2015-037.jpg"
              width={320}
              height={200}
              alt="Les Alpes gallery"
              priority
            />
          </div>
          <div className="overflow-hidden rounded-lg hover:shadow-lg">
            <Image
              src="https://ik.imagekit.io/mfimages/dogs/ted.jpg"
              width={320}
              height={200}
              alt="Dogs gallery"
              priority
            />
          </div>
          <div className="overflow-hidden rounded-lg hover:shadow-lg">
            <Image
              src="https://ik.imagekit.io/mfimages/lakes/lakes-2011-002.jpg"
              width={320}
              height={200}
              alt="Les Alpes gallery"
              priority
            />
          </div>
          <div className="overflow-hidden rounded-lg hover:shadow-lg">
            <Image
              src="https://ik.imagekit.io/mfimages/ski/meribel-2019-021.jpg"
              width={320}
              height={200}
              alt="Meribel gallery"
              priority
            />
          </div>
          <div className="overflow-hidden rounded-lg hover:shadow-lg">
            <Image
              src="https://ik.imagekit.io/mfimages/venice/venice-070.jpg"
              width={320}
              height={200}
              alt="Venice gallery"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
