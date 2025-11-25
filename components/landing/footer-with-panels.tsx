"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

const PANEL_CONTENT = {
  about: {
    title: "About",
    html: `
      <p class="mb-2">Research Commons & POLAR — a unified ecosystem for learning, research, and verified credentials. We combine AI verification, professor endorsements, and an immutable academic registry so learners can carry verified skills across institutions and careers.</p>
      <p>Our mission: make learning verifiable, portable, and meaningful.</p>
    `,
  },
  privacy: {
    title: "Privacy Policy",
    html: `
      <p class="mb-2">We collect only the minimum personal data necessary to provide platform services (name, email, role, affiliation). User artifacts uploaded for verification are stored encrypted; you control visibility and can opt out of public display.</p>
      <p>We use DID-compatible identities and retain records required for endorsements and registry entries. For full policy details, visit the privacy page.</p>
    `,
  },
  terms: {
    title: "Terms of Use",
    html: `
      <p class="mb-2">By using this platform you agree to our terms: be responsible for your content, respect community guidelines, and do not submit plagiarized work.</p>
      <p>Endorsements are issued by institutions and recorded on a registry; the platform is not a degree issuer. For disputes, contact support.</p>
    `,
  },
  contact: {
    title: "Contact Us",
    html: `
      <p class="mb-2">Have a question, feedback, or want to partner? Send us a message and our team will respond.</p>
    `,
  },
}

interface FooterWithPanelsProps {
  onSendMessage?: (payload: {
    name: string
    email: string
    subject: string
    message: string
  }) => Promise<{ ok: boolean; message?: string }>
}

