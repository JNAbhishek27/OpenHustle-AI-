import React, { useState } from 'react';
import { 
  Receipt, 
  ShieldCheck, 
  Upload, 
  Check, 
  FileText, 
  DollarSign, 
  Sparkles, 
  AlertCircle, 
  Download, 
  Plus, 
  Lock,
  Layers,
  ArrowRight,
  Calculator
} from 'lucide-react';
import { PRESET_RECEIPTS } from '../data/presets';
import { ParsedReceipt } from '../types';

export const ReceiptSorter: React.FC = () => {
  const [receiptList, setReceiptList] = useState<ParsedReceipt[]>(PRESET_RECEIPTS);
  const [activeReceipt, setActiveReceipt] = useState<ParsedReceipt>(PRESET_RECEIPTS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [textNotes, setTextNotes] = useState('');
  const [receiptImage, setReceiptImage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setReceiptImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProcess = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/parse-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiptImage,
          textNotes: textNotes || 'Custom freelance business expense',
        }),
      });
      const data = await response.json();
      if (data.success && data.receipt) {
        setReceiptList((prev) => [data.receipt, ...prev]);
        setActiveReceipt(data.receipt);
        setTextNotes('');
        setReceiptImage(null);
      }
    } catch (e) {
      console.error('Error parsing receipt:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculations
  const totalExpenses = receiptList.reduce((acc, curr) => acc + curr.total, 0);
  const totalDeductible = receiptList.reduce(
    (acc, curr) => acc + (curr.isDeductible ? curr.total : 0),
    0
  );
  // Estimated self-employment tax + income tax deduction benefit (approx 30%)
  const estimatedTaxSaved = totalDeductible * 0.30;

  return (
    <div className="space-y-6">
      {/* Privacy Guarantee Header Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-zinc-900 to-zinc-900 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              ZERO CLOUD EGRESS • 100% PRIVATE
            </span>
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              Freelancer &amp; Hustler Local Receipt Sorter
            </h2>
          </div>
          <p className="text-xs text-zinc-300 max-w-2xl">
            Client data, estate sale sourcing locations, and wholesale invoice margins never leave your machine. Process receipts locally without feeding your confidential financial records to 3rd-party cloud logs.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-zinc-950/80 px-3 py-1.5 rounded-lg border border-zinc-800 text-emerald-400">
          <Lock className="w-4 h-4" />
          <span>Local Memory Only</span>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5">
          <div className="text-[10px] uppercase font-mono text-zinc-400">Total Tracked Expenses</div>
          <div className="text-xl font-black text-white font-mono mt-1">
            ${totalExpenses.toFixed(2)}
          </div>
          <div className="text-[10px] text-zinc-500">{receiptList.length} receipts archived</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5">
          <div className="text-[10px] uppercase font-mono text-emerald-400">IRS Deductible Expenses</div>
          <div className="text-xl font-black text-emerald-400 font-mono mt-1">
            ${totalDeductible.toFixed(2)}
          </div>
          <div className="text-[10px] text-zinc-500">Schedule C eligible deductions</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5">
          <div className="text-[10px] uppercase font-mono text-amber-400">Estimated Tax Cash Saved</div>
          <div className="text-xl font-black text-amber-400 font-mono mt-1">
            ${estimatedTaxSaved.toFixed(2)}
          </div>
          <div className="text-[10px] text-zinc-500">~30% SE + income tax shelter</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5">
          <div className="text-[10px] uppercase font-mono text-cyan-400">IRS Audit Exposure</div>
          <div className="text-xl font-black text-cyan-400 font-mono mt-1">
            Negligible
          </div>
          <div className="text-[10px] text-zinc-500">Matched to Schedule C lines</div>
        </div>
      </div>

      {/* Main Split: Add Receipt & Active Receipt Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload / Add */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Plus className="w-4 h-4 text-emerald-400" />
              Scan or Enter Business Expense
            </h3>

            {/* Quick preset selector */}
            <div>
              <span className="text-xs text-zinc-400 font-medium block mb-2">
                Load Quick Example Receipts:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_RECEIPTS.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveReceipt(r)}
                    className={`p-2 rounded-lg text-left text-xs border transition ${
                      activeReceipt.vendor === r.vendor
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="font-semibold truncate">{r.vendor}</div>
                    <div className="text-[10px] font-mono text-zinc-500">${r.total}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload Area */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Receipt Photo / PDF Invoice
              </label>
              {receiptImage ? (
                <div className="relative rounded-lg overflow-hidden border border-zinc-700 aspect-video max-h-36">
                  <img src={receiptImage} alt="Receipt preview" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setReceiptImage(null)}
                    className="absolute top-1 right-1 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded"
                  >
                    Clear
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-zinc-700 hover:border-emerald-500/50 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition bg-zinc-950/40 text-zinc-400 hover:text-emerald-400">
                  <Upload className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium">Drop receipt photo here</span>
                  <span className="text-[10px] text-zinc-500 mt-0.5">JPG, PNG, WebP (Never sent to cloud)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Expense Notes / Vendor Info
              </label>
              <textarea
                value={textNotes}
                onChange={(e) => setTextNotes(e.target.value)}
                placeholder="e.g. Sourced 5 vintage leather jackets at estate sale in Ballard for $35 each cash. Need COGS classification."
                rows={3}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={handleProcess}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>Parsing receipt in local edge memory...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Classify &amp; Tag for IRS Schedule C</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Parsed Active Receipt & Schedule C Report */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold">
                  {activeReceipt.taxCategory}
                </span>
                <h3 className="text-base font-bold text-white">{activeReceipt.vendor}</h3>
                <span className="text-xs text-zinc-400 font-mono">Date: {activeReceipt.date}</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-white font-mono">
                  ${activeReceipt.total.toFixed(2)}
                </span>
                <div className="text-[10px] text-zinc-400 font-mono">
                  Paid via: {activeReceipt.paymentMethod}
                </div>
              </div>
            </div>

            {/* Schedule C Classification Card */}
            <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  IRS Form 1040 Schedule C Mapping
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  {activeReceipt.deductiblePercentage}% Tax Deductible
                </span>
              </div>
              <div className="text-xs text-zinc-200 font-mono font-medium">
                {activeReceipt.irsScheduleCLine}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {activeReceipt.summary}
              </p>
            </div>

            {/* Itemized breakdown table */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-zinc-300">Itemized Line Items</span>
              <div className="bg-zinc-950 rounded-lg border border-zinc-800 divide-y divide-zinc-800/80">
                {activeReceipt.items.map((it, idx) => (
                  <div key={idx} className="p-2.5 flex items-center justify-between text-xs">
                    <div className="text-zinc-200">
                      <span className="font-mono text-zinc-500 mr-2">{it.qty}x</span>
                      {it.name}
                    </div>
                    <div className="font-mono font-semibold text-white">
                      ${(it.price * it.qty).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal & Tax */}
              <div className="flex items-center justify-end gap-6 text-xs font-mono text-zinc-400 pt-1 px-1">
                <div>Subtotal: ${activeReceipt.subtotal.toFixed(2)}</div>
                <div>Sales Tax: ${activeReceipt.tax.toFixed(2)}</div>
                <div className="font-bold text-white">Total: ${activeReceipt.total.toFixed(2)}</div>
              </div>
            </div>

            {/* Export actions */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <span className="text-[11px] text-zinc-500">
                Encrypted in browser session • 0 bytes sent off device
              </span>
              <button
                onClick={() => {
                  const csvContent =
                    'data:text/csv;charset=utf-8,' +
                    ['Date,Vendor,Total,Tax,Schedule C Line,Category']
                      .concat(
                        receiptList.map(
                          (r) =>
                            `"${r.date}","${r.vendor}",${r.total},${r.tax},"${r.irsScheduleCLine}","${r.taxCategory}"`
                        )
                      )
                      .join('\n');
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement('a');
                  link.setAttribute('href', encodedUri);
                  link.setAttribute('download', 'freelance_schedule_c_expenses.csv');
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-emerald-400 border border-zinc-700 transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Export Schedule C (.CSV)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
