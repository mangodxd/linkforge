"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, BarChart3, Users, FileText } from "lucide-react";

const stats = [
  { icon: FileText, value: "500+", label: "Pages created" },
  { icon: Users, value: "250+", label: "Active users" },
  { icon: BarChart3, value: "50K+", label: "Monthly views" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="mx-auto max-w-6xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            Open source · Self-hosted · AGPL-3.0
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl font-landing"
        >
          <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
            Your links,
          </span>
          <br />
          your rules.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          A modern, self-hostable, open-source Linktree alternative. Build beautiful
          link-in-bio pages with a powerful block editor. No ads, no tracking,
          no vendor lock-in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-7 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/30 transition-all active:scale-[0.97]"
          >
            Start Building
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="https://github.com/linkforge/linkforge"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-input bg-background px-7 text-sm font-medium hover:bg-accent transition-all active:scale-[0.97]"
          >
            View on GitHub
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid gap-6 sm:grid-cols-3"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center justify-center gap-3 rounded-xl border bg-card px-6 py-4"
              >
                <Icon className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <span className="block text-lg font-bold font-heading">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
