import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import AccessManager from "./AccessManager";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GARAGE-HERO Test",
  description: "Generated by create flowbite react",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>

      <body className={inter.className}>
        <Providers>
          <AccessManager>
            {children}
          </AccessManager>
        </Providers>
      </body>

    </html>
  );
}
