"use client"

import { useState, useRef, useEffect } from "react"
import { User, Edit2, Settings, LogOut } from "lucide-react"

interface ProfileMenuProps {
  user?: {
    name: string
    role: string
    avatar?: string | null
  }
}

export function ProfileMenu({ user = { name: "John Doe", role: "Student", avatar: null } }: ProfileMenuProps) {
  const [open, setOpen] = useState(false)
  const [mobileSheet, setMobileSheet] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleDocClick)
    return () => document.removeEventListener("mousedown", handleDocClick)
  }, [open])

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false)
        setMobileSheet(false)
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [])

  const initials = user.name
    ? user.name
        .split(" ")
        .map((s) => s[0])
        .slice(0, 2)
        .join("")
    : "JD"

  const handleViewProfile = () => {
    console.log("View profile clicked")
    setOpen(false)
    setMobileSheet(false)
  }

  const handleEditProfile = () => {
    console.log("Edit profile clicked")
    setOpen(false)
    setMobileSheet(false)
  }

  const handleSettings = () => {
    console.log("Settings clicked")
    setOpen(false)
    setMobileSheet(false)
  }

  const handleLogout = () => {
    console.log("Logout clicked")
    setOpen(false)
    setMobileSheet(false)
  }

  const handleMenuToggle = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setMobileSheet(true)
    } else {
      setOpen(!open)
    }
  }

  return (
    <>
      {/* Button */}
      <button
        ref={buttonRef}
        onClick={handleMenuToggle}
        aria-haspopup="true"
        aria-expanded={open || mobileSheet}
        className="flex items-center gap-3 p-2 rounded-xl hover:scale-[1.02] transition-transform duration-180 focus:outline-none focus:ring-4"
        style={{ focusRingColor: "rgba(197,139,44,0.18)" }}
        title="Profile menu"
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0"
          style={{
            background: "linear-gradient(180deg, #FFFDFC 0%, #F7F6F0 100%)",
            boxShadow: "0 2px 6px rgba(59,59,59,0.06)",
            color: "#7B5A3C",
          }}
        >
          {user.avatar ? (
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={`${user.name} avatar`}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        {/* Name and role - hidden on mobile */}
        <div className="hidden md:flex md:flex-col text-left">
          <span className="text-sm font-semibold" style={{ color: "#3B3B3B" }}>
            {user.name}
          </span>
          <span className="text-xs" style={{ color: "#7B5A3C" }}>
            {user.role}
          </span>
        </div>
      </button>

      {/* Desktop Dropdown Menu */}
      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Profile menu"
          className="absolute left-0 bottom-full mb-3 w-56 rounded-xl shadow-lg p-2 z-50"
          style={{
            background: "#FFFDFC",
            animation: "menuIn 200ms ease forwards",
          }}
        >
          <div className="px-2 py-2 space-y-1">
            {/* View Profile */}
            <button
              onClick={handleViewProfile}
              role="menuitem"
              className="w-full text-left px-3 py-2 rounded-lg transition-colors duration-150"
              style={{
                color: "#3B3B3B",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(197,139,44,0.08)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5" style={{ color: "#7B5A3C", stroke: "#7B5A3C" }} strokeWidth={1.5} />
                <div>
                  <div className="text-sm font-medium">View Profile</div>
                  <div className="text-xs" style={{ color: "#7B5A3C" }}>
                    See your profile & transcripts
                  </div>
                </div>
              </div>
            </button>

            {/* Edit Profile */}
            <button
              onClick={handleEditProfile}
              role="menuitem"
              className="w-full text-left px-3 py-2 rounded-lg transition-colors duration-150"
              style={{
                color: "#3B3B3B",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(197,139,44,0.08)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              <div className="flex items-center gap-3">
                <Edit2 className="w-5 h-5" style={{ color: "#7B5A3C", stroke: "#7B5A3C" }} strokeWidth={1.5} />
                <div className="text-sm font-medium">Edit Profile</div>
              </div>
            </button>

            {/* Settings */}
            <button
              onClick={handleSettings}
              role="menuitem"
              className="w-full text-left px-3 py-2 rounded-lg transition-colors duration-150"
              style={{
                color: "#3B3B3B",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(197,139,44,0.08)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5" style={{ color: "#7B5A3C", stroke: "#7B5A3C" }} strokeWidth={1.5} />
                <div className="text-sm font-medium">Settings</div>
              </div>
            </button>

            {/* Divider */}
            <div style={{ borderColor: "rgba(59,59,59,0.06)" }} className="border-t my-2" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              role="menuitem"
              className="w-full text-left px-3 py-2 rounded-lg transition-colors duration-150"
              style={{
                color: "#C0582C",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(192,88,44,0.08)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5" style={{ color: "#C0582C", stroke: "#C0582C" }} strokeWidth={1.5} />
                <div className="text-sm font-medium">Logout</div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Sheet */}
      {mobileSheet && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Profile menu"
        >
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.3)" }}
            onClick={() => setMobileSheet(false)}
          />

          <div
            className="w-full rounded-t-xl p-4"
            style={{
              background: "#FFFDFC",
              boxShadow: "0 -12px 30px rgba(59,59,59,0.12)",
              animation: "sheetIn 220ms ease forwards",
            }}
          >
            <div className="mx-auto max-w-xl">
              {/* User info */}
              <div
                className="flex items-center gap-3 mb-6 pb-4 border-b"
                style={{ borderColor: "rgba(59,59,59,0.06)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#FBF6EF", color: "#7B5A3C" }}
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="font-medium">{initials}</span>
                  )}
                </div>
                <div>
                  <div className="text-base font-semibold" style={{ color: "#3B3B3B" }}>
                    {user.name}
                  </div>
                  <div className="text-sm" style={{ color: "#7B5A3C" }}>
                    {user.role}
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    handleViewProfile()
                  }}
                  className="w-full py-3 px-4 rounded-lg text-left font-medium transition-colors duration-150"
                  style={{ color: "#3B3B3B", background: "transparent" }}
                  onTouchEnd={() => setMobileSheet(false)}
                >
                  View Profile
                </button>

                <button
                  onClick={() => {
                    handleEditProfile()
                  }}
                  className="w-full py-3 px-4 rounded-lg text-left font-medium transition-colors duration-150"
                  style={{ color: "#3B3B3B", background: "transparent" }}
                  onTouchEnd={() => setMobileSheet(false)}
                >
                  Edit Profile
                </button>

                <button
                  onClick={() => {
                    handleSettings()
                  }}
                  className="w-full py-3 px-4 rounded-lg text-left font-medium transition-colors duration-150"
                  style={{ color: "#3B3B3B", background: "transparent" }}
                  onTouchEnd={() => setMobileSheet(false)}
                >
                  Settings
                </button>

                <button
                  onClick={() => {
                    handleLogout()
                  }}
                  className="w-full py-3 px-4 rounded-lg text-left font-medium transition-colors duration-150 mt-4"
                  style={{ color: "#C0582C", background: "transparent" }}
                  onTouchEnd={() => setMobileSheet(false)}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes menuIn {
          from {
            opacity: 0;
            transform: translateY(6px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes sheetIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
