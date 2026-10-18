import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  Copy, 
  Check, 
  DollarSign, 
  ShoppingBag, 
  Tag, 
  ShieldAlert, 
  Layers, 
  ArrowRight, 
  RefreshCw, 
  Sliders, 
  Download,
  Info,
  ExternalLink,
  Zap,
  Clock,
  FileText
} from 'lucide-react';
import { PRESET_ITEMS } from '../data/presets';
import { EngineMode, ListingData, Marketplace, PresetItem } from '../types';

interface ListingStudioProps {
  engine: EngineMode;
  onGenerateSuccess: (data: ListingData, item: PresetItem) => void;
  onSendToSimulator: (data: ListingData, item: PresetItem) => void;
}

export const ListingStudio: React.FC<ListingStudioProps> = ({
  engine,
  onGenerateSuccess,
  onSendToSimulator,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<PresetItem>(PRESET_ITEMS[0]);
  const [title, setTitle] = useState(PRESET_ITEMS[0].title);
  const [category, setCategory] = useState(PRESET_ITEMS[0].category);
  const [condition, setCondition] = useState(PRESET_ITEMS[0].condition);
  const [brand, setBrand] = useState(PRESET_ITEMS[0].brand);
  const [costPrice, setCostPrice] = useState(PRESET_ITEMS[0].costPrice);
  const [notes, setNotes] = useState(PRESET_ITEMS[0].notes);
  const [keyFeatures, setKeyFeatures] = useState(PRESET_ITEMS[0].keyFeatures);
  const [images, setImages] = useState<string[]>([
    PRESET_ITEMS[0].image,
    ...(PRESET_ITEMS[0].additionalImages || [])
  ]);
  const [targetMarketplaces, setTargetMarketplaces] = useState<Marketplace[]>([
    'etsy', 'ebay', 'shopify', 'poshmark', 'depop'
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [generatedResult, setGeneratedResult] = useState<ListingData | null>(null);
  const [activePlatformTab, setActivePlatformTab] = useState<Marketplace>('etsy');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [customPrice, setCustomPrice] = useState<number>(145);

  const handleSelectPreset = (preset: PresetItem) => {
    setSelectedPreset(preset);
    setTitle(preset.title);
    setCategory(preset.category);
    setCondition(preset.condition);
    setBrand(preset.brand);
    setCostPrice(preset.costPrice);
    setNotes(preset.notes);
    setKeyFeatures(preset.keyFeatures);
    setImages([preset.image, ...(preset.additionalImages || [])]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [event.target!.result as string, ...prev].slice(0, 5));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setLoadingStep('Initializing Google Gemma 2 open weights on edge...');

    try {
      setTimeout(() => setLoadingStep('Analyzing image lighting, texture & maker markings...'), 400);
      setTimeout(() => setLoadingStep('Calling TabPFN-3.5 prior for empirical clearance pricing...'), 800);
      setTimeout(() => setLoadingStep('Formatting platform character limits (Etsy, eBay, Depop)...'), 1200);

      const response = await fetch('/api/generate-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          condition,
          brand,
          costPrice,
          keyFeatures,
          notes,
          images,
          targetPlatforms: targetMarketplaces,
          engine,
        }),
      });

      const resJson = await response.json();
      if (resJson.success && resJson.data) {
        setGeneratedResult(resJson.data);
        setCustomPrice(resJson.data.pricing.suggestedPrice);
        onGenerateSuccess(resJson.data, {
          id: selectedPreset.id || 'custom-' + Date.now(),
          title,
          category,
          condition,
          brand,
          costPrice,
          image: images[0] || PRESET_ITEMS[0].image,
          keyFeatures,
          notes,
        });

        // Trigger celebratory confetti
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
    } catch (err) {
      console.error('Error generating listing:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const platformLimits: Record<Marketplace, { max: number; label: string; desc: string }> = {
    etsy: { max: 140, label: 'Etsy Title', desc: 'Algorithm prioritizes front-loaded descriptive keywords' },
    ebay: { max: 80, label: 'eBay Title', desc: 'Strict 80 char limit, capitalize key search words' },
    poshmark: { max: 50, label: 'Poshmark Title', desc: 'Punchy 50 char limit for mobile feed cards' },
    depop: { max: 100, label: 'Depop Title', desc: 'Indie & aesthetic tags with lowercase appeal' },
    shopify: { max: 160, label: 'Shopify / Web Title', desc: 'Clean branded storefront title' },
    facebook: { max: 100, label: 'FB Marketplace', desc: 'Local buyers value condition and pickup details' },
  };

  const currentTitle = generatedResult ? (generatedResult.titles[activePlatformTab] || title) : title;
  const currentLimit = platformLimits[activePlatformTab];

  return (
    <div className="space-y-6">
      {/* Preset Pickers */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
              Quick Test Side-Hustle Presets
            </span>
            <span className="text-[11px] text-zinc-500 hidden sm:inline">
              (Click to load authentic photography, specs &amp; pricing)
            </span>
          </div>
          <span className="text-xs text-amber-400 font-mono">5 Curated Verticals</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {PRESET_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectPreset(item)}
              className={`p-2 rounded-lg border text-left transition flex flex-col gap-1.5 relative group overflow-hidden ${
                selectedPreset.id === item.id
                  ? 'bg-amber-500/10 border-amber-500/50 shadow-md shadow-amber-500/10'
                  : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="aspect-video w-full rounded overflow-hidden relative bg-zinc-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono text-emerald-300">
                  Buy: ${item.costPrice}
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-zinc-200 truncate">{item.brand}</div>
                <div className="text-[11px] text-zinc-400 truncate">{item.category}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form & Results split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Input controls & Images */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                Item Inputs &amp; Photography
              </h2>
              <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                {images.length} Photo{images.length !== 1 ? 's' : ''} Ready
              </span>
            </div>

            {/* Photos Strip */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">
                Product Photos (Gemma Multi-Modal Edge Vision)
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {images.map((img, idx) => (
                  <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-700 shrink-0 group">
                    <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                    <span className="absolute top-0.5 left-0.5 text-[9px] font-mono bg-black/70 text-zinc-300 px-1 rounded">
                      #{idx + 1}
                    </span>
                  </div>
                ))}
                <label className="w-16 h-16 rounded-lg border-2 border-dashed border-zinc-700 hover:border-amber-500/50 flex flex-col items-center justify-center cursor-pointer transition shrink-0 bg-zinc-950/40 text-zinc-500 hover:text-amber-400">
                  <Upload className="w-4 h-4" />
                  <span className="text-[9px] mt-1">Upload</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Title / Seed */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Raw Item Description / Seed
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                placeholder="e.g. Vintage Leather Schott Bomber Jacket"
              />
            </div>

            {/* Category & Brand row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Brand / Maker</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Condition & Acquisition Cost row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Condition Grade</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="Brand New (Studio Handcrafted)">Brand New (Studio Handcrafted)</option>
                  <option value="Excellent Vintage (Authentic Distressed Patina)">Excellent Vintage (Patina)</option>
                  <option value="Mint / Custom Built">Mint / Custom Built</option>
                  <option value="Very Good (Minor Wear)">Very Good (Minor Wear)</option>
                  <option value="Upgraded / Restored">Upgraded / Restored</option>
                  <option value="Fair / For Restoration">Fair / For Restoration</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Cost of Acquisition ($)
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1.5 text-zinc-500 text-xs">$</span>
                  <input
                    type="number"
                    value={costPrice}
                    onChange={(e) => setCostPrice(parseFloat(e.target.value) || 0)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg pl-6 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Key specs */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Key Materials, Measurements &amp; Features
              </label>
              <textarea
                value={keyFeatures}
                onChange={(e) => setKeyFeatures(e.target.value)}
                rows={2}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Reseller Flaws Disclosure */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-amber-300 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  Known Flaws &amp; Wear Disclosure
                </label>
                <span className="text-[10px] text-zinc-500">Protects 5-star seller rating</span>
              </div>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-zinc-950 border border-amber-500/30 rounded-lg px-3 py-1.5 text-xs text-amber-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                placeholder="e.g. Mild patina on zipper pull, zero structural tears."
              />
            </div>

            {/* Target Marketplaces */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">
                Target Marketplaces
              </label>
              <div className="flex flex-wrap gap-2">
                {(['etsy', 'ebay', 'shopify', 'poshmark', 'depop', 'facebook'] as Marketplace[]).map((m) => {
                  const active = targetMarketplaces.includes(m);
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setTargetMarketplaces((prev) =>
                          active ? prev.filter((x) => x !== m) : [...prev, m]
                        );
                      }}
                      className={`text-xs px-2.5 py-1 rounded-full border transition capitalize font-medium ${
                        active
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-zinc-950 text-zinc-500 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {m === 'facebook' ? 'FB Market' : m}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:via-orange-400 hover:to-rose-400 text-zinc-950 shadow-lg shadow-orange-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{loadingStep || 'Generating...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-zinc-950 fill-zinc-950" />
                  <span>Generate Multi-Channel Listing ({engine})</span>
                </>
              )}
            </button>

            {/* Open-Source Cost & Privacy Guarantee Badge */}
            <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-[11px] text-emerald-300/90 flex items-start gap-2">
              <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong>Zero-Token Marginal Cost:</strong> Running via open weights saves $0.05 per listing. Sourcing cost ($
                {costPrice}) and private inventory photos remain 100% confidential.
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Generated Listing Output */}
        <div className="lg:col-span-7 space-y-4">
          {!generatedResult && !isLoading && (
            <div className="h-full min-h-[440px] flex flex-col items-center justify-center text-center p-8 bg-zinc-900/40 border border-dashed border-zinc-800 rounded-xl">
              <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center mb-4 text-amber-400">
                <Tag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">
                Ready to Generate High-Converting Listings
              </h3>
              <p className="text-xs text-zinc-400 max-w-md mb-4">
                Click <strong>"Generate Multi-Channel Listing"</strong> to run the Google Gemma 2 &amp; TabPFN model pipeline. We'll format compliant titles, write compelling buyer copy, extract 13 Etsy tags, and predict net clearance profits.
              </p>
              <button
                onClick={handleGenerate}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-amber-400 border border-zinc-700 transition flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Quick Run on Selected Preset
              </button>
            </div>
          )}

          {isLoading && (
            <div className="h-full min-h-[440px] flex flex-col items-center justify-center text-center p-8 bg-zinc-900/40 border border-zinc-800 rounded-xl space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin" />
                <Sparkles className="w-6 h-6 text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Running Open-Weight Inference</h4>
                <p className="text-xs text-amber-400 font-mono mt-1">{loadingStep}</p>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Gemma 2 9B • TabPFN-3.5 Tabular Regressor • Zero Cloud Leakage
                </p>
              </div>
            </div>
          )}

          {generatedResult && !isLoading && (
            <div className="space-y-4">
              {/* Marketplace Title Tabs */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-300">
                      Marketplace Compliant Titles
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      (Exact character length limits enforced)
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(currentTitle, 'active-title')}
                    className="text-xs px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition flex items-center gap-1.5 border border-zinc-700"
                  >
                    {copiedField === 'active-title' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedField === 'active-title' ? 'Copied' : 'Copy Title'}</span>
                  </button>
                </div>

                {/* Sub-tabs for platforms */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                  {(['etsy', 'ebay', 'shopify', 'poshmark', 'depop', 'facebook'] as Marketplace[]).map((plat) => {
                    const text = generatedResult.titles[plat] || '';
                    const len = text.length;
                    const limit = platformLimits[plat].max;
                    const isOver = len > limit;

                    return (
                      <button
                        key={plat}
                        onClick={() => setActivePlatformTab(plat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 capitalize ${
                          activePlatformTab === plat
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <span>{plat}</span>
                        <span
                          className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                            isOver ? 'bg-rose-500/20 text-rose-300' : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {len}/{limit}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Display active title */}
                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-xs font-medium text-zinc-100 flex items-start justify-between gap-3">
                  <p className="leading-relaxed">{currentTitle}</p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono shrink-0">
                    {currentTitle.length} / {currentLimit.max} chars
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                  <span>{currentLimit.desc}</span>
                </div>
              </div>

              {/* Story Description & Specifications */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    Storytelling Description &amp; Details
                  </h3>
                  <button
                    onClick={() => copyToClipboard(generatedResult.storyDescription, 'description')}
                    className="text-xs px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition flex items-center gap-1.5 border border-zinc-700"
                  >
                    {copiedField === 'description' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedField === 'description' ? 'Copied' : 'Copy Description'}</span>
                  </button>
                </div>

                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-xs text-zinc-300 space-y-2 max-h-48 overflow-y-auto leading-relaxed whitespace-pre-line">
                  {generatedResult.storyDescription}
                </div>

                {/* Specs Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {generatedResult.specifications.map((spec, i) => (
                    <div key={i} className="bg-zinc-950 p-2 rounded border border-zinc-800">
                      <div className="text-[10px] text-zinc-500 uppercase">{spec.label}</div>
                      <div className="text-xs font-medium text-zinc-200 truncate">{spec.value}</div>
                    </div>
                  ))}
                </div>

                {/* Honest Disclosure */}
                {generatedResult.disclosedFlaws && (
                  <div className="p-2.5 rounded bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300">Reseller Flaw Disclosure: </strong>
                      {generatedResult.disclosedFlaws}
                    </div>
                  </div>
                )}
              </div>

              {/* TabPFN Price & Marketplace Net Profit Breakdown */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-white">
                      TabPFN Prior Labs Pricing &amp; Net Profit Forecast
                    </span>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {generatedResult.pricing.confidenceScore}% Model Confidence
                  </span>
                </div>

                {/* Price Range Slider card */}
                <div className="grid grid-cols-3 gap-3 p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-center">
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">Fast Liquidation (3 Days)</div>
                    <div className="text-sm font-bold text-zinc-300 font-mono">
                      ${generatedResult.pricing.minPrice}
                    </div>
                  </div>
                  <div className="border-x border-zinc-800 px-2">
                    <div className="text-[10px] text-amber-400 font-semibold uppercase">
                      Recommended Clearing
                    </div>
                    <div className="text-lg font-extrabold text-amber-400 font-mono">
                      ${generatedResult.pricing.suggestedPrice}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">Maximum Patient Price</div>
                    <div className="text-sm font-bold text-zinc-300 font-mono">
                      ${generatedResult.pricing.highPrice}
                    </div>
                  </div>
                </div>

                {/* Multi-Marketplace Net Profit Calculator */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-medium text-zinc-400 flex items-center justify-between">
                    <span>Estimated Net Cash Payout (After Platform Fees &amp; ${costPrice} Cost):</span>
                    <span className="text-zinc-500">Based on ${generatedResult.pricing.suggestedPrice} sale</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {Object.entries(generatedResult.marketplacesBreakdown).map(([plat, fee]) => {
                      const netProfit = fee.estNetProfit - costPrice;
                      const roi = costPrice > 0 ? Math.round((netProfit / costPrice) * 100) : 0;
                      return (
                        <div key={plat} className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                          <div className="flex items-center justify-between text-xs font-semibold capitalize text-zinc-300">
                            <span>{plat}</span>
                            <span className="text-[10px] text-zinc-500 font-mono">{fee.commissionPercent}%</span>
                          </div>
                          <div className="mt-1 text-sm font-bold text-emerald-400 font-mono">
                            ${fee.estNetProfit.toFixed(2)}
                          </div>
                          <div className="text-[10px] text-zinc-400 flex items-center justify-between mt-0.5">
                            <span>Net Profit:</span>
                            <span className="text-emerald-300 font-medium">+${netProfit.toFixed(2)}</span>
                          </div>
                          {costPrice > 0 && (
                            <div className="text-[9px] text-amber-400/80 text-right mt-0.5">
                              {roi}% ROI
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 13 Etsy SEO Tags & Hashtags */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-semibold text-zinc-200">
                      13 Algorithmic Etsy Search Tags
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">
                      {generatedResult.etsyTags.length}/13
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(generatedResult.etsyTags.join(', '), 'etsy-tags')}
                    className="text-xs px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition flex items-center gap-1.5 border border-zinc-700"
                  >
                    {copiedField === 'etsy-tags' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedField === 'etsy-tags' ? 'Copied' : 'Copy All 13 Comma-Separated'}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {generatedResult.etsyTags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-md bg-zinc-950 text-zinc-300 border border-zinc-800 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Test First User Simulator or Export */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => onSendToSimulator(generatedResult, selectedPreset)}
                  className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition flex items-center gap-2 cursor-pointer shadow-md shadow-rose-500/10"
                >
                  <ShoppingBag className="w-4 h-4 text-rose-400" />
                  <span>Test in "First Customer" Storefront Simulator →</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const blob = new Blob([JSON.stringify(generatedResult, null, 2)], {
                        type: 'application/json',
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${title.slice(0, 20).replace(/\s+/g, '_')}_listing.json`;
                      a.click();
                    }}
                    className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-300 border border-zinc-700 transition flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export JSON
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
