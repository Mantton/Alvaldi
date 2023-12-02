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
      <div className="grid grid-cols-2 p-4 gap-4 h-full">
        {SECTIONS.map((obj, index) => {
          return (
            <Link
              href={`/workshop/${obj.slug}`}
              key={index}
              className="bg-slate-50 h-full rounded-lg hover:border-slate-600 border-transparent border-4 transition-all"
            >
              <div className="h-full flex items-center justify-center">
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
