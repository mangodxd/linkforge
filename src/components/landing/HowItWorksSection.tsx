"use client";

import { motion, type Variants } from "framer-motion";
import { FileText, Palette, Share2 } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Open the dashboard",
    description: "Start creating pages immediately. No signup needed.",
  },
  {
    icon: Palette,
    title: "Build your page",
    description: "Add blocks, customize themes, and arrange your content.",
  },
  {
    icon: Share2,
    title: "Share with the world",
    description: "Publish and share your unique link. Update anytime.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function HowItWorksSection() {
  return (
    <section className="border-t py-20">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center text-3xl font-bold tracking-tight font-landing">
            How it works
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-muted-foreground">
            Three simple steps to get your link-in-bio page up and running.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid gap-8 sm:grid-cols-3"
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="relative text-center"
              >
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-background">
                    {i + 1}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+3rem)] top-7 hidden h-px w-[calc(100%-6rem)] border-t border-dashed border-border sm:block" />
                )}
                <h3 className="mt-5 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
