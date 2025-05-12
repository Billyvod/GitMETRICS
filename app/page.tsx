import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import SearchForm from "@/components/search-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="h-6 w-6" />
            <span className="text-xl font-bold">GitMetrics</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center gap-8 px-4 pb-16 pt-8 md:pb-24 md:pt-12 lg:py-32">
        <div className="container flex max-w-5xl flex-col items-center text-center">
          <h1 className="animate-fade-up text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            GitHub Profile{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Analytics
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-muted-foreground md:text-xl">
            Get detailed insights and visualizations for any GitHub profile.
            Track repository performance, contribution patterns, and more in a
            beautiful dashboard.
          </p>

          <div className="mt-12 w-full max-w-md">
            <SearchForm />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
              <div className="mb-2 rounded-full bg-primary/10 p-2 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="font-semibold">Activity Trends</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Track contribution patterns and activity over time
              </p>
            </div>

            <div className="flex flex-col items-center rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
              <div className="mb-2 rounded-full bg-primary/10 p-2 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="m22 7-8.5 8.5-5-5L2 17" />
                  <path d="M16 7h6v6" />
                </svg>
              </div>
              <h3 className="font-semibold">Repository Metrics</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Analyze stars, forks, issues, and pull requests
              </p>
            </div>

            <div className="flex flex-col items-center rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
              <div className="mb-2 rounded-full bg-primary/10 p-2 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3 className="font-semibold">Global Comparison</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                See how you compare to other GitHub users
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-12">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                1
              </div>
              <h3 className="mt-4 text-xl font-semibold">Enter Username</h3>
              <p className="mt-2 text-muted-foreground">
                Simply type in any GitHub username to get started
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                2
              </div>
              <h3 className="mt-4 text-xl font-semibold">View Analytics</h3>
              <p className="mt-2 text-muted-foreground">
                See comprehensive profile and repository metrics
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                3
              </div>
              <h3 className="mt-4 text-xl font-semibold">Gain Insights</h3>
              <p className="mt-2 text-muted-foreground">
                Understand trends and patterns in your GitHub activity
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            <span className="text-sm font-semibold">GitMetrics</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GitMetrics. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}