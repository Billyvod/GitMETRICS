import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <Github className="h-16 w-16 opacity-20" />
        </div>
        
        <h1 className="text-4xl font-bold">404 - Not Found</h1>
        
        <p className="text-muted-foreground">
          The GitHub profile or page you're looking for doesn't exist or might have been removed.
        </p>
        
        <Button asChild>
          <Link href="/">
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}