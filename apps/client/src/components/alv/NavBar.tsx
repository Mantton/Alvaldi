import Link from "next/link";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function NavBar() {
  return (
    <>
      <div className="sticky w-full bg-slate-200 p-4">
        <div className="flex items-center justify-between">
          <a href="/">
            <p className="text-3xl font-bold">Alvaldi</p>
          </a>

          <div className="hidden items-center gap-4 sm:flex">
            <div className="flex gap-4">
              <Link href="/hub">TradeHub</Link>
              <Link href="/packs">Pack</Link>
            </div>
            <SignedIn>
              {/* Mount the UserButton component */}
              <UserButton />
            </SignedIn>
            <SignedOut>
              {/* Signed out users get sign in button */}
              <SignInButton />
            </SignedOut>
          </div>
        </div>
      </div>
    </>
  );
}
