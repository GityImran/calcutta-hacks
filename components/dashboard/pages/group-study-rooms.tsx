"use client"

import { Plus, MessageCircle, Mic, Share2, Sparkles, Filter, Users, Lock, Globe, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface StudyRoom {
  id: number
  name: string
  host: string
  topic: string[]
  participants: number
  status: "live" | "scheduled" | "offline"
  privacy: "public" | "invite" | "private"
  aiEnabled: boolean
}

export function GroupStudyRoomsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<StudyRoom | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const rooms: StudyRoom[] = [
    {
      id: 1,
      name: "Advanced ML Study",
      host: "Dr. Sarah Chen",
      topic: ["machine-learning", "ai"],
      participants: 12,
      status: "live",
      privacy: "public",
      aiEnabled: true,
    },
    {
      id: 2,
      name: "React Workshop",
      host: "Emma Rodriguez",
      topic: ["web-dev", "react"],
      participants: 8,
      status: "live",
      privacy: "public",
      aiEnabled: false,
    },
    {
      id: 3,
      name: "Blockchain Deep Dive",
      host: "Prof. Torres",
      topic: ["blockchain", "crypto"],
      participants: 0,
      status: "scheduled",
      privacy: "invite",
      aiEnabled: true,
    },
    {
      id: 4,
      name: "Algorithms Exam Prep",
      host: "James Wilson",
      topic: ["algorithms", "dsa"],
      participants: 5,
      status: "live",
      privacy: "public",
      aiEnabled: true,
    },
  ]

  const templates = [
    { id: 1, name: "Exam Prep", icon: "📚" },
    { id: 2, name: "Code Review", icon: "💻" },
    { id: 3, name: "Paper Discussion", icon: "📄" },
  ]

  const filteredRooms = rooms.filter((room) => {
    if (filterStatus === "all") return true
    return room.status === filterStatus
  })

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Group Study Rooms</h1>
        <p className="text-muted-foreground mb-6">
          Create or join rooms for focused study — supports voice, text, screen share, and AI helper.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Room
          </Button>
        </div>
      </div>

      {/* Templates */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Templates</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-md transition-all hover:scale-[1.02]"
            >
              <span className="text-2xl mb-2 block">{template.icon}</span>
              <p className="font-medium text-sm text-foreground">{template.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input placeholder="Search rooms..." className="w-full" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Status Filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {["all", "live", "scheduled", "offline"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterStatus === status
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Rooms List */}
      <div className="space-y-3 mb-8">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all hover:scale-[1.01]"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
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
                    <span className={`w-2 h-2 rounded-full ${room.status === "live" ? "bg-red-500" : "bg-gray-500"}`} />
                    {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                  </span>
                  {room.aiEnabled && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-medium">
                      <Sparkles className="w-3 h-3" /> AI
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-2">Host: {room.host}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    {room.privacy === "public" ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    {room.privacy.charAt(0).toUpperCase() + room.privacy.slice(1)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> {room.participants} participants
                  </span>
                  <div className="flex gap-1 flex-wrap">
                    {room.topic.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-muted rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Button onClick={() => setSelectedRoom(room)} size="sm" className="w-full md:w-auto">
                {room.status === "live" ? "Join Room" : "View Details"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">{selectedRoom.name}</h2>
              <button onClick={() => setSelectedRoom(null)} className="p-1 hover:bg-muted rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: MessageCircle, label: "Chat", color: "text-blue-600" },
                  { icon: Mic, label: "Voice", color: "text-green-600" },
                  { icon: Share2, label: "Screen", color: "text-orange-600" },
                  { icon: Sparkles, label: "AI Tools", color: "text-purple-600" },
                ].map(({ icon: Icon, label, color }) => (
                  <button
                    key={label}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <Icon className={`w-6 h-6 ${color}`} />
                    <span className="text-xs font-medium text-foreground">{label}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Host</p>
                  <p className="font-medium text-foreground">{selectedRoom.host}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Participants</p>
                  <p className="font-medium text-foreground">{selectedRoom.participants}</p>
                </div>
              </div>

              <Button className="w-full" size="lg">
                {selectedRoom.status === "live" ? "Join Now" : "Reserve Spot"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Room Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-card border border-border rounded-lg max-w-md w-full animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Create Study Room</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Room Name</label>
                <Input placeholder="e.g., ML Study Session" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Topics</label>
                <Input placeholder="machine-learning, ai" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Privacy</label>
                <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground">
                  <option>Public</option>
                  <option>Invite Only</option>
                  <option>Private</option>
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border" />
                <span className="text-sm text-foreground">Enable AI Assistant</span>
              </label>
              <Button className="w-full">Create Room</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
