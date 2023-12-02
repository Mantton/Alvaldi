import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/alv/NavBar";

export const metadata: Metadata = {
  title: "Alvaldi - Trade Cards",
  description:
    "Connect with a global community of K-pop lovers, engage in exciting trades, and complete your dream collection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex flex-col h-screen">
          <NavBar />
          <div className="flex-1 overflow-auto">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
