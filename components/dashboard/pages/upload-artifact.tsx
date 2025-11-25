"use client"

import { Upload, FileText, Code, BarChart3, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export function UploadArtifactPage() {
  const [artifactType, setArtifactType] = useState("notes")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const artifactTypes = [
    { id: "notes", label: "Notes", icon: FileText },
    { id: "code", label: "Code", icon: Code },
    { id: "quiz", label: "Quiz Results", icon: BarChart3 },
    { id: "video", label: "Video", icon: Video },
  ]

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Upload Artifact</h1>
        <p className="text-muted-foreground">Upload notes, code, or recordings to verify your learning</p>
      </div>

      {/* Form */}
      <div className="bg-card border border-border rounded-lg p-8 space-y-6">
        {/* Title input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Artifact Title</label>
          <Input
            placeholder="e.g., Machine Learning Assignment 1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Artifact type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Artifact Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {artifactTypes.map((type) => {
              const Icon = type.icon
              return (
                <button
                  key={type.id}
                  onClick={() => setArtifactType(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    artifactType === type.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                  }`}
                >
                  <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <span className="text-sm font-medium text-foreground block">{type.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* File upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Upload File</label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Upload className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="font-medium text-foreground mb-1">Drag and drop your file here</p>
            <p className="text-sm text-muted-foreground mb-4">or</p>
            <Button variant="outline">Select File</Button>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Description / Context (Optional)</label>
          <Textarea
            placeholder="Add any context about this artifact..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Button className="flex-1">Submit for AI Verification</Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  )
}
