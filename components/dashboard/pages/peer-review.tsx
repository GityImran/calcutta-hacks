"use client"

import { Plus, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface ReviewRequest {
  id: number
  artifactTitle: string
  requester: string
  type: "code" | "paper" | "notes" | "presentation"
  deadline: string
  status: "pending" | "in-progress" | "completed"
  reviewers?: number
}

export function PeerReviewPage() {
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [activeTab, setActiveTab] = useState("outgoing")

  const outgoingRequests: ReviewRequest[] = [
    {
      id: 1,
      artifactTitle: "ML Research Paper v2",
      requester: "Dr. Sarah Chen",
      type: "paper",
      deadline: "Dec 20, 2025",
      status: "pending",
      reviewers: 2,
    },
    {
      id: 2,
      artifactTitle: "Authentication System",
      requester: "You",
      type: "code",
      deadline: "Dec 15, 2025",
      status: "in-progress",
      reviewers: 3,
    },
  ]

  const incomingRequests: ReviewRequest[] = [
    {
      id: 3,
      artifactTitle: "Blockchain Protocol Analysis",
      requester: "Alex Kim",
      type: "paper",
      deadline: "Dec 18, 2025",
      status: "pending",
    },
    {
      id: 4,
      artifactTitle: "React Component Library",
      requester: "Jordan Lee",
      type: "code",
      deadline: "Dec 22, 2025",
      status: "pending",
    },
  ]

  const pastReviews: ReviewRequest[] = [
    {
      id: 5,
      artifactTitle: "Data Processing Pipeline",
      requester: "Sam Wong",
      type: "code",
      deadline: "Dec 1, 2025",
      status: "completed",
    },
  ]

  const typeColors = {
    paper: "bg-blue-100 text-blue-700",
    code: "bg-purple-100 text-purple-700",
    notes: "bg-green-100 text-green-700",
    presentation: "bg-orange-100 text-orange-700",
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Peer Review</h1>
          <p className="text-muted-foreground">Request constructive feedback from peers and researchers</p>
        </div>
        <Button onClick={() => setShowRequestModal(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Request Review
        </Button>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-border">
        {[
          { id: "outgoing", label: "My Requests" },
          { id: "incoming", label: "Review For Me" },
          { id: "past", label: "Past Reviews" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium border-b-2 transition-all ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === "outgoing" &&
          outgoingRequests.map((request) => (
            <div
              key={request.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-semibold text-foreground text-lg">{request.artifactTitle}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${typeColors[request.type]}`}>
                      {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        request.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : request.status === "in-progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Requested by {request.requester}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> Due {request.deadline}
                    </span>
                    {request.reviewers && (
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" /> {request.reviewers} reviewers
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap sm:flex-col">
                  <Button size="sm" variant="outline">
                    Remind
                  </Button>
                  <Button size="sm">View</Button>
                </div>
              </div>
            </div>
          ))}

        {activeTab === "incoming" &&
          incomingRequests.map((request) => (
            <div
              key={request.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-semibold text-foreground text-lg">{request.artifactTitle}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${typeColors[request.type]}`}>
                      {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">From {request.requester}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> Due {request.deadline}
                    </span>
                  </div>
                </div>
                <Button size="sm">Review Now</Button>
              </div>
            </div>
          ))}

        {activeTab === "past" &&
          pastReviews.map((request) => (
            <div
              key={request.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-semibold text-foreground text-lg">{request.artifactTitle}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${typeColors[request.type]}`}>
                      {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Reviewed for {request.requester}</p>
                </div>
                <Button size="sm" variant="outline">
                  View Review
                </Button>
              </div>
            </div>
          ))}
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-card border border-border rounded-lg max-w-md w-full animate-in slide-in-from-bottom">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Request New Review</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Select Artifact</label>
                <Input placeholder="Search your artifacts..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Review Type</label>
                <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground">
                  <option>Code</option>
                  <option>Paper</option>
                  <option>Notes</option>
                  <option>Presentation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Deadline</label>
                <Input type="date" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Instructions</label>
                <textarea
                  placeholder="Specific feedback you're looking for..."
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
              </div>
              <Button className="w-full">Request Review</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
