import React, { useState } from 'react';
import { 
  TrendingUp, 
  Activity, 
  Sliders, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  BarChart3, 
  Sparkles, 
  Layers, 
  Info,
  ArrowRight,
  Database
} from 'lucide-react';
import { TabPFNPrediction } from '../types';

export const TabPFNPredictor: React.FC = () => {
  const [category, setCategory] = useState('Vintage Clothing & Outerwear');
  const [brandTier, setBrandTier] = useState('Premium');
  const [condition, setCondition] = useState('Excellent Vintage (Patina)');
  const [ageYears, setAgeYears] = useState(2);
  const [originalMsrp, setOriginalMsrp] = useState(240);
  const [photoCount, setPhotoCount] = useState(6);
  const [freeShipping, setFreeShipping] = useState(true);
  const [season, setSeason] = useState('Q4 Holiday');
  const [acquisitionCost, setAcquisitionCost] = useState(35);

  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<TabPFNPrediction>({
    predictedClearingPrice: 145,
    confidenceInterval: { low: 122, high: 168 },
    predictedDaysToSell: 5,
    sellProbabilityIn7Days: 86,
    featureImportance: [
      { feature: 'Brand Provenance (Schott NYC)', weight: 34 },
      { feature: 'Condition & Distressed Patina', weight: 26 },
      { feature: 'Photo Count & Clarity (6 HD photos)', weight: 18 },
      { feature: 'Free Shipping Elasticity', weight: 12 },
      { feature: 'Q4 Outerwear Seasonality', weight: 10 },
    ],
    elasticityAdvice:
      'TabPFN curve indicates pricing at $145 captures an optimum 86% sell-through within 7 days. Setting at $168 extends average hold time to 18 days.',
  });

  const handlePredict = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/predict-price-tabular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          brandTier,
          condition,
          ageYears,
          originalMsrp,
          photoCount,
          freeShipping,
          season,
        }),
      });
      const data = await response.json();
      if (data.success && data.prediction) {
        setPrediction(data.prediction);
      }
    } catch (e) {
      console.error('TabPFN prediction error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const platforms = [
    { name: 'Etsy', fee: 0.065, flat: 0.20, color: 'text-orange-400', days: 6 },
    { name: 'eBay', fee: 0.1325, flat: 0.30, color: 'text-blue-400', days: 5 },
    { name: 'Shopify Store', fee: 0.029, flat: 0.30, color: 'text-emerald-400', days: 9 },
    { name: 'Depop', fee: 0.10, flat: 0.00, color: 'text-rose-400', days: 4 },
    { name: 'Poshmark', fee: 0.20, flat: 0.00, color: 'text-red-400', days: 4 },
  ];

  const clearing = prediction.predictedClearingPrice;

  return (
    <div className="space-y-6">
      {/* Intro banner on Prior Labs TabPFN */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/60 via-zinc-900 to-zinc-900 border border-purple-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
              PRIOR LABS PARTNER CATEGORY
            </span>
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              TabPFN-3.5 Tabular Price &amp; Velocity Foundation Agent
            </h2>
          </div>
          <p className="text-xs text-zinc-300 max-w-2xl">
            Generic LLMs hallucinate arbitrary prices. <strong>TabPFN</strong> is a true tabular foundation model trained on Bayesian synthetic priors that performs exact in-context tabular regression over historical comps, clearing velocities, and market elasticity.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-zinc-950/80 px-3 py-1.5 rounded-lg border border-zinc-800">
          <Database className="w-4 h-4 text-purple-400" />
          <span className="text-zinc-400">Zero-Shot Tabular Regression</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Sliders className="w-4 h-4 text-purple-400" />
            Tabular Listing Features (Model Inputs)
          </h3>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Item Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="Vintage Clothing & Outerwear">Vintage Clothing &amp; Outerwear</option>
              <option value="Handmade Ceramics & Pottery">Handmade Ceramics &amp; Pottery</option>
              <option value="Custom Mechanical Keyboards">Custom Mechanical Keyboards</option>
              <option value="Artisan Botanical Candles">Artisan Botanical Candles</option>
              <option value="Retro Gaming & Modded Consoles">Retro Gaming &amp; Modded Consoles</option>
              <option value="Mid-Century Furniture & Decor">Mid-Century Furniture &amp; Decor</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Brand Tier</label>
              <select
                value={brandTier}
                onChange={(e) => setBrandTier(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Niche Cult">Niche Cult / Rare</option>
                <option value="Premium">Premium Heritage</option>
                <option value="Mid-Market">Mid-Market</option>
                <option value="Budget">Budget / Unbranded</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Condition Grade</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Brand New (Studio Handcrafted)">Brand New / Handcrafted</option>
                <option value="Excellent Vintage (Patina)">Excellent Vintage (Patina)</option>
                <option value="Good (Visible Minor Wear)">Good (Visible Minor Wear)</option>
                <option value="Fair / Project Piece">Fair / Project Piece</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Original MSRP / Comp ($)
              </label>
              <input
                type="number"
                value={originalMsrp}
                onChange={(e) => setOriginalMsrp(parseFloat(e.target.value) || 0)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Acquisition Cost ($)
              </label>
              <input
                type="number"
                value={acquisitionCost}
                onChange={(e) => setAcquisitionCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Item Age ({ageYears} year{ageYears !== 1 ? 's' : ''})
              </label>
              <input
                type="range"
                min="0"
                max="25"
                value={ageYears}
                onChange={(e) => setAgeYears(parseInt(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Photos ({photoCount} images)
              </label>
              <input
                type="range"
                min="1"
                max="12"
                value={photoCount}
                onChange={(e) => setPhotoCount(parseInt(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="freeShip"
                checked={freeShipping}
                onChange={(e) => setFreeShipping(e.target.checked)}
                className="w-4 h-4 rounded accent-purple-500 cursor-pointer"
              />
              <label htmlFor="freeShip" className="text-xs text-zinc-300 cursor-pointer">
                Free Shipping Guarantee
              </label>
            </div>
            <div>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-white"
              >
                <option value="Q4 Holiday">Q4 Holiday Peak</option>
                <option value="Spring Fresh">Spring Renewal</option>
                <option value="Summer Lull">Summer Off-Peak</option>
                <option value="Autumn Back-to-School">Autumn Season</option>
              </select>
            </div>
          </div>

          <button
            onClick={handlePredict}
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Activity className="w-4 h-4 animate-spin" />
                <span>Running Prior Labs TabPFN-3.5 Inference...</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4" />
                <span>Recalculate TabPFN Market Prior</span>
              </>
            )}
          </button>
        </div>

        {/* Prediction Results */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Stat Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold font-mono">
                  TabPFN Foundation Prior
                </span>
                <h3 className="text-base font-bold text-white">
                  Empirical Market Clearing Price
                </h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-purple-300 font-mono">
                  ${prediction.predictedClearingPrice}
                </span>
                <div className="text-[10px] text-zinc-400 font-mono">
                  Range: ${prediction.confidenceInterval.low} - ${prediction.confidenceInterval.high}
                </div>
              </div>
            </div>

            {/* Velocity metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-[10px] text-zinc-400 uppercase font-mono">7-Day Velocity</div>
                <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">
                  {prediction.sellProbabilityIn7Days}%
                </div>
                <div className="text-[10px] text-zinc-500">Likelihood of 1st-week sale</div>
              </div>

              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-[10px] text-zinc-400 uppercase font-mono">Days on Market</div>
                <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">
                  ~{prediction.predictedDaysToSell} Days
                </div>
                <div className="text-[10px] text-zinc-500">Predicted listing turnover</div>
              </div>

              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 col-span-2 sm:col-span-1">
                <div className="text-[10px] text-zinc-400 uppercase font-mono">Margin Spread</div>
                <div className="text-lg font-bold text-white font-mono mt-0.5">
                  +${clearing - acquisitionCost}
                </div>
                <div className="text-[10px] text-zinc-500">
                  {Math.round(((clearing - acquisitionCost) / (acquisitionCost || 1)) * 100)}% Gross Margin
                </div>
              </div>
            </div>

            {/* Elasticity Advice */}
            <div className="p-3 bg-purple-950/20 border border-purple-500/20 rounded-lg text-xs text-purple-200 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-purple-300">TabPFN Elasticity Curve: </strong>
                {prediction.elasticityAdvice}
              </div>
            </div>

            {/* Feature Importance weights */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                <span>TabPFN Feature Importance Weights</span>
                <span className="text-[10px] text-zinc-500 font-mono">Normalized prior sensitivity</span>
              </div>
              <div className="space-y-2">
                {prediction.featureImportance.map((feat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-zinc-300">
                      <span>{feat.feature}</span>
                      <span className="font-mono text-purple-300">{feat.weight}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                        style={{ width: `${feat.weight}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fee & Payout Comparison Table */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-semibold text-zinc-200">
              Platform Take-Rate &amp; Net Take-Home Comparison at ${clearing}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-[10px] text-zinc-400 uppercase font-mono">
                    <th className="pb-2">Marketplace</th>
                    <th className="pb-2">Platform Fee</th>
                    <th className="pb-2">Net Payout</th>
                    <th className="pb-2">Net Profit (After ${acquisitionCost} Cost)</th>
                    <th className="pb-2">Est. Days</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-mono">
                  {platforms.map((p) => {
                    const feeAmount = clearing * p.fee + p.flat;
                    const netPayout = clearing - feeAmount;
                    const netProfit = netPayout - acquisitionCost;
                    return (
                      <tr key={p.name} className="hover:bg-zinc-800/40">
                        <td className={`py-2.5 font-medium font-sans ${p.color}`}>{p.name}</td>
                        <td className="py-2.5 text-zinc-400">
                          ${feeAmount.toFixed(2)} ({(p.fee * 100).toFixed(1)}%)
                        </td>
                        <td className="py-2.5 font-bold text-white">${netPayout.toFixed(2)}</td>
                        <td className="py-2.5 text-emerald-400 font-bold">
                          +${netProfit.toFixed(2)}
                        </td>
                        <td className="py-2.5 text-zinc-400 font-sans">{p.days}d</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
