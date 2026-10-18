import React from 'react';
import { X, ShieldCheck, Database, Cpu, Coins, Sparkles, CheckCircle2 } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white">
              Why Open Innovation Matters for Side Hustlers
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
          <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-1">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5 text-sm">
              <Coins className="w-4 h-4" />
              1. The Unit Economics of Micro-Businesses
            </div>
            <p>
              When an item sells for $20 or $40 on eBay or Etsy, a closed API charging $0.05 per vision request eats 5-15% of your net profits. OpenHustle uses Google Gemma 2 and TabPFN open weights, reducing the marginal cost to <strong>$0.00</strong>. At 300 listings a month, that's $180/year saved directly into the founder's pocket.
            </p>
          </div>

          <div className="p-3 bg-purple-950/20 border border-purple-500/30 rounded-xl space-y-1">
            <div className="font-bold text-purple-400 flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4" />
              2. 100% Client &amp; Vendor Data Sovereignty
            </div>
            <p>
              Receipts from estate liquidators and supplier purchase orders contain sensitive pricing edges and confidential client details. By processing OCR and Schedule C tax mapping on the local edge, no proprietary financial data ever leaves your computer.
            </p>
          </div>

          <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-1">
            <div className="font-bold text-amber-400 flex items-center gap-1.5 text-sm">
              <Database className="w-4 h-4" />
              3. TabPFN Bayesian Clearance Predictions
            </div>
            <p>
              Generic closed LLMs hallucinate prices without market grounding. Prior Labs' TabPFN tabular foundation model performs real in-context regression over tabular attributes (brand tier, condition grade, photos, shipping options) to give real clearance prices and velocity curves.
            </p>
          </div>

          <div className="p-3 bg-rose-950/20 border border-rose-500/30 rounded-xl space-y-1">
            <div className="font-bold text-rose-400 flex items-center gap-1.5 text-sm">
              <Cpu className="w-4 h-4" />
              4. Flea Market Offline Execution
            </div>
            <p>
              No Wi-Fi at Sunday morning swap meets or estate sale basements? Open weights can run directly on consumer laptops via WebGPU or local Ollama, enabling on-the-spot listing creation and valuation.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs transition cursor-pointer"
          >
            Close &amp; Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
