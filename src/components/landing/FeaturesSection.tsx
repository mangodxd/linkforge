"use client";

import { motion, type Variants } from "framer-motion";
import { Blocks, Palette, BarChart3, GitFork, Smartphone, Shield } from "lucide-react";

const features = [
  {
    icon: Blocks,
    title: "Block-Based Editor",
    description: "8 block types: header, buttons, text, images, gallery, video, dividers, and social links.",
  },
  {
    icon: Palette,
    title: "6 Beautiful Themes",
    description: "Minimal, Dark, Light, Nature, Ocean, and Sunset. Design tokens power every theme.",
  },
  {
    icon: BarChart3,
    title: "Simple Analytics",
    description: "Track page views and button clicks. No cookies, no tracking scripts.",
  },
  {
    icon: GitFork,
    title: "Self-Hosted",
    description: "Deploy on your own infrastructure. Full control over your data and privacy.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Every page looks stunning on any device. Responsive by default.",
  },
  {
    icon: Shield,
    title: "Privacy Focused",
    description: "No third-party trackers. No ads. Your data stays yours.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function FeaturesSection() {
  return (
    <section className="border-t py-20">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center text-3xl font-bold tracking-tight font-landing">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
            A focused set of features for creating and managing your link-in-bio pages.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group rounded-xl border bg-card p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
