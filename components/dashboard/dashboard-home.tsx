"use client"

import { BookOpen, CheckCircle, Share2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHome() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John</h1>
        <p className="text-muted-foreground">Last activity: 2 hours ago • 3 pending endorsements</p>
      </div>

      {/* Quick workbench - Left column */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Quick actions */}
          <div className="grid sm:grid-cols-3 gap-4">
            <button className="p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all hover:scale-105">
              <div className="p-2 bg-primary/10 rounded-lg w-fit mb-3">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Quick Verify</h3>
              <p className="text-sm text-muted-foreground">Upload artifact now</p>
            </button>
            <button className="p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all hover:scale-105">
              <div className="p-2 bg-primary/10 rounded-lg w-fit mb-3">
                <Share2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Endorsement</h3>
              <p className="text-sm text-muted-foreground">Request from professor</p>
            </button>
            <button className="p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all hover:scale-105">
              <div className="p-2 bg-primary/10 rounded-lg w-fit mb-3">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">View Registry</h3>
              <p className="text-sm text-muted-foreground">Check certificates</p>
            </button>
          </div>

          {/* Recent artifacts */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recent Artifacts</h2>
              <Button variant="outline" size="sm">
                View all
              </Button>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2 bg-primary/10 rounded flex-shrink-0">
                      <BookOpen className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground truncate">Machine Learning Assignment {item}</p>
                      <p className="text-xs text-muted-foreground">Verified • 2 days ago</p>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity feed - Right column */}
        <div className="bg-card border border-border rounded-lg p-6 h-fit">
          <h2 className="text-lg font-semibold text-foreground mb-4">Activity Feed</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="pb-4 border-b border-border last:border-0">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">Professor Smith endorsed your skill</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-card border border-border rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Verified Skills</p>
          <p className="text-2xl font-bold text-foreground">8</p>
          <p className="text-xs text-muted-foreground mt-2">+2 this month</p>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Endorsements</p>
          <p className="text-2xl font-bold text-foreground">5</p>
          <p className="text-xs text-muted-foreground mt-2">From 3 professors</p>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Learning Path</p>
          <p className="text-2xl font-bold text-foreground">62%</p>
          <p className="text-xs text-muted-foreground mt-2">Completion</p>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Study Groups</p>
          <p className="text-2xl font-bold text-foreground">3</p>
          <p className="text-xs text-muted-foreground mt-2">Active members</p>
        </div>
      </div>
    </div>
  )
}
