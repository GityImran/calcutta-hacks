"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardHome } from "@/components/dashboard/dashboard-home"
import { MyCoursesPage } from "@/components/dashboard/pages/my-courses"
import { UploadArtifactPage } from "@/components/dashboard/pages/upload-artifact"
import { AIVerificationPage } from "@/components/dashboard/pages/ai-verification"
import { VerificationRequestsPage } from "@/components/dashboard/pages/verification-requests"
import { RequestEndorsementPage } from "@/components/dashboard/pages/request-endorsement"
import { OnChainRegistryPage } from "@/components/dashboard/pages/on-chain-registry"
import { ResearchLabPage } from "@/components/dashboard/pages/research-lab"
import { PaperAnalyzerPage } from "@/components/dashboard/pages/paper-analyzer"
import { ProjectsPage } from "@/components/dashboard/pages/projects"
import { CommunityCollaborationPage } from "@/components/dashboard/pages/community-collaboration"
import { GroupStudyRoomsPage } from "@/components/dashboard/pages/group-study-rooms"
import { CommunitiesPage } from "@/components/dashboard/pages/communities"
import { PeerReviewPage } from "@/components/dashboard/pages/peer-review"

const pageComponents: { [key: string]: React.FC } = {
  dashboard: DashboardHome,
  courses: MyCoursesPage,
  upload: UploadArtifactPage,
  verification: AIVerificationPage,
  requests: VerificationRequestsPage,
  endorsement: RequestEndorsementPage,
  registry: OnChainRegistryPage,
  "research-lab": ResearchLabPage,
  "paper-analyzer": PaperAnalyzerPage,
  projects: ProjectsPage,
  community: CommunityCollaborationPage,
  "study-rooms": GroupStudyRoomsPage,
  communities: CommunitiesPage,
  "peer-review": PeerReviewPage,
}

export default function DashboardPage() {
  const [currentModule, setCurrentModule] = useState("dashboard")

  const CurrentPage = pageComponents[currentModule] || DashboardHome

  return (
    <DashboardLayout currentModule={currentModule} setCurrentModule={setCurrentModule}>
      <CurrentPage />
    </DashboardLayout>
  )
}
