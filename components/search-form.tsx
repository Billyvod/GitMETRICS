"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchForm() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setIsLoading(true);
    router.push(`/dashboard/${username}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder="Enter GitHub username"
          className="h-12 pl-10 pr-20 rounded-lg border border-input bg-background focus-visible:ring-2 transition-all"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Button 
          type="submit" 
          className="absolute right-1.5 top-1.5 h-9"
          disabled={isLoading || !username.trim()}
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <>
              Analyze <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}