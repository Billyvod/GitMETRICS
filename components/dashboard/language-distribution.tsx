"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip as RechartsTooltip } from "recharts";
import { CodeSquare } from "lucide-react";

// Colors for the pie chart
const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

interface LanguageDistributionProps {
  repositories: any[];
  year?: number;
}

export function LanguageDistribution({ repositories, year }: LanguageDistributionProps) {
  // Filter repositories by year if specified
  const filteredRepos = year 
    ? repositories.filter(repo => {
        const createdYear = new Date(repo.created_at).getFullYear();
        const updatedYear = new Date(repo.updated_at).getFullYear();
        return createdYear === year || updatedYear === year;
      })
    : repositories;
  
  // Count languages
  const languageCount = filteredRepos.reduce((acc: Record<string, number>, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});
  
  // Convert to array for chart
  const data = Object.entries(languageCount)
    .map(([language, count]) => ({ name: language, value: count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Top 5 languages
  
  // Add "Other" category if needed
  if (Object.keys(languageCount).length > 5) {
    const otherCount = Object.entries(languageCount)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(5)
      .reduce((sum, [, count]) => sum + (count as number), 0);
    
    data.push({ name: "Other", value: otherCount });
  }

  const totalRepos = data.reduce((sum, item) => sum + item.value, 0);
  
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    if (percent < 0.05) return null; // Don't show labels for small segments
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="#fff" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="11"
        fontWeight="500"
      >
        {data[index].name}
      </text>
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Language Distribution</CardTitle>
          <CodeSquare className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const percentage = ((payload[0].value as number / totalRepos) * 100).toFixed(1);
                    return (
                      <div className="bg-popover border border-border rounded-md shadow-md p-2 text-xs">
                        <p className="font-medium">{payload[0].name}</p>
                        <p>{`${payload[0].value} repos (${percentage}%)`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-center">
          <p className="text-lg font-medium">{totalRepos} Repositories</p>
          <p className="text-sm text-muted-foreground">
            {data.length > 0 
              ? `Most used: ${data[0].name} (${((data[0].value / totalRepos) * 100).toFixed(0)}%)`
              : 'No language data available'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}