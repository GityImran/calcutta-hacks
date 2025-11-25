"use client"

import { Upload, FileText, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function PaperAnalyzerPage() {
  const recentAnalyses = [
    {
      id: 1,
      title: "Attention Is All You Need",
      date: "Nov 24, 2025",
      keywords: ["Transformers", "NLP", "Deep Learning"],
    },
    {
      id: 2,
      title: "BERT: Pre-training of Deep Bidirectional Transformers",
      date: "Nov 22, 2025",
      keywords: ["NLP", "Language Models", "Pre-training"],
    },
    {
      id: 3,
      title: "GPT-3: Language Models are Few-Shot Learners",
      date: "Nov 20, 2025",
      keywords: ["Language Models", "Few-shot Learning", "GPT"],
    },
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Paper Analyzer</h1>
        <p className="text-muted-foreground">Upload a research paper and get AI-powered feedback and analysis</p>
      </div>

      {/* Upload section */}
      <div className="bg-card border border-border rounded-lg p-8 mb-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-4">Upload PDF</label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Upload className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="font-medium text-foreground mb-1">Drag and drop your paper here</p>
            <p className="text-sm text-muted-foreground mb-4">or</p>
            <Button variant="outline">Select PDF</Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Specific Questions or Focus (Optional)
          </label>
          <Textarea
            placeholder="Ask specific questions about the paper or mention areas you want to focus on..."
            rows={4}
          />
        </div>

        <Button className="w-full mt-6">Analyze Paper</Button>
      </div>

      {/* Recent analyses */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Analyses</h2>
        <div className="space-y-4">
          {recentAnalyses.map((analysis) => (
            <div
              key={analysis.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{analysis.title}</h3>
                      <p className="text-xs text-muted-foreground">{analysis.date}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-2 mb-4">
                {analysis.keywords.map((keyword) => (
                  <span key={keyword} className="text-xs px-2 py-1 bg-muted rounded-full text-foreground">
                    {keyword}
                  </span>
                ))}
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <MessageCircle className="w-4 h-4" />
                View Analysis
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
