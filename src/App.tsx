/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { ListingStudio } from './components/ListingStudio';
import { TabPFNPredictor } from './components/TabPFNPredictor';
import { ReceiptSorter } from './components/ReceiptSorter';
import { FirstUserSimulator } from './components/FirstUserSimulator';
import { DevPostGenerator } from './components/DevPostGenerator';
import { ArchitectureView } from './components/ArchitectureView';
import { ArchitectureModal } from './components/ArchitectureModal';
import { PRESET_ITEMS } from './data/presets';
import { EngineMode, ListingData, PresetItem } from './types';
import { Sparkles, Heart, Github, Award, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'listing' | 'pricing' | 'receipts' | 'first-user' | 'dev-post' | 'architecture'
  >('listing');
  const [engine, setEngine] = useState<EngineMode>('gemma-2-9b');
  const [savedCost, setSavedCost] = useState<number>(24.65);
  const [totalListingsCreated, setTotalListingsCreated] = useState<number>(3);
  const [currentListing, setCurrentListing] = useState<ListingData | null>(null);
  const [currentItem, setCurrentItem] = useState<PresetItem>(PRESET_ITEMS[0]);
  const [customUserStory, setCustomUserStory] = useState<string>('');
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);

  const handleGenerateSuccess = (data: ListingData, item: PresetItem) => {
    setCurrentListing(data);
    setCurrentItem(item);
    setTotalListingsCreated((prev) => prev + 1);
    setSavedCost((prev) => prev + 0.055); // $0.055 saved per listing vs commercial closed APIs
  };

  const handleSendToSimulator = (data: ListingData, item: PresetItem) => {
    setCurrentListing(data);
    setCurrentItem(item);
    setActiveTab('first-user');
  };

  const handleFirstUserSaleRecorded = (saleData: { price: number; profit: number; buyer: string }) => {
    setSavedCost((prev) => prev + 0.10);
  };

  const handleUpdateDevPostUserStory = (story: string) => {
    setCustomUserStory(story);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        engine={engine}
        setEngine={setEngine}
        savedCost={savedCost}
        totalListingsCreated={totalListingsCreated}
        onOpenArchModal={() => setIsArchModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'listing' && (
          <ListingStudio
            engine={engine}
            onGenerateSuccess={handleGenerateSuccess}
            onSendToSimulator={handleSendToSimulator}
          />
        )}

        {activeTab === 'pricing' && <TabPFNPredictor />}

        {activeTab === 'receipts' && <ReceiptSorter />}

        {activeTab === 'first-user' && (
          <FirstUserSimulator
            currentListing={currentListing}
            currentItem={currentItem}
            onFirstUserSaleRecorded={handleFirstUserSaleRecorded}
            onUpdateDevPostUserStory={handleUpdateDevPostUserStory}
          />
        )}

        {activeTab === 'dev-post' && (
          <DevPostGenerator customUserStory={customUserStory} />
        )}

        {activeTab === 'architecture' && <ArchitectureView />}
      </main>

      {/* Architecture Popup Modal */}
      <ArchitectureModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/90 text-xs text-zinc-500 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300">OpenHustle AI</span>
            <span>•</span>
            <span>Hacktoberfest 2026 Challenge: Week 2 (Side Hustle)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-zinc-400">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Powered by Google Gemma 2 &amp; Prior Labs TabPFN
            </span>
            <span className="text-zinc-600">|</span>
            <button
              onClick={() => setIsArchModalOpen(true)}
              className="text-amber-400 hover:text-amber-300 transition"
            >
              Open Innovation Manifesto
            </button>
            <span className="text-zinc-600">|</span>
            <button
              onClick={() => setActiveTab('dev-post')}
              className="text-blue-400 hover:text-blue-300 transition font-mono"
            >
              #hf26challenge
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
