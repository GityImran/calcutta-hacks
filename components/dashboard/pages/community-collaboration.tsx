"use client"

import { Users, Share2, Plus, MessageSquare, Zap, TrendingUp, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function CommunityCollaborationPage() {
  const [activeRooms, setActiveRooms] = useState<
    Array<{
      id: number
      name: string
      topic: string
      host: string
      participants: number
      status: "live" | "scheduled" | "offline"
    }>
  >([
    {
      id: 1,
      name: "Advanced ML Study",
      topic: "Machine Learning",
      host: "Dr. Sarah",
      participants: 12,
      status: "live",
    },
    { id: 2, name: "React Workshop", topic: "Web Dev", host: "Emma R.", participants: 8, status: "live" },
    {
      id: 3,
      name: "Blockchain Deep Dive",
      topic: "Crypto",
      host: "Prof. Torres",
      participants: 0,
      status: "scheduled",
    },
  ])

  const communities = [
    { id: 1, name: "AI Researchers", unread: 3 },
    { id: 2, name: "Data Science Hub", unread: 0 },
    { id: 3, name: "Blockchain Dev", unread: 5 },
  ]

  const upcomingEvents = [
    { id: 1, title: "Web3 Hackathon", date: "Dec 10, 2025" },
    { id: 2, title: "AI Workshop", date: "Dec 15, 2025" },
  ]

  const trendingTopics = ["machine-learning", "blockchain", "web3", "ai", "research", "algorithms"]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Community & Collaboration</h1>
        <p className="text-muted-foreground mb-6">
          Join study rooms, collaborate on projects, and get feedback from peers and mentors.
        </p>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Room
          </Button>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Users className="w-4 h-4" />
            Create Community
          </Button>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Share2 className="w-4 h-4" />
            Find Recruiters
          </Button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Rooms */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Active Rooms</h2>
            <div className="space-y-3">
              {activeRooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{room.name}</h3>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                            room.status === "live"
                              ? "bg-red-100 text-red-700"
                              : room.status === "scheduled"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${room.status === "live" ? "bg-red-500" : "bg-gray-500"}`}
                          />
                          {room.status === "live" ? "Live" : room.status === "scheduled" ? "Scheduled" : "Offline"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Topic: <span className="text-foreground font-medium">{room.topic}</span>
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Host: {room.host}</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" /> {room.participants} participants
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant={room.status === "live" ? "default" : "outline"}>
                      {room.status === "live" ? "Join" : "Reserve"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Communities You're In */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Communities You're In</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {communities.map((community) => (
                <div
                  key={community.id}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground text-sm">{community.name}</h3>
                    {community.unread > 0 && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {community.unread}
                      </span>
                    )}
                  </div>
                  <button className="w-full mt-3 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                    View →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Peer Review Requests */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Peer Review Requests (Latest)</h2>
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              {[
                { id: 1, title: "ML Research Paper", requester: "Alex Kim", status: "pending" },
                { id: 2, title: "Code Review: Authentication", requester: "Jordan Lee", status: "in-progress" },
                { id: 3, title: "Project Proposal", requester: "Sam Wong", status: "pending" },
              ].map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between pb-3 border-b border-border last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{request.title}</p>
                    <p className="text-xs text-muted-foreground">From {request.requester}</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Rail */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Upcoming Events
            </h3>
            <div className="space-y-2">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-card border border-border rounded-lg p-3 hover:bg-muted transition-colors"
                >
                  <p className="text-sm font-medium text-foreground">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Trending Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {trendingTopics.map((topic) => (
                <button
                  key={topic}
                  className="px-3 py-1 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground text-xs font-medium transition-all"
                >
                  #{topic}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Post */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Quick Post
            </h3>
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <textarea
                placeholder="Share your thoughts..."
                className="w-full bg-muted border border-border rounded-lg p-3 text-sm text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Post
                </Button>
                <Button size="sm" variant="outline">
                  <Zap className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-8 text-center">
        <Button variant="outline">Explore All Communities →</Button>
      </div>
    </div>
  )
}
