"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignIn: () => void
}

const ROLE_OPTIONS = [
  { key: "student", label: "Student", desc: "Learning & building projects" },
  { key: "teacher", label: "Teacher", desc: "Teach, endorse & mentor students" },
  { key: "researcher", label: "Researcher", desc: "Lead research & publish papers" },
  { key: "industry", label: "Industry", desc: "Hire talent & sponsor projects" },
  { key: "mentor", label: "Mentor", desc: "Guide & support learners" },
  { key: "institution_admin", label: "Institution Admin", desc: "Manage institution accounts" },
]

export function RegisterModal({ isOpen, onClose, onSwitchToSignIn }: RegisterModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState<string | null>(null)
  const [affiliation, setAffiliation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }
    // Navigate to dashboard
    window.location.href = "/dashboard"
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto py-10">
      <div className="bg-card rounded-xl shadow-xl max-w-md w-full border border-border flex flex-col max-h-[90vh] my-8">
        {/* Fixed Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-border bg-card sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
                minLength={8}
              />
              <p className="mt-1 text-xs text-muted-foreground">Must be at least 8 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
                minLength={8}
              />
            </div>

            <div className="pt-2">
              <p className="block text-sm font-medium text-foreground mb-3">
                I am a... <span className="text-red-500">*</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROLE_OPTIONS.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setRole(item.key)}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      role === item.key
                        ? 'border-[#C58B2C] bg-[#FFF9EE] ring-2 ring-[#C58B2C]/20'
                        : 'border-gray-200 hover:border-[#C58B2C]/50 hover:bg-[#FFFDFA]'
                    }`}
                    aria-pressed={role === item.key}
                  >
                    <div className="font-medium text-foreground">{item.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="affiliation" className="block text-sm font-medium text-foreground mb-2">
                Affiliation (optional)
              </label>
              <input
                id="affiliation"
                type="text"
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
                placeholder="Your school, company, or organization"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full py-3.5 px-6 bg-[#C58B2C] hover:bg-[#B37D24] text-white font-medium text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C58B2C] focus:ring-offset-2 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-md hover:shadow-lg"
                disabled={isLoading || !role}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : 'Create Account'}
              </Button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button onClick={onSwitchToSignIn} className="text-primary font-medium hover:underline">
            Sign in here
          </button>
        </div>
      </div>
    </div>
  )
}
