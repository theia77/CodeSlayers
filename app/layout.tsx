import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeSlayers",
  description:
    "CodeSlayers is a gamified arena for mastering Data Structures, Algorithms, and Machine Learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
