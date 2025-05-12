"use client";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Users, 
  Star, 
  GitFork, 
  MapPin, 
  Building, 
  Link as LinkIcon 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProfileCardProps {
  profile: any;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const joinDate = new Date(profile.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="overflow-hidden border">
      <CardHeader className="pb-2">
        <div className="flex flex-col items-center">
          <div className="relative h-24 w-24 rounded-full overflow-hidden mb-3 ring-2 ring-background">
            <Image
              src={profile.avatar_url}
              alt={profile.login}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardTitle className="text-xl text-center">
            {profile.name || profile.login}
          </CardTitle>
          {profile.login && (
            <Link
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors mt-1"
            >
              @{profile.login}
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        {profile.bio && (
          <p className="text-sm text-center mb-4">{profile.bio}</p>
        )}

        <div className="flex justify-around mb-4">
          <div className="flex flex-col items-center">
            <span className="text-lg font-medium">{profile.followers.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-medium">{profile.following.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">Following</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-medium">{profile.public_repos.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">Repos</span>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          {profile.company && (
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>{profile.company}</span>
            </div>
          )}
          {profile.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{profile.location}</span>
            </div>
          )}
          {profile.blog && (
            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
              <Link
                href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline truncate"
              >
                {profile.blog.replace(/^https?:\/\//, '')}
              </Link>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Member since {joinDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}