"use client"

import { Briefcase, Users, Calendar, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ResearchLabPage() {
  const projects = [
    {
      id: 1,
      title: "AI-Powered Disease Detection",
      domain: "Healthcare AI",
      collaborators: 4,
      lastUpdated: "2 hours ago",
    },
    {
      id: 2,
      title: "Blockchain Scalability Research",
      domain: "Blockchain",
      collaborators: 3,
      lastUpdated: "1 day ago",
    },
    {
      id: 3,
      title: "Quantum Computing Algorithms",
      domain: "Quantum Computing",
      collaborators: 5,
      lastUpdated: "3 days ago",
    },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Research Lab</h1>
          <p className="text-muted-foreground">Organize and collaborate on research projects</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {/* Active Projects */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Active Research Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{project.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{project.domain}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{project.collaborators} collaborators</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Updated {project.lastUpdated}</span>
                </div>
              </div>

              <Button className="w-full">Open Project</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