export function FooterWithPanels({ onSendMessage }: FooterWithPanelsProps) {
  const [open, setOpen] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactSubject, setContactSubject] = useState("General")
  const [contactMessage, setContactMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [sendResult, setSendResult] = useState<{ ok: boolean; message: string } | null>(null)

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 640)
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(null)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  useEffect(() => {
    if (open) {
      setTimeout(() => closeBtnRef.current?.focus(), 80)
    } else {
      triggerRef.current?.focus()
    }
  }, [open])

  function openPanel(key: string, evt: React.MouseEvent<HTMLButtonElement>) {
    triggerRef.current = evt.currentTarget
    setOpen((prev) => (prev === key ? null : key))
    setSendResult(null)
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!contactName || !contactEmail || !contactMessage) {
      setSendResult({ ok: false, message: "Please complete name, email and message." })
      return
    }
    setSending(true)
    try {
      const payload = { name: contactName, email: contactEmail, subject: contactSubject, message: contactMessage }
      const res = (await onSendMessage?.(payload)) ?? { ok: true }
      setSendResult(
        res.ok
          ? { ok: true, message: "Message sent — we'll reply soon." }
          : { ok: false, message: res.message || "Failed to send." },
      )
      if (res.ok) {
        setContactName("")
        setContactEmail("")
        setContactMessage("")
        setContactSubject("General")
      }
    } catch (err) {
      setSendResult({ ok: false, message: err instanceof Error ? err.message : "Error sending message." })
    } finally {
      setSending(false)
    }
  }

  const Panel = ({ keyName }: { keyName: string }) => {
    const content = PANEL_CONTENT[keyName as keyof typeof PANEL_CONTENT]
    if (!content) return null
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={content.title}
        className={`w-full ${isMobile ? "h-full" : "max-h-[360px]"} bg-[#FFFDFC] rounded-t-xl md:rounded-lg shadow-lg overflow-auto`}
        style={{ border: "1px solid rgba(59,59,59,0.06)" }}
      >
        <div className="flex items-start justify-between p-4 border-b" style={{ borderColor: "rgba(59,59,59,0.04)" }}>
          <h3 className="font-serif text-lg" style={{ color: "#3B3B3B" }}>
            {content.title}
          </h3>
          <div className="ml-4 flex items-center gap-2">
            {keyName === "contact" ? (
              <a href="mailto:support@researchcommons.ai" className="text-sm underline text-[#7B5A3C] hidden md:inline">
                Email support
              </a>
            ) : null}
            <button
              ref={closeBtnRef}
              onClick={() => setOpen(null)}
              aria-label="Close panel"
              className="p-2 rounded hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#7B5A3C">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4 text-sm text-[#3B3B3B]">
          <div dangerouslySetInnerHTML={{ __html: content.html }} />

          {keyName === "contact" && (
            <form onSubmit={handleSend} className="mt-4 space-y-3">
              <input
                className="w-full px-3 py-2 rounded border"
                placeholder="Your name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
              <input
                className="w-full px-3 py-2 rounded border"
                placeholder="Your email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <select
                className="w-full px-3 py-2 rounded border"
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
              >
                <option>General</option>
                <option>Partnership</option>
                <option>Bug report</option>
                <option>Institution integration</option>
              </select>
              <textarea
                className="w-full px-3 py-2 rounded border"
                rows={4}
                placeholder="Message"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
              />
              <div className="flex gap-3 items-center">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg"
                  style={{ background: "#C58B2C", color: "#fff" }}
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setContactName("")
                    setContactEmail("")
                    setContactMessage("")
                    setSendResult(null)
                  }}
                  className="px-3 py-2 rounded-lg border"
                >
                  Reset
                </button>
                {sendResult && (
                  <div className={`ml-3 text-sm ${sendResult.ok ? "text-green-700" : "text-red-700"}`}>
                    {sendResult.message}
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:bg-black/10"
          onClick={() => setOpen(null)}
          aria-hidden="true"
        />
      )}

      <div className={`fixed left-0 right-0 bottom-0 z-40 flex justify-center pointer-events-none`}>
        <div
          className={`w-full md:max-w-5xl px-4 pb-4 pointer-events-auto transition-all duration-220 ease-out`}
          style={{
            transform: open ? "translateY(0%)" : "translateY(110%)",
          }}
          aria-hidden={!open}
        >
          {open && (
            <div className={`${isMobile ? "h-screen" : ""}`}>
              <Panel keyName={open} />
            </div>
          )}
        </div>
      </div>

      <footer className="bg-[#F7EFE0] border-t" style={{ borderColor: "rgba(59,59,59,0.04)" }}>
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="font-serif text-lg" style={{ color: "#3B3B3B" }}>
              Research Commons
            </div>
            <div className="text-sm text-[#7B5A3C] hidden md:block">AI-verified learning & academic registry</div>
          </div>

          <nav className="flex items-center gap-3 text-sm" aria-label="Footer navigation">
            <button
              onClick={(e) => openPanel("about", e)}
              className="px-2 py-1 rounded hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              About
            </button>
            <button
              onClick={(e) => openPanel("privacy", e)}
              className="px-2 py-1 rounded hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              Privacy
            </button>
            <button
              onClick={(e) => openPanel("terms", e)}
              className="px-2 py-1 rounded hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              Terms
            </button>
            <button
              onClick={(e) => openPanel("contact", e)}
              className="px-2 py-1 rounded hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="text-xs text-[#7B5A3C]">© {new Date().getFullYear()} Research Commons</div>
            <div className="flex items-center gap-2">
              <a className="p-2 rounded hover:bg-amber-50" href="#" aria-label="Twitter">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#7B5A3C">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016 3s-4 7-8 7c-1.94 0-3.36-1-4.24-2.3A12.94 12.94 0 012 4s3 9 11 12c0 0 4 1 6-1 0 0 4-2 6-7a4.48 4.48 0 00-.23-1.7A7.72 7.72 0 0023 3z"
                  />
                </svg>
              </a>
              <a className="p-2 rounded hover:bg-amber-50" href="#" aria-label="LinkedIn">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#7B5A3C">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2h-1v9h-4V8h4v1a4 4 0 018 0V8zM2 9h4v12H2zM4 3a2 2 0 110 4 2 2 0 010-4z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
