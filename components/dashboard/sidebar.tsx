"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  Upload,
  CheckCircle2,
  Share2,
  BarChart3,
  Users,
  FileText,
  Briefcase,
  ChevronDown,
  Search,
  LogOut,
} from "lucide-react"
import { ProfileMenu } from "./profile-menu"

interface SidebarProps {
  isOpen: boolean
  currentModule: string
  onNavigate: (module: string) => void
}

const menuSections = [
  {
    title: "Learning & Skill Development",
    items: [
      { id: "dashboard", label: "Dashboard", icon: BarChart3 },
      { id: "courses", label: "My Courses", icon: BookOpen },
      { id: "upload", label: "Upload Artifact", icon: Upload },
    ],
  },
  {
    title: "Academic Verification & Registry",
    items: [
      { id: "verification", label: "AI Verification", icon: CheckCircle2 },
      { id: "requests", label: "Verification Requests", icon: FileText },
      { id: "endorsement", label: "Request Endorsement", icon: Share2 },
      { id: "registry", label: "On-Chain Registry", icon: BookOpen },
    ],
  },
  {
    title: "Community & Collaboration",
    items: [
      { id: "study-rooms", label: "Group Study Rooms", icon: Users },
      { id: "communities", label: "Communities", icon: Users },
      { id: "peer-review", label: "Peer Review", icon: CheckCircle2 },
    ],
  },
  {
    title: "Research Ecosystem",
    items: [
      { id: "research-lab", label: "Research Lab", icon: Briefcase },
      { id: "paper-analyzer", label: "Paper Analyzer", icon: FileText },
      { id: "projects", label: "Projects", icon: Briefcase },
    ],
  },
]

export function Sidebar({ isOpen, currentModule, onNavigate }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Learning & Skill Development"])
  const router = useRouter()

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <aside
      className={`${
        isOpen ? "w-80" : "w-20"
      } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col h-full overflow-hidden`}
    >
      {/* Logo section */}
      <div className="p-4 border-b border-sidebar-border flex items-center gap-3">
        <div className="p-2 bg-sidebar-primary/20 rounded-lg flex-shrink-0">
          <BookOpen className="w-5 h-5 text-sidebar-primary" />
        </div>
        {isOpen && (
          <div className="min-w-0">
            <h2 className="font-bold text-sidebar-foreground text-sm truncate">Academic Registry</h2>
          </div>
        )}
      </div>

      {/* Search section */}
      {isOpen && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent/50 border border-sidebar-border">
            <Search className="w-4 h-4 text-sidebar-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-xs text-sidebar-foreground placeholder-sidebar-muted-foreground w-full"
            />
          </div>
        </div>
      )}

      {/* Navigation sections */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
        {menuSections.map((section) => (
          <div key={section.title}>
            {isOpen && (
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-sidebar-muted-foreground hover:text-sidebar-foreground transition-colors"
              >
                <span className="truncate">{section.title}</span>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 transition-transform ${
                    expandedSections.includes(section.title) ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
            {(!isOpen || expandedSections.includes(section.title)) && (
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = currentModule === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
                      }`}
                      title={!isOpen ? item.label : undefined}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {isOpen && <span className="truncate">{item.label}</span>}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Logout button section */}
      <div className="p-2 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-red-100 hover:text-red-700 transition-colors"
          title={!isOpen ? "Logout" : undefined}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {isOpen && <span className="truncate">Logout</span>}
        </button>
      </div>

      {/* Profile section */}
      <div className="p-4 border-t border-sidebar-border">
        <ProfileMenu
          user={{
            name: "John Doe",
            role: "Student",
            avatar: null,
          }}
        />
      </div>
    </aside>
  )
}
