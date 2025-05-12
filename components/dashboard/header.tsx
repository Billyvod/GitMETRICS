import Link from "next/link";
import { Github, ArrowLeft } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

export default function DashboardHeader({ username }: { username: string }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="text-sm">Back</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{username}</span>
              <span className="text-xs text-muted-foreground">GitHub Analytics</span>
            </div>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}