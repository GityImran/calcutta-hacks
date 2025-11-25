"use client"

import { Users, Plus, Flame, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface Community {
  id: number
  name: string
  description: string
  members: number
  icon: string
  recentActivity: string
  tags: string[]
  isJoined: boolean
}

export function CommunitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("trending")

  const communities: Community[] = [
    {
      id: 1,
      name: "AI Researchers",
      description: "Discuss cutting-edge AI research and applications",
      members: 2450,
      icon: "🤖",
      recentActivity: "350 posts this week",
      tags: ["ai", "research", "machine-learning"],
      isJoined: true,
    },
    {
      id: 2,
      name: "Web3 Developers",
      description: "Building the decentralized web",
      members: 1890,
      icon: "⛓️",
      recentActivity: "280 posts this week",
      tags: ["blockchain", "web3", "crypto"],
      isJoined: true,
    },
    {
      id: 3,
      name: "Data Science Hub",
      description: "Data analysis, visualization, and insights",
      members: 3200,
      icon: "📊",
      recentActivity: "425 posts this week",
      tags: ["data-science", "analytics", "python"],
      isJoined: false,
    },
    {
      id: 4,
      name: "Mathematics Forum",
      description: "Pure and applied mathematics discussions",
      members: 1200,
      icon: "∑",
      recentActivity: "95 posts this week",
      tags: ["mathematics", "research"],
      isJoined: false,
    },
  ]

  const categories = ["all", "ai", "blockchain", "research-methods", "web-dev", "data-science"]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Communities</h1>
          <p className="text-muted-foreground">Join topic-based communities to collaborate and learn</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Community
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-3">
          <Input
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-card border border-border rounded-lg text-foreground"
          >
            <option value="trending">Trending</option>
            <option value="new">New</option>
            <option value="active">Most Active</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {category === "all" ? "All" : category.replace("-", " ").charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Communities */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Flame className="w-5 h-5" /> Featured Communities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communities.slice(0, 2).map((community) => (
            <div
              key={community.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all hover:scale-[1.02]"
            >
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{community.icon}</span>
                  {community.isJoined && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Joined</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{community.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{community.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Users className="w-4 h-4" /> {community.members.toLocaleString()} members
                  </span>
                </div>
                <Button className="w-full">{community.isJoined ? "View" : "Join"}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Directory */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Community Directory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communities.map((community) => (
            <div
              key={community.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer group"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">{community.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {community.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{community.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {community.members}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" /> {community.recentActivity}
                </span>
              </div>

              <div className="mb-4 flex gap-1 flex-wrap">
                {community.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>

              <Button className="w-full" size="sm">
                {community.isJoined ? "View Community" : "Join Now"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
