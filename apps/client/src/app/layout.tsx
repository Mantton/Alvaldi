import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/alv/NavBar";
import Providers from "@/components/alv/Providers";

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
    <Providers>
      <html lang="en">
        <body className="flex h-screen flex-col ">
          <NavBar />
          <div className="flex-1">{children}</div>
        </body>
      </html>
    </Providers>
  );
}
