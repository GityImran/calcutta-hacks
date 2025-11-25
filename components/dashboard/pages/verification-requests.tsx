"use client"

import { CheckCircle2, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function VerificationRequestsPage() {
  const [filter, setFilter] = useState("all")

  const requests = [
    {
      id: 1,
      artifactTitle: "Advanced Machine Learning Project",
      endorser: "Prof. Sarah Chen",
      institution: "MIT",
      status: "pending",
      dateSent: "Nov 24, 2025",
    },
    {
      id: 2,
      artifactTitle: "Blockchain Implementation",
      endorser: "Dr. Michael Torres",
      institution: "Stanford University",
      status: "approved",
      dateSent: "Nov 20, 2025",
      dateResolved: "Nov 22, 2025",
    },
    {
      id: 3,
      artifactTitle: "Data Analysis Report",
      endorser: "Prof. James Wilson",
      institution: "UC Berkeley",
      status: "pending",
      dateSent: "Nov 22, 2025",
    },
    {
      id: 4,
      artifactTitle: "Web Dev Portfolio",
      endorser: "Emma Rodriguez",
      institution: "Harvard",
      status: "rejected",
      dateSent: "Nov 18, 2025",
      dateResolved: "Nov 19, 2025",
    },
  ]

  const filteredRequests = filter === "all" ? requests : requests.filter((r) => r.status === filter)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return Clock
      case "approved":
        return CheckCircle2
      case "rejected":
        return XCircle
      default:
        return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-blue-600 bg-blue-50"
      case "approved":
        return "text-green-600 bg-green-50"
      case "rejected":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Verification Requests</h1>
        <p className="text-muted-foreground">Track requests sent to professors and institutions</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {["all", "pending", "approved", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === status ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Requests list */}
      <div className="space-y-4">
        {filteredRequests.map((request) => {
          const StatusIcon = getStatusIcon(request.status)
          const statusClass = getStatusColor(request.status)
          return (
            <div
              key={request.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-2">{request.artifactTitle}</h3>
                  <div className="grid sm:grid-cols-3 gap-3 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Endorser</p>
                      <p className="text-sm font-medium text-foreground">{request.endorser}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Institution</p>
                      <p className="text-sm font-medium text-foreground">{request.institution}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{request.dateResolved ? "Resolved" : "Sent"}</p>
                      <p className="text-sm font-medium text-foreground">{request.dateResolved || request.dateSent}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusClass} flex-shrink-0`}>
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-xs font-medium capitalize">{request.status}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                View Details
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
