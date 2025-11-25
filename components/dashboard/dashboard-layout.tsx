"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { TopHeader } from "./top-header"

interface DashboardLayoutProps {
  children: React.ReactNode
  currentModule: string
  setCurrentModule: (module: string) => void
}

export function DashboardLayout({ children, currentModule, setCurrentModule }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        currentModule={currentModule}
        onNavigate={(module) => {
          setCurrentModule(module)
          setMobileMenuOpen(false)
        }}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <TopHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content area */}
        <main className="flex-1 overflow-auto bg-background">
          <div className="h-full">{children}</div>
        </main>
      </div>
    </div>
  )
}
