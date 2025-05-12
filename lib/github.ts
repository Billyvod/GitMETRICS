// GitHub API client and utility functions
export async function fetchUserProfile(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    throw error;
  }
}

export async function fetchUserRepositories(username: string) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
}

export async function fetchUserEvents(username: string) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events?per_page=100`
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching user events:", error);
    throw error;
  }
}

export function groupEventsByYear(events: any[]) {
  return events.reduce((acc, event) => {
    const year = new Date(event.created_at).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(event);
    return acc;
  }, {});
}

export function countEventsByType(events: any[]) {
  return events.reduce((acc, event) => {
    const type = event.type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
}

export function calculateRepositoryStats(repositories: any[]) {
  const stats = {
    totalRepos: repositories.length,
    totalStars: 0,
    totalForks: 0,
    totalWatchers: 0,
    languageDistribution: {} as Record<string, number>,
    mostPopularRepos: [] as any[],
  };

  repositories.forEach(repo => {
    stats.totalStars += repo.stargazers_count;
    stats.totalForks += repo.forks_count;
    stats.totalWatchers += repo.watchers_count;
    
    if (repo.language) {
      stats.languageDistribution[repo.language] = 
        (stats.languageDistribution[repo.language] || 0) + 1;
    }
  });

  // Sort repos by popularity (stars)
  stats.mostPopularRepos = [...repositories]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  return stats;
}