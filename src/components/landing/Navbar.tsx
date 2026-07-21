"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, GitForkIcon } from "lucide-react";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed left-4 right-4 top-4 z-50 mx-auto max-w-6xl"
    >
      <div className="flex h-14 items-center justify-between rounded-2xl border bg-background/80 px-5 shadow-sm backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            L
          </div>
          <span className="text-base font-bold font-heading">LinkForge</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/linkforge/linkforge"
            className="flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <GitForkIcon className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.97]"
          >
            Get Started
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
