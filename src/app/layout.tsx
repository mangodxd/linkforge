import type { Metadata } from "next";
import { Geist, Geist_Mono, Fira_Code, Fira_Sans, Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LinkForge — Build your link in bio page",
  description:
    "A modern, self-hostable, open-source Linktree alternative. Build and customize your link in bio page with a powerful block-based editor.",
  keywords: ["link in bio", "linktree alternative", "open source", "self-hosted", "next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVariables = [
    geistSans.variable,
    geistMono.variable,
    firaCode.variable,
    firaSans.variable,
    poppins.variable,
    openSans.variable,
  ].join(" ");

  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
