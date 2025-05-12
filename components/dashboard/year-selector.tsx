"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarRange } from "lucide-react";

interface YearSelectorProps {
  username: string;
  currentYear: number;
  selectedYear?: number;
  availableYears: number[];
}

export function YearSelector({ 
  username, 
  currentYear, 
  selectedYear, 
  availableYears 
}: YearSelectorProps) {
  const params = useParams();
  const activeYear = selectedYear || currentYear;
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Time Period</CardTitle>
          <CalendarRange className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!params.year ? "default" : "outline"}
            size="sm"
            className="flex-1"
            asChild
          >
            <Link href={`/dashboard/${username}`}>
              Current
            </Link>
          </Button>
          
          {availableYears.map((year) => (
            <Button
              key={year}
              variant={params.year === year.toString() ? "default" : "outline"}
              size="sm"
              className="flex-1"
              asChild
            >
              <Link href={`/dashboard/${username}/${year}`}>
                {year}
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}