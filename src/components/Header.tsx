import React from 'react';
import { 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Coins, 
  Zap, 
  Terminal, 
  Tag, 
  Receipt, 
  TrendingUp, 
  Store, 
  FileText, 
  Info,
  Layers
} from 'lucide-react';
import { EngineMode } from '../types';

interface HeaderProps {
  activeTab: 'listing' | 'pricing' | 'receipts' | 'first-user' | 'dev-post' | 'architecture';
  setActiveTab: (tab: 'listing' | 'pricing' | 'receipts' | 'first-user' | 'dev-post' | 'architecture') => void;
  engine: EngineMode;
  setEngine: (engine: EngineMode) => void;
  savedCost: number;
  totalListingsCreated: number;
  onOpenArchModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  engine,
  setEngine,
  savedCost,
  totalListingsCreated,
  onOpenArchModal,
}) => {
  const engineLabels: Record<EngineMode, { name: string; tag: string; color: string }> = {
    'gemma-2-9b': { name: 'Gemma 2 (9B)', tag: 'Google Open-Weights', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
    'gemma-2-27b': { name: 'Gemma 2 (27B)', tag: 'High-Fidelity Open', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
    'local-edge': { name: 'Local Edge Engine', tag: '100% In-Browser Private', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
    'tabpfn-prior': { name: 'TabPFN-3.5', tag: 'Prior Labs Tabular Prior', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
    'tinker-lora': { name: 'Tinker Reseller LoRA', tag: 'Fine-Tuned Adapter', color: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
  };

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
      {/* Top Hacktoberfest notification ribbon */}
      <div className="bg-gradient-to-r from-orange-950 via-amber-950 to-zinc-900 border-b border-orange-500/20 px-4 py-1.5 text-xs text-orange-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
          <span className="font-semibold text-orange-300">Hacktoberfest 2026 Challenge 3 of 5:</span>
          <span>Week 2 Theme — <strong className="text-white underline decoration-orange-400">Side Hustle</strong></span>
          <span className="hidden md:inline text-orange-400/80">• Powered by Google Gemma &amp; TabPFN Open AI</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-zinc-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Zero Cloud Egress: <strong className="text-emerald-300">100% Private</strong>
          </span>
          <span className="text-zinc-400 flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            API Token Costs Saved: <strong className="text-amber-300">${savedCost.toFixed(2)}</strong>
          </span>
          <button
            onClick={onOpenArchModal}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 transition border border-orange-500/30"
          >
            <Info className="w-3 h-3" />
            Why Open AI Matters
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-rose-600 p-0.5 shadow-lg shadow-orange-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                OpenHustle <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono border border-amber-500/30">AI</span>
              </h1>
              <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">v2.4-edge</span>
            </div>
            <p className="text-xs text-zinc-400">Open-weight e-commerce &amp; freelance engine for micro-entrepreneurs</p>
          </div>
        </div>

        {/* Model Switcher Pill */}
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
          <Cpu className="w-4 h-4 text-zinc-400 ml-2" />
          <span className="text-xs text-zinc-400 font-medium">Model Core:</span>
          <select
            value={engine}
            onChange={(e) => setEngine(e.target.value as EngineMode)}
            className="bg-zinc-800 text-xs font-medium text-white rounded px-2.5 py-1 outline-none border border-zinc-700 hover:border-zinc-600 cursor-pointer focus:ring-1 focus:ring-amber-500"
          >
            <option value="gemma-2-9b">Google Gemma 2 (9B Open-Weight)</option>
            <option value="gemma-2-27b">Google Gemma 2 (27B Pro)</option>
            <option value="local-edge">Local Edge Engine (In-Browser / 0 Cloud)</option>
            <option value="tabpfn-prior">Prior Labs TabPFN-3.5 (Tabular Prior)</option>
            <option value="tinker-lora">Tinker LoRA Adapter (Reseller &amp; Thrift)</option>
          </select>
          <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${engineLabels[engine].color}`}>
            {engineLabels[engine].tag}
          </span>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto scrollbar-none border-t border-zinc-900">
        <button
          onClick={() => setActiveTab('listing')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition whitespace-nowrap ${
            activeTab === 'listing'
              ? 'border-amber-500 text-amber-400 bg-amber-500/5'
              : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
          }`}
        >
          <Tag className="w-3.5 h-3.5" />
          AI Listing Studio
          {totalListingsCreated > 0 && (
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono">
              {totalListingsCreated}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition whitespace-nowrap ${
            activeTab === 'pricing'
              ? 'border-purple-500 text-purple-400 bg-purple-500/5'
              : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          TabPFN Pricing &amp; Fees
          <span className="text-[10px] px-1.5 py-0.2 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">
            Prior Labs
          </span>
        </button>

        <button
          onClick={() => setActiveTab('receipts')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition whitespace-nowrap ${
            activeTab === 'receipts'
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
              : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
          }`}
        >
          <Receipt className="w-3.5 h-3.5" />
          Private Receipt &amp; Tax Sorter
          <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
            IRS Sched-C
          </span>
        </button>

        <button
          onClick={() => setActiveTab('first-user')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition whitespace-nowrap ${
            activeTab === 'first-user'
              ? 'border-rose-500 text-rose-400 bg-rose-500/5'
              : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
          }`}
        >
          <Store className="w-3.5 h-3.5" />
          First Customer Simulator
          <span className="text-[10px] px-1.5 py-0.2 bg-rose-500/20 text-rose-300 rounded-full animate-pulse">
            Bonus Points
          </span>
        </button>

        <button
          onClick={() => setActiveTab('dev-post')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition whitespace-nowrap ${
            activeTab === 'dev-post'
              ? 'border-blue-500 text-blue-400 bg-blue-500/5'
              : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          DEV.to Post Generator
          <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30 font-mono">
            #hf26challenge
          </span>
        </button>

        <button
          onClick={() => setActiveTab('architecture')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition whitespace-nowrap ${
            activeTab === 'architecture'
              ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5'
              : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Open Architecture &amp; Benchmarks
        </button>
      </div>
    </header>
  );
};
