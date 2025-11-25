"use client"

import { Briefcase, Plus, Tag, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ProjectsPage() {
  const [filterRole, setFilterRole] = useState("all")

  const projects = [
    {
      id: 1,
      title: "Machine Learning Pipeline",
      tags: ["ML", "Python", "Data Science"],
      role: "Owner",
      status: "active",
      collaborators: 2,
    },
    {
      id: 2,
      title: "Decentralized Social Network",
      tags: ["Blockchain", "Web3", "Solidity"],
      role: "Collaborator",
      status: "active",
      collaborators: 4,
    },
    {
      id: 3,
      title: "Computer Vision Dashboard",
      tags: ["CV", "React", "TensorFlow"],
      role: "Owner",
      status: "paused",
      collaborators: 1,
    },
    {
      id: 4,
      title: "Real-time Chat Application",
      tags: ["Web", "JavaScript", "Firebase"],
      role: "Collaborator",
      status: "active",
      collaborators: 3,
    },
  ]

  const filteredProjects = filterRole === "all" ? projects : projects.filter((p) => p.role === filterRole)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage and showcase your personal and collaborative projects</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {["all", "Owner", "Collaborator"].map((role) => (
          <button
            key={role}
            onClick={() => setFilterRole(role)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterRole === role ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {role === "all" ? "All" : role}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all flex flex-col"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{project.title}</h3>
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-muted rounded-full text-foreground flex items-center gap-1"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Info */}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium text-foreground">{project.role}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Collaborators
                </span>
                <span className="font-medium text-foreground">{project.collaborators}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    project.status === "active" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {project.status === "active" ? "Active" : "Paused"}
                </span>
              </div>
            </div>

            <Button className="w-full mt-auto">Open Project</Button>
          </div>
        ))}
      </div>
    </div>
  )
}
