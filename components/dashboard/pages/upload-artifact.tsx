"use client"

import { Upload, FileText, Code, BarChart3, Video, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useRef } from "react"
import { toast } from "sonner"

interface VideoNotes {
  title?: string
  summary: string
  key_points: string[]
  timeline?: Array<{ time: string; note: string }>
}

export function UploadArtifactPage() {
  const [artifactType, setArtifactType] = useState("video")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [videoNotes, setVideoNotes] = useState<VideoNotes | null>(null)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const artifactTypes = [
    { id: "notes", label: "Notes", icon: FileText },
    { id: "code", label: "Code", icon: Code },
    { id: "quiz", label: "Quiz Results", icon: BarChart3 },
    { id: "video", label: "Video", icon: Video },
  ]

  const processVideo = async (url: string) => {
    if (!url.trim()) {
      setError("Please enter a valid video URL")
      toast.error("Invalid URL")
      return
    }

    setIsLoading(true)
    setError("")
    setVideoNotes(null)

    try {
      const response = await fetch("/api/video-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to process video")
      }

      const notes: VideoNotes = await response.json()
      setVideoNotes(notes)
      toast.success("Video processed successfully!")
    } catch (err: any) {
      const errorMsg = err.message || "Failed to process video"
      setError(errorMsg)
      toast.error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (artifactType === "video") {
      if (!videoUrl.trim()) {
        toast.error("Please enter a video URL")
        return
      }
      await processVideo(videoUrl)
    } else {
      toast.info("Other artifact types coming soon")
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Upload Artifact</h1>
        <p className="text-muted-foreground">Upload videos to generate AI-powered notes and summaries</p>
      </div>

      {/* Form */}
      <div className="bg-card border border-border rounded-lg p-8 space-y-6">
        {/* Title input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Artifact Title</label>
          <Input
            placeholder="e.g., Machine Learning Lecture 1"
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

        {/* Video URL input */}
        {artifactType === "video" && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Audio/Video URL</label>
            <div className="space-y-3">
              <Input
                placeholder="e.g., https://example.com/audio.mp3 or direct media URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">Paste a direct link to an audio or video file (MP3, MP4, WebM, etc.)</p>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-destructive">Error</p>
              <p className="text-sm text-destructive/80">{error}</p>
            </div>
          </div>
        )}

        {/* Video Notes Display */}
        {videoNotes && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Generated Notes</h3>
            </div>

            {videoNotes.title && (
              <div>
                <h4 className="font-medium text-foreground mb-1">Title</h4>
                <p className="text-sm text-muted-foreground">{videoNotes.title}</p>
              </div>
            )}

            <div>
              <h4 className="font-medium text-foreground mb-2">Summary</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{videoNotes.summary}</p>
            </div>

            {videoNotes.key_points.length > 0 && (
              <div>
                <h4 className="font-medium text-foreground mb-2">Key Points</h4>
                <ul className="space-y-1">
                  {videoNotes.key_points.map((point, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {videoNotes.timeline && videoNotes.timeline.length > 0 && (
              <div>
                <h4 className="font-medium text-foreground mb-2">Timeline</h4>
                <div className="space-y-2">
                  {videoNotes.timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-3 text-sm">
                      <span className="font-mono text-primary font-medium min-w-fit">{item.time}</span>
                      <span className="text-muted-foreground">{item.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Description / Context (Optional)</label>
          <Textarea
            placeholder="Add any context about this artifact..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            disabled={isLoading}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            className="flex-1"
            onClick={handleSubmit}
            disabled={isLoading || (artifactType === "video" && !videoUrl.trim())}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Submit for AI Verification"
            )}
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent" disabled={isLoading}>
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  )
}
