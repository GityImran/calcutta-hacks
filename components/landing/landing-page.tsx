"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SignInModal } from "./sign-in-modal"
import { RegisterModal } from "./register-modal"
import { BookOpen } from "lucide-react"

export function LandingPage() {
  const [showSignIn, setShowSignIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const handleSendMessage = async (payload: {
    name: string
    email: string
    subject: string
    message: string
  }) => {
    try {
      // Replace with your actual API endpoint
      console.log("Sending message:", payload)
      // const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(payload) })
      // return await response.json()
      return { ok: true }
    } catch (err) {
      return { ok: false, message: "Failed to send message" }
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-accent/5" />
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 flex-1">
        <div className="text-center space-y-8 max-w-md fade-in">
          {/* Logo and branding */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Main headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
              Research.
              <br />
              Learn.
              <br />
              Verify.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AI-verified learning + professor endorsements — an immutable academic registry for real skills.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              onClick={() => setShowSignIn(true)}
              className="px-8 py-6 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all hover:scale-105 hover:shadow-lg"
            >
              Sign In
            </Button>
            <Button
              onClick={() => setShowRegister(true)}
              variant="outline"
              className="px-8 py-6 text-base font-medium border-2 border-secondary text-secondary hover:bg-secondary/10 rounded-lg transition-all hover:scale-105"
            >
              Register
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showSignIn && (
        <SignInModal
          isOpen={showSignIn}
          onClose={() => setShowSignIn(false)}
          onSwitchToRegister={() => {
            setShowSignIn(false)
            setShowRegister(true)
          }}
        />
      )}
      {showRegister && (
        <RegisterModal
          isOpen={showRegister}
          onClose={() => setShowRegister(false)}
          onSwitchToSignIn={() => {
            setShowRegister(false)
            setShowSignIn(true)
          }}
        />
      )}
    </div>
  )
}
