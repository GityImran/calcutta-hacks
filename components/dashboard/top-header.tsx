"use client"

import { Search, Bell, Menu, Plus, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProfileMenu } from "./profile-menu"

interface TopHeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export function TopHeader({ sidebarOpen, onToggleSidebar }: TopHeaderProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onToggleSidebar} className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Menu className="w-5 h-5 text-foreground" />
        </button>

        {/* Search bar */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-muted border border-border flex-1 max-w-sm">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses, projects..."
            className="bg-transparent outline-none text-sm text-foreground placeholder-muted-foreground w-full"
          />
          <span className="text-xs text-muted-foreground">⌘K</span>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <Button variant="outline" className="hidden sm:flex items-center gap-2 bg-transparent">
          <Plus className="w-4 h-4" />
          <span>Upload</span>
        </Button>

        <Button variant="outline" className="hidden sm:flex items-center gap-2 bg-transparent">
          <Share2 className="w-4 h-4" />
          <span>Endorse</span>
        </Button>

        <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="ml-2">
          <ProfileMenu
            user={{
              name: "John Doe",
              role: "Student",
              avatar: null,
            }}
          />
        </div>
      </div>
    </header>
  )
}
