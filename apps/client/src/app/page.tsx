import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto grid h-full grid-cols-2 items-center justify-center">
      <div className="flex h-full items-center justify-center">
        <Image src="/9916512.jpg" width={400} height={400} alt="finger_heart" />
      </div>
      <div className="flex h-full flex-col items-center justify-center">
        <div className="flex flex-col gap-2 p-8">
          <h1 className="lg:text-5xl; scroll-m-20  text-4xl font-extrabold tracking-tight">
            Alvaldi
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Unlock, Trade and Collect Cards from your favorite idols and groups.
            Earn points by completing Collection Sets. Climb the leader-board
            and compete against other fans!
          </p>
          <div className="flex gap-4">
            <Link
              className={buttonVariants({ variant: "default" })}
              href="/cards"
            >
              Explore Cards
            </Link>

            <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/home"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
{
  /* <a href="https://www.freepik.com/free-vector/finger-heart-concept-illustration_80789788.htm#query=kpop&position=5&from_view=search&track=sph&uuid=8aeebc42-1a25-4c86-8df5-674ff7d89115">Image by storyset</a> on Freepik */
}
