"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Tooltip as RechartsTooltip, XAxis, YAxis, Bar, ResponsiveContainer, Cell } from "recharts";
import { Activity } from "lucide-react";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Dummy data - would be replaced with actual GitHub API data
const generateContributionData = (year: number) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  return months.map((month, index) => {
    // Generate random data, with future months having no data
    let value = 0;
    if (year < currentYear || (year === currentYear && index <= currentMonth)) {
      value = Math.floor(Math.random() * 150) + 10;
    }
    return {
      month,
      contributions: value,
    };
  });
};

interface ContributionOverviewProps {
  username: string;
  year: number;
}

export function ContributionOverview({ username, year }: ContributionOverviewProps) {
  const data = generateContributionData(year);
  const totalContributions = data.reduce((sum, item) => sum + item.contributions, 0);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Contribution Overview</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11 }}
              />
              <YAxis 
                hide={true}
                axisLine={false}
                tickLine={false}
              />
              <RechartsTooltip
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-popover border border-border rounded-md shadow-md p-2 text-xs">
                        <p>{`${payload[0].payload.month} ${year}: ${payload[0].value} contributions`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="contributions" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`hsl(var(--chart-${(index % 5) + 1}))`} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-center">
          <p className="text-lg font-medium">{totalContributions.toLocaleString()} contributions in {year}</p>
          <p className="text-sm text-muted-foreground">
            {Math.floor(totalContributions / 365)} contributions per day on average
          </p>
        </div>
      </CardContent>
    </Card>
  );
}