import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Rodo",
  description: "Get top notch services",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 600,
        alt: "Rodo",
      },
    ],
    title: "Rodo",
    description: "Get top notch services",
    siteName: "Rodo",
    url: "https://rodo.com",
  },
  twitter: {
    title: "Rodo",
    description: "Get top notch services",
    card: "summary_large_image",
    creator: "@rodo",
  },

};
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
