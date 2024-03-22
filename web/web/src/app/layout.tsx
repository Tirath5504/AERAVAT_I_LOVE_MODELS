import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import AuthChecker from "@/components/AuthChecker";
import { Suspense } from "react";
import LoadingScreen from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduPro.inc",
  description: "Created by i_love_models",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Homemade+Apple|Roboto|Caveat|Liu+Jian+Mao+Cao&display=swap"
    />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<LoadingScreen/>}>
        {children}
        <Toaster />
        <AuthChecker/>
        </Suspense>
    <script defer src="https://unpkg.com/jspdf@^1/dist/jspdf.min.js"></script>

      </body>
    </html>
  );
}
