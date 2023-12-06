import Link from "next/link";

const SECTIONS = [
  {
    name: "Record Labels",
    slug: "labels",
  },
  {
    name: "Groups",
    slug: "groups",
  },
  {
    name: "Artists",
    slug: "artists",
  },

  {
    name: "Eras",
    slug: "eras",
  },
  {
    name: "Collectables",
    slug: "collectables",
  },
];

export default function AdminPage() {
  return (
    <>
      <div className="grid h-full grid-cols-2 gap-4 p-4">
        {SECTIONS.map((obj, index) => {
          return (
            <Link
              href={`/workshop/${obj.slug}`}
              key={index}
              className="h-full rounded-lg border-4 border-transparent bg-slate-50 transition-all hover:border-slate-600"
            >
              <div className="flex h-full items-center justify-center">
                <p className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                  {obj.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
