"use client"

import { BookOpen, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function MyCoursesPage() {
  const [filterStatus, setFilterStatus] = useState("all")

  const courses = [
    {
      id: 1,
      name: "Advanced Machine Learning",
      instructor: "Dr. Sarah Chen",
      progress: 75,
      status: "in-progress",
      dueDate: "Dec 15, 2025",
    },
    {
      id: 2,
      name: "Blockchain Fundamentals",
      instructor: "Prof. Michael Torres",
      progress: 45,
      status: "in-progress",
      dueDate: "Jan 10, 2026",
    },
    {
      id: 3,
      name: "Data Structures & Algorithms",
      instructor: "Dr. James Wilson",
      progress: 100,
      status: "completed",
      completedDate: "Nov 20, 2025",
    },
    {
      id: 4,
      name: "Web Development with React",
      instructor: "Emma Rodriguez",
      progress: 30,
      status: "in-progress",
      dueDate: "Dec 1, 2025",
    },
  ]

  const filteredCourses = filterStatus === "all" ? courses : courses.filter((c) => c.status === filterStatus)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Courses</h1>
        <p className="text-muted-foreground">Track your learning progress across all courses</p>
      </div>

      {/* Search and filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Input placeholder="Search courses..." className="flex-1" />
        <div className="flex gap-2 flex-wrap">
          {["all", "in-progress", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {status === "all" ? "All" : status === "in-progress" ? "In Progress" : "Completed"}
            </button>
          ))}
        </div>
      </div>

      {/* Courses grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{course.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{course.instructor}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-foreground">Progress</span>
                <span className="text-xs text-muted-foreground">{course.progress}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${course.progress}%` }} />
              </div>
            </div>

            {/* Date info */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <Clock className="w-4 h-4" />
              {course.status === "completed" ? (
                <span>Completed on {course.completedDate}</span>
              ) : (
                <span>Due {course.dueDate}</span>
              )}
            </div>

            {/* Action button */}
            <Button className="w-full" variant={course.status === "completed" ? "outline" : "default"}>
              {course.status === "completed" ? "View Certificate" : "Continue"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
