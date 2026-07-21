"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-light to-primary px-8 py-14 text-center text-primary-foreground shadow-xl"
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15),transparent_60%)]" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-landing">
            Ready to take control?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-primary-foreground/80">
            Deploy on your own infrastructure. Full control over your data. No ads, no tracking, no limits.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 text-sm font-medium text-primary shadow-lg hover:bg-white/90 transition-all active:scale-[0.97]"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="https://github.com/linkforge/linkforge"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-primary-foreground/20 px-8 text-sm font-medium text-primary-foreground/90 hover:bg-white/10 transition-all active:scale-[0.97]"
            >
              View Source
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
