import Link from "next/link";
import { ArrowRight, Blocks, Palette, BarChart3, GitFork, ExternalLink } from "lucide-react";

const features = [
  {
    icon: Blocks,
    title: "Block-Based Editor",
    description: "8 block types: header, buttons, text, images, gallery, video, dividers, and social links.",
  },
  {
    icon: Palette,
    title: "6 Themes",
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
    description: "Deploy on your own infrastructure. Full control over your data.",
  },
];

export default function Home() {
  return (
    <>
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              L
            </div>
            <span className="text-lg font-bold">LinkForge</span>
          </div>
          <nav className="flex items-center gap-4">
              <Link
              href="https://github.com/linkforge/linkforge"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              <GitFork className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b">
          <div className="mx-auto max-w-6xl px-4 py-24 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Your links, your rules.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              A modern, self-hostable, open-source Linktree alternative.
              Build beautiful link-in-bio pages with a powerful block editor.
              No ads, no tracking, no vendor lock-in.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="https://github.com/linkforge/linkforge"
                className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium hover:bg-accent"
              >
                View on GitHub
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-3xl font-bold tracking-tight">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
              A focused set of features for creating and managing your link-in-bio pages.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="rounded-lg border p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              <div className="rounded-lg border p-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="mt-4 font-semibold">Create an account</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Sign up with email or OAuth. No credit card needed.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="mt-4 font-semibold">Build your page</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add blocks, customize themes, and arrange your content.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="mt-4 font-semibold">Share</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Publish and share your unique link. Update anytime.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
          <p>LinkForge — Open source link-in-bio builder. AGPL-3.0.</p>
        </div>
      </footer>
    </>
  );
}
