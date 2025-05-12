"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";

// Dummy data - would be replaced with actual GitHub API data
const generateActivityData = (year: number) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  const data = [];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  for (let i = 0; i < 12; i++) {
    // Generate random data, with future months having no data
    let commits = 0;
    let pullRequests = 0;
    let issues = 0;
    let reviews = 0;
    
    if (year < currentYear || (year === currentYear && i <= currentMonth)) {
      commits = Math.floor(Math.random() * 50) + 5;
      pullRequests = Math.floor(Math.random() * 25);
      issues = Math.floor(Math.random() * 15);
      reviews = Math.floor(Math.random() * 20);
    }
    
    data.push({
      name: months[i],
      commits,
      pullRequests,
      issues,
      reviews,
    });
  }
  
  return data;
};

interface ActivityTimelineProps {
  username: string;
  year: number;
}

export function ActivityTimeline({ username, year }: ActivityTimelineProps) {
  const [activeView, setActiveView] = useState("all");
  const data = generateActivityData(year);
  
  const getTotalActivity = () => {
    return data.reduce(
      (acc, item) => {
        return {
          commits: acc.commits + item.commits,
          pullRequests: acc.pullRequests + item.pullRequests,
          issues: acc.issues + item.issues,
          reviews: acc.reviews + item.reviews,
        };
      },
      { commits: 0, pullRequests: 0, issues: 0, reviews: 0 }
    );
  };
  
  const totals = getTotalActivity();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Activity Timeline</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeView} onValueChange={setActiveView}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="commits">Commits</TabsTrigger>
            <TabsTrigger value="pullRequests">PRs</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                  width={30}
                />
                <RechartsTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-popover border border-border rounded-md shadow-md p-2 text-xs">
                          <p className="font-medium">{label} {year}</p>
                          {payload.map((entry, index) => (
                            <p key={index} style={{ color: entry.color }}>
                              {entry.name}: {entry.value}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                
                {(activeView === "all" || activeView === "commits") && (
                  <Line
                    type="monotone"
                    dataKey="commits"
                    name="Commits"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                )}
                
                {(activeView === "all" || activeView === "pullRequests") && (
                  <Line
                    type="monotone"
                    dataKey="pullRequests"
                    name="Pull Requests"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                )}
                
                {(activeView === "all" || activeView === "issues") && (
                  <Line
                    type="monotone"
                    dataKey="issues"
                    name="Issues"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                )}
                
                {(activeView === "all" || activeView === "reviews") && (
                  <Line
                    type="monotone"
                    dataKey="reviews"
                    name="Reviews"
                    stroke="hsl(var(--chart-4))"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mt-4">
            <div className="text-center">
              <p className="text-sm font-medium text-[hsl(var(--chart-1))]">{totals.commits}</p>
              <p className="text-xs text-muted-foreground">Commits</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-[hsl(var(--chart-2))]">{totals.pullRequests}</p>
              <p className="text-xs text-muted-foreground">Pull Requests</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-[hsl(var(--chart-3))]">{totals.issues}</p>
              <p className="text-xs text-muted-foreground">Issues</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-[hsl(var(--chart-4))]">{totals.reviews}</p>
              <p className="text-xs text-muted-foreground">Reviews</p>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}