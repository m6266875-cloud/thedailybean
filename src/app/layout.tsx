import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Daily Bean | Craft Coffee, Local Vibes",
  description: "A warm neighborhood coffee shop in Brooklyn—thoughtful espresso, fresh pastries, and room to stay awhile.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
