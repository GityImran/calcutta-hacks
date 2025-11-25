"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export function RequestEndorsementPage() {
  const [selectedArtifact, setSelectedArtifact] = useState("")
  const [selectedEndorser, setSelectedEndorser] = useState("")
  const [message, setMessage] = useState("")

  const artifacts = [
    "Advanced Machine Learning Project",
    "Blockchain Study Notes",
    "Data Structures Quiz",
    "React Project Demo",
  ]

  const endorsers = [
    { id: 1, name: "Prof. Sarah Chen", institution: "MIT" },
    { id: 2, name: "Dr. Michael Torres", institution: "Stanford University" },
    { id: 3, name: "Prof. James Wilson", institution: "UC Berkeley" },
    { id: 4, name: "Emma Rodriguez", institution: "Harvard" },
  ]

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Request Endorsement</h1>
        <p className="text-muted-foreground">
          Request a professor or institution to endorse your skills and achievements
        </p>
      </div>

      {/* Form */}
      <div className="bg-card border border-border rounded-lg p-8 space-y-6">
        {/* Select Artifact */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Select Artifact</label>
          <select
            value={selectedArtifact}
            onChange={(e) => setSelectedArtifact(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground"
          >
            <option value="">Choose an artifact...</option>
            {artifacts.map((artifact) => (
              <option key={artifact} value={artifact}>
                {artifact}
              </option>
            ))}
          </select>
        </div>

        {/* Select Endorser */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Select Endorser</label>
          <select
            value={selectedEndorser}
            onChange={(e) => setSelectedEndorser(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground"
          >
            <option value="">Choose an endorser...</option>
            {endorsers.map((endorser) => (
              <option key={endorser.id} value={endorser.id}>
                {endorser.name} - {endorser.institution}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Message (Optional)</label>
          <Textarea
            placeholder="Add a personal message to the endorser..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Button className="flex-1">Send Request</Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Cancel
          </Button>
        </div>
      </div>

      {/* Recent Requests Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Endorsement Requests</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Prof. Sarah Chen</p>
                <p className="text-xs text-muted-foreground">Machine Learning Project • 2 days ago</p>
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Pending</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
