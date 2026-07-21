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
  title: {
    default: "LinkForge — Open source link-in-bio page builder",
    template: "%s | LinkForge",
  },
  description:
    "A modern, self-hosted Linktree alternative. Build beautiful link-in-bio pages with a powerful block editor. Open source, no ads, no tracking, full data control.",
  keywords: [
    "link in bio",
    "linktree alternative",
    "open source linktree",
    "self-hosted link in bio",
    "bio link page",
    "link page builder",
    "next.js",
    "supabase",
    "social links",
  ],
  openGraph: {
    title: "LinkForge — Open source link-in-bio page builder",
    description:
      "A modern, self-hosted Linktree alternative. Build beautiful link-in-bio pages — no ads, no tracking, full data control.",
    url: "https://github.com/mangodxd/linkforge",
    siteName: "LinkForge",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkForge — Open source link-in-bio page builder",
    description:
      "A modern, self-hosted Linktree alternative. Build beautiful link-in-bio pages — no ads, no tracking, full data control.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
