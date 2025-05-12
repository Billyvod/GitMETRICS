"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Star, GitFork, Eye, ArchiveIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RepositoriesListProps {
  repositories: any[];
  year?: number;
}

export function RepositoriesList({ repositories, year }: RepositoriesListProps) {
  // Filter repositories by year if specified
  const filteredRepos = year 
    ? repositories.filter(repo => {
        const createdYear = new Date(repo.created_at).getFullYear();
        const updatedYear = new Date(repo.updated_at).getFullYear();
        return createdYear === year || updatedYear === year;
      })
    : repositories;
  
  // Sort by stars by default
  const sortedRepos = [...filteredRepos].sort((a, b) => b.stargazers_count - a.stargazers_count);
  
  // Take top 8 for display
  const displayRepos = sortedRepos.slice(0, 8);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Top Repositories</CardTitle>
          <ArchiveIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {displayRepos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayRepos.map((repo) => (
              <Link
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="border rounded-lg p-4 h-full hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium truncate" title={repo.name}>
                      {repo.name}
                    </h3>
                    {repo.private && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        Private
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 h-10">
                    {repo.description || "No description"}
                  </p>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <div className="flex items-center mr-3">
                      <Star className="h-3 w-3 mr-1" />
                      <span>{repo.stargazers_count.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center mr-3">
                      <GitFork className="h-3 w-3 mr-1" />
                      <span>{repo.forks_count.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center mr-3">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{repo.watchers_count.toLocaleString()}</span>
                    </div>
                    {repo.language && (
                      <span className="ml-auto">{repo.language}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No repositories found for this time period.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}