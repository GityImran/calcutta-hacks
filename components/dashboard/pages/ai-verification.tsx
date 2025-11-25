"use client"

import { Eye, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AIVerificationPage() {
  const [filter, setFilter] = useState("all")

  const artifacts = [
    {
      id: 1,
      title: "Machine Learning Assignment 1",
      type: "Code",
      score: 92,
      status: "completed",
      date: "Nov 23, 2025",
    },
    {
      id: 2,
      title: "Blockchain Study Notes",
      type: "Notes",
      score: 85,
      status: "completed",
      date: "Nov 21, 2025",
    },
    {
      id: 3,
      title: "Data Structures Quiz",
      type: "Quiz Results",
      score: null,
      status: "analyzing",
      date: "Nov 24, 2025",
    },
    {
      id: 4,
      title: "React Project Demo",
      type: "Video",
      score: 78,
      status: "completed",
      date: "Nov 20, 2025",
    },
    {
      id: 5,
      title: "Advanced Algorithms Notes",
      type: "Notes",
      score: null,
      status: "needs-attention",
      date: "Nov 18, 2025",
    },
  ]

  const filteredArtifacts = filter === "all" ? artifacts : artifacts.filter((a) => a.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50"
      case "analyzing":
        return "text-blue-600 bg-blue-50"
      case "needs-attention":
        return "text-amber-600 bg-amber-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle2
      case "analyzing":
        return Clock
      case "needs-attention":
        return AlertCircle
      default:
        return Eye
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Verification</h1>
        <p className="text-muted-foreground">View AI evaluation of your uploaded artifacts</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {["all", "completed", "analyzing", "needs-attention"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === status ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {status === "all"
              ? "All"
              : status === "completed"
                ? "Completed"
                : status === "analyzing"
                  ? "In Review"
                  : "Needs Attention"}
          </button>
        ))}
      </div>

      {/* Artifacts table/cards */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">AI Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredArtifacts.map((artifact) => {
                const StatusIcon = getStatusIcon(artifact.status)
                const statusClass = getStatusColor(artifact.status)
                return (
                  <tr key={artifact.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-foreground">{artifact.title}</p>
                        <p className="text-xs text-muted-foreground">{artifact.date}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{artifact.type}</td>
                    <td className="px-6 py-4">
                      {artifact.score ? (
                        <span className="text-sm font-semibold text-foreground">{artifact.score}%</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-2 w-fit px-3 py-1 rounded-full ${statusClass}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-xs font-medium capitalize">
                          {artifact.status === "needs-attention"
                            ? "Needs Attention"
                            : artifact.status === "analyzing"
                              ? "Analyzing"
                              : "Completed"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm">
                        View Report
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
