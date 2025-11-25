"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SignInModal } from "./sign-in-modal"
import { RegisterModal } from "./register-modal"
import { FooterWithPanels } from "./footer-with-panels"
import { BookOpen } from "lucide-react"
import dynamic from 'next/dynamic';

// Dynamically import the VoxelWorkspace component with SSR disabled
const VoxelWorkspace = dynamic(
  () => import('@/components/3d/VoxelWorkspace'),
  { 
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-background z-0">Loading 3D scene...</div>
  }
);

// Make sure the component is properly exported
const LandingPage = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* 3D Scene - Full viewport with enhanced visibility */}
      <div className="fixed inset-0 w-full h-full z-0">
        <VoxelWorkspace />
      </div>
      
      {/* Semi-transparent overlay */}
      <div 
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
        }}
      />
      
      {/* Main content */}
      <div className="relative z-20 w-full min-h-screen flex flex-col pointer-events-none">
        <div className="pointer-events-auto">
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center space-y-8 max-w-md w-full fade-in">
              {/* Logo and branding */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* Main headline - Simplified */}
              <div className="space-y-4">
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
        </div>
        
        <div className="pointer-events-auto">
          <FooterWithPanels onSendMessage={handleSendMessage} />
        </div>
      </div>

      {/* Modals */}
      {showSignIn && (
        <SignInModal
          isOpen={showSignIn}
          onClose={() => setShowSignIn(false)}
          onSwitchToRegister={() => {
            setShowSignIn(false);
            setShowRegister(true);
          }}
        />
      )}
      {showRegister && (
        <RegisterModal
          isOpen={showRegister}
          onClose={() => setShowRegister(false)}
          onSwitchToSignIn={() => {
            setShowRegister(false);
            setShowSignIn(true);
          }}
        />
      )}
    </div>
  );
};

export default LandingPage;
