import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchUserProfile, fetchUserRepositories } from "@/lib/github";
import DashboardHeader from "@/components/dashboard/header";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { RepositoriesList } from "@/components/dashboard/repositories-list";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { LanguageDistribution } from "@/components/dashboard/language-distribution";
import { ContributionOverview } from "@/components/dashboard/contribution-overview";
import { YearSelector } from "@/components/dashboard/year-selector";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate data every hour

// Add generateStaticParams for static site generation
export async function generateStaticParams() {
  // Pre-render pages for some popular GitHub organizations
  return [
    { username: 'vercel' },
    { username: 'facebook' },
    { username: 'google' },
    { username: 'microsoft' },
    { username: 'github' }
  ];
}

async function getData(username: string) {
  try {
    const [profile, repositories] = await Promise.all([
      fetchUserProfile(username),
      fetchUserRepositories(username),
    ]);
    
    return {
      profile,
      repositories,
    };
  } catch (error) {
    return null;
  }
}

export default async function DashboardPage({
  params,
}: {
  params: { username: string };
}) {
  const data = await getData(params.username);
  
  if (!data) {
    notFound();
  }
  
  const { profile, repositories } = data;
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader username={params.username} />
      
      <main className="container py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3 space-y-6">
            <ProfileCard profile={profile} />
            <YearSelector 
              username={params.username} 
              currentYear={currentYear}
              availableYears={[currentYear, currentYear-1, currentYear-2]} 
            />
          </div>
          
          {/* Main Content */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-6">
            <Suspense fallback={<DashboardSkeleton />}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <ContributionOverview 
                  username={params.username} 
                  year={currentYear} 
                />
                <LanguageDistribution repositories={repositories} />
              </div>
              
              <ActivityTimeline 
                username={params.username} 
                year={currentYear} 
              />
              
              <RepositoriesList repositories={repositories} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}