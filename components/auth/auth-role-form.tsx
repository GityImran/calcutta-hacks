"use client"
\
import { useEffect } from "react"

import { useState } from "react"

import React from "react"
\
Create a responsive, animated Sign In / Register flow
with role selection. Visual
style: warm
cream
#F7EFE0, serif
headings, ochre
accents
#C58B2C
. Landing page must show only Sign In and Register. The Register flow should
let the
user
choose
one
role
from
a
list (Student, Teacher, Researcher, Industry, Mentor, Institution Admin — labels configurable).Role
is
required
and
will
be
shown in the
profile
card
across
the
dashboard (example: “John Doe — Student”).

Requirements
:
\
Landing page: centered Sign In / Register buttons + one-line subtitle (already done).

Clicking Register opens a modal or route
with
:
\
Basic details: Full name, Email, Password (SSO options below).

Role selection: visually prominent role cards (icon, title, one-line description). Single-select, required.

Optional institution / affiliation field (searchable dropdown).

Optional ORCID / University SSO link.

CTA: Create account & Continue (primary) + Back to Sign In (secondary).
\
Clicking Sign In opens modal/route
with Email+Password + SSO (Google / ORCID / University SSO). After sign in,
if user role
is
missing, force
a
short
role - selection
onboarding
modal
before
entering
the
dashboard.
\
After authentication, redirect to dashboard. The sidebar bottom (profile area) and top header display: avatar + Name + Role (e.g., “John Doe — Student”). All components should read the role from profile.

Role drives small UI differences (examples below): default landing widgets, suggested communities, suggested projects, and endorsement workflows (teacher roles can endorse).
\
UX microinteractions: role cards hover lift, selected card highlights ochre outline + check icon, animations subtle and reduced
for prefers-reduced-motion.
\
Accessibility
: keyboard-selectable role cards, aria-checked role, form validation, error messages, focus trap in modals.
\
Persist role to user profile (backend field role and DID claim), readable by recruiters/institutions
if user opts-in
.\
\
Deliverables: Figma screens
for Register + Sign In + role onboarding modal + dashboard
profile
area
React
component
spec
and
Tailwind
tokens.
\
2) UX flow (brief)

Landing page → Register clicked.

Register page: fill name/email/password → choose role card (Student/Teacher/Researcher/etc) → optional affiliation → Submit.

Backend creates user, issues DID, saves role (string), redirects to dashboard.

Dashboard sidebar shows profile block: avatar + Name + Role.
\
Users can edit role at any time from Edit Profile (
with confirmation)
. Changing role updates dashboard and recommendation modules.

If user signs in via SSO and no role is present, show a lightweight role-onboarding modal (one required step) before entering the dashboard.

3) Data model & API hints

User object (example):

{
  ;("id")
  : "user_abc123",
  \"did": "did:example:abcd1234",
  "name": "John Doe",
  "email": "john@example.com",
  "avatarUrl": "https://...",
  "role": "student",            // canonical lowercase role
  "roleLabel": "Student",      // human-friendly label
  "affiliation": "XYZ University",
  "orcid": "0000-0002-1825-0097",
  "createdAt": "2025-11-25T12:00:00Z"
}

\
API endpoints (examples):\

POST /api/auth/register → payload includes role. Returns user + token + did.

POST /api/auth/login

PATCH /api/users/:id → update role / profile

GET /api/users/:id → fetch profile (role included)

On-chain registry integration: when issuing endorsements or certificates, include role as part of metadata hash so endorsements from professor roles can be treated differently.

Privacy/config:

Role is public on profile by default but add a privacy toggle (showRolePublicly: boolean).

Institutional endorsement visibility only
if both sides
opt-in
.
\
4) Role-based UX examples (what changes when role = teacher vs student)

Student: default landing widgets show Recommended Courses, Find Projects, Group Study Rooms.

Teacher: show Review Requests, Endorsements, Create Course.

Researcher: prioritized Research Lab, Paper Analyzer, Project Collaboration.

Industry / Recruiter: access to Recruiter Board, candidate search.

Mentor: Mentor Requests, Office Hours.

(These are suggestions to wire recommendation logic in backend/feature flags.)

5) Microcopy (copy-ready)

Role card titles: Student / Teacher / Researcher / Industry / Mentor / Institution Admin

Role card descriptions (examples):

Student — “Learning, building projects, seeking endorsements.”

Teacher — “Endorse student work and supervise projects.”

Researcher — “Publish papers, lead research projects.”

Industry — “Post roles, recruit verified talent.”

Mentor — “Provide guidance, host office hours.”

Institution Admin — “Manage institutional endorsements and cohorts.”

Role-onboarding prompt: “Tell us who you are — this helps personalize your dashboard.”

6) React + Tailwind starter (Auth + Role selection UI)
\
Below is a compact component that implements Register
with role cards
and
Sign
In
handling.It
’s intentionally self-contained — wire it to your auth functions / API. Replace styles/colors
with your Tailwind
tokens as needed.import // AuthRoleForm.jsx\
{
  useState, useEffect
}
from
;("react")

/**
 * Minimal assumptions:\
 * - Tailwind or similar utility CSS is available.
 * - Replace `apiRegister` & `apiLogin` with your real API functions.
 * - Colors: bg-base (#F7EFE0), surface (#FFFDFC), accent (#C58B2C), sepia (#7B5A3C)
 */

const ROLE_OPTIONS = [
  { key: "student", label: "Student", desc: "Learning & building projects" },
  { key: "teacher", label: "Teacher", desc: "Teach, endorse & mentor students" },
  { key: "researcher", label: "Researcher", desc: "Lead research & publish papers" },
  { key: "industry", label: "Industry", desc: "Hire verified talent & sponsor projects" },
  { key: "mentor", label: "Mentor", desc: "Offer guidance & office hours" },
  { key: "admin", label: "Institution Admin", desc: "Manage institutional endorsements" },
]

export default function AuthRoleForm({ mode = "register", onDone = () => {} }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState(null)
  const [affiliation, setAffiliation] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function validate() {
    if (mode === "register") {
      if (!name.trim() || !email.trim() || !password.trim() || !role) {
        setError("Please complete all fields and choose a role.")
        return false
      }
    } else {
      if (!email.trim() || !password.trim()) {
        setError("Enter email and password.")
        return false
      }
    }
    setError("")
    return true
  }

  async function submit(e) {
    e?.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      if (mode === "register") {
        // replace with real API call
        const payload = { name, email, password, role, affiliation }
        // const res = await apiRegister(payload);
        console.log("register payload", payload)
        // simulation
        await new Promise((r) => setTimeout(r, 600))
        onDone({ id: "user_fake_1", name, email, role, affiliation })
      } else {
        // const res = await apiLogin({ email, password });
        await new Promise((r) => setTimeout(r, 400))
        // if logged in but no role:
        const user = { id: "user_fake_1", name: "John Doe", email, role: null, affiliation: "" }
        if (!user.role) {
          // trigger role onboarding modal in parent
          onDone({ needsRole: true, profile: user })
        } else {
          onDone(user)
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F7EFE0]">
      <form onSubmit={submit} className="w-full max-w-3xl bg-[#FFFDFC] rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-serif mb-1" style={{ color: "#3B3B3B" }}>
          {mode === "register" ? "Create account" : "Sign in"}
        </h2>
        <p className="text-sm mb-4" style={{ color: "#7B5A3C" }}>
          AI-verified learning + professor endorsements — an immutable academic registry for real skills.
        </p>

        {mode === "register" && (
          <>
            <label className="block text-sm mb-1">Full name</label>
            <input
              className="w-full mb-3 px-3 py-2 rounded-lg border"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="block text-sm mb-1">Email</label>
            <input
              className="w-full mb-3 px-3 py-2 rounded-lg border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full mb-4 px-3 py-2 rounded-lg border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        {mode === "login" && (
          <>
            <label className="block text-sm mb-1">Email</label>
            <input
              className="w-full mb-3 px-3 py-2 rounded-lg border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full mb-4 px-3 py-2 rounded-lg border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        {/* Role selection (visible in register or after login if missing) */}
        {mode === "register" && (
          <>
            <div className="mb-2 text-sm font-medium" style={{ color: "#3B3B3B" }}>
              I am a...
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {ROLE_OPTIONS.map((r) => {
                const active = role === r.key
                return (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setRole(r.key)}
                    aria-pressed={active}
                    className={`border rounded-xl p-3 text-left transition transform ${active ? "scale-102 border-[#C58B2C] bg-[#FFF9EE]" : "hover:scale-102 hover:shadow-sm"}`}
                    style={{ borderColor: active ? "#C58B2C" : "rgba(59,59,59,0.06)" }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium" style={{ color: "#3B3B3B" }}>
                          {r.label}
                        </div>
                        <div className="text-xs" style={{ color: "#7B5A3C" }}>
                          {r.desc}
                        </div>
                      </div>
                      {active && <div className="text-[#C58B2C] font-bold">✓</div>}
                    </div>
                  </button>
                )
              })}
            </div>

            <label className="block text-sm mb-1">Affiliation (optional)</label>
            <input
              className="w-full mb-4 px-3 py-2 rounded-lg border"
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
            />
          </>
        )}

        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}

        <div className="flex gap-3 items-center">
          <button
            type="submit"
            className="flex-1 py-3 rounded-lg font-medium"
            style={{ background: "#C58B2C", color: "#fff" }}
            disabled={loading}
          >
            {loading ? "Please wait..." : mode === "register" ? "Create account" : "Sign in"}
          </button>

          <button type="button" onClick={() => alert("SSO flow - implement")} className="py-3 px-4 rounded-lg border">
            Continue with SSO
          </button>
        </div>

        <div className="mt-4 text-xs text-center">
          {mode === "register" ? (
            <span>
              Already have an account?{" "}
              <button type="button" onClick={() => window.location.reload()} className="underline">
                Sign in
              </button>
            </span>
          ) : (
            <span>
              New here?{" "}
              <button type="button" onClick={() => window.location.reload()} className="underline">
                Create account
              </button>
            </span>
          )}
        </div>
      </form>
    </div>
  )
}

How
to
integrate

Use
AuthRoleForm
mode = "register"
on
the
register
route, mode=\
"login\" on sign-in.\
\
After successful register/login, ensure backend returns user profile with role. If role is missing, open a minimal role-onboarding modal using the same role cards and save via PATCH /api/users/:id.

In the app shell/sidebar, read currentUser.roleLabel and display it under the name (John Doe — Student). Also expose currentUser.role to feature flags/recommendation engine.

7) Accessibility & security notes

Ensure password rules (min length, strength) and show inline validation.

Email verification flow recommended before wider platform access (endorsements).

Use aria-label and role="listbox\" for the role cards if you implement keyboard navigation as a grouped single-select widget. Each card should have aria-checked.

Respect prefers-reduced-motion.

Protect role-change actions (audit log): when the user edits role later, store previous role and timestamp.

Consider rate-limiting SSO / register endpoints and require CAPTCHA
if abuse detected.

8
) Next steps I can produce right now (pick one)
\
Provide Edit Profile modal component that lets user change role
with confirmation and
audit.
\
Generate the Figma-friendly short prompt specifically
for the Register + role cards (export-ready).
\
Create role-based dashboard mockups
for Student / Teacher / Researcher showing small variations (John Doe — Student example).
\
