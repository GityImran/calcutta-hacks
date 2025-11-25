"use client"

import { ExternalLink, Copy, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function OnChainRegistryPage() {
  const registeredItems = [
    {
      id: 1,
      name: "Advanced Machine Learning",
      issuer: "MIT",
      status: "verified",
      txHash: "0x1234...5678",
      date: "Nov 22, 2025",
    },
    {
      id: 2,
      name: "Blockchain Fundamentals",
      issuer: "Stanford University",
      status: "verified",
      txHash: "0x9abc...def0",
      date: "Nov 20, 2025",
    },
    {
      id: 3,
      name: "Data Structures Mastery",
      issuer: "UC Berkeley",
      status: "verified",
      txHash: "0x2def...4567",
      date: "Nov 18, 2025",
    },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">On-Chain Registry</h1>
        <p className="text-muted-foreground">
          View your verified skills and endorsements on the immutable academic registry
        </p>
      </div>

      {/* Registry items */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {registeredItems.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{item.issuer}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-muted px-2 py-1 rounded flex-1 truncate">{item.txHash}</code>
                  <button className="p-1 hover:bg-muted rounded transition-colors">
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Issued on</p>
                <p className="text-sm font-medium text-foreground">{item.date}</p>
              </div>
            </div>

            <Button className="w-full bg-transparent" variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Explorer
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
