import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  ExternalLink, 
  RefreshCw, 
  Code2, 
  Eye, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_DEV_POST } from '../data/presets';

interface DevPostGeneratorProps {
  customUserStory?: string;
}

export const DevPostGenerator: React.FC<DevPostGeneratorProps> = ({
  customUserStory,
}) => {
  const [markdown, setMarkdown] = useState<string>(() => {
    if (customUserStory) {
      return INITIAL_DEV_POST.replace(
        /## 🎯 Landing My First User: Maya's 90s Vintage Shop[\s\S]*?## 🏆 Partner Integrations Used/,
        `## 🎯 Landing My First User: Maya's 90s Vintage Shop\n\n${customUserStory}\n\n---\n\n## 🏆 Partner Integrations Used`
      );
    }
    return INITIAL_DEV_POST;
  });

  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');

  const partnerPrizes = [
    { name: 'Gemma ($200 Featured)', desc: "Google's open-weight model for edge generation", checked: true },
    { name: 'TabPFN ($200 Featured)', desc: "Prior Labs' tabular foundation model for pricing", checked: true },
    { name: 'Tinker ($200 Featured)', desc: 'Thinking Machines fine-tuned thrift LoRA adapter', checked: true },
    { name: 'Sentry ($100)', desc: 'Latency, token cost & prompt execution traces', checked: true },
    { name: 'Render ($200)', desc: 'Full-stack AI runtime and web service hosting', checked: true },
    { name: '.tech Domains ($100)', desc: 'Live deployment on openhustle.tech', checked: true },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Hacktoberfest_Week2_OpenHustle_DEV_Post.md';
    a.click();
  };

  const handleRegenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-dev-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectTitle: 'OpenHustle AI',
          hustleType: 'Open-Weight E-Commerce & Freelance Studio',
          firstCustomerNotes: customUserStory || 'Validated with Maya on 3 vintage items; first sale completed in hours.',
        }),
      });
      const data = await response.json();
      if (data.success && data.markdown) {
        setMarkdown(data.markdown);
      }
    } catch (e) {
      console.error('Error generating DEV post:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/60 via-zinc-900 to-zinc-900 border border-blue-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
              OFFICIAL SUBMISSION TEMPLATE READY
            </span>
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              Hacktoberfest 2026: Week 2 DEV Challenge Writeup
            </h2>
          </div>
          <p className="text-xs text-zinc-300 max-w-2xl">
            Writing Quality is the <strong>#1 weighted judging criterion</strong>. This article is pre-structured with technical architecture breakdowns, unit-economic math, first-user case study, and partner technology tags ready to publish directly on DEV.to.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-600/20 transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Markdown!' : 'Copy for DEV.to'}</span>
          </button>
          <a
            href="https://dev.to/new"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 border border-zinc-700 transition"
          >
            <span>Open DEV.to/new</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
        </div>
      </div>

      {/* Partner Category Checklist */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Eligible Partner Prize Categories ($1,000+ Potential Pool)
          </h3>
          <span className="text-[10px] font-mono text-zinc-400">
            All documented in write-up
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {partnerPrizes.map((p, idx) => (
            <div
              key={idx}
              className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 flex items-start gap-2"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-semibold text-zinc-200">{p.name}</div>
                <div className="text-[9px] text-zinc-500 leading-tight mt-0.5">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor & Preview Toolbar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg">
        <div className="px-4 py-2.5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 rounded font-medium transition flex items-center gap-1.5 ${
                viewMode === 'preview'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Article Preview
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`px-3 py-1 rounded font-medium transition flex items-center gap-1.5 ${
                viewMode === 'raw'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Raw Markdown
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRegenerate}
              disabled={isGenerating}
              className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition flex items-center gap-1.5 border border-zinc-700 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Refining...' : 'Regenerate Article'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition flex items-center gap-1.5 border border-zinc-700 cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>Download .md</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-[580px] overflow-y-auto">
          {viewMode === 'raw' ? (
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-[500px] bg-zinc-950 font-mono text-xs text-zinc-300 p-4 rounded-lg border border-zinc-800 focus:outline-none focus:border-blue-500 leading-relaxed resize-none"
            />
          ) : (
            <div className="prose prose-invert max-w-none text-zinc-300 text-xs sm:text-sm leading-relaxed space-y-4">
              <div className="p-3 bg-blue-950/20 border border-blue-500/20 rounded-lg text-xs text-blue-200 font-mono">
                Tags: #devchallenge, #hf26challenge, #opensource, #gemma, #sidehustle
              </div>
              <div className="space-y-4 whitespace-pre-line leading-relaxed font-sans">
                {markdown}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
