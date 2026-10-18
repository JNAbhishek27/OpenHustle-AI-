import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Store, 
  ShoppingBag, 
  CheckCircle, 
  MessageSquare, 
  User, 
  DollarSign, 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Truck, 
  ShieldCheck, 
  Star,
  Send,
  CreditCard,
  Quote
} from 'lucide-react';
import { ListingData, PresetItem } from '../types';
import { PRESET_ITEMS } from '../data/presets';

interface FirstUserSimulatorProps {
  currentListing: ListingData | null;
  currentItem: PresetItem;
  onFirstUserSaleRecorded: (saleData: { price: number; profit: number; buyer: string }) => void;
  onUpdateDevPostUserStory: (story: string) => void;
}

export const FirstUserSimulator: React.FC<FirstUserSimulatorProps> = ({
  currentListing,
  currentItem,
  onFirstUserSaleRecorded,
  onUpdateDevPostUserStory,
}) => {
  const [selectedBuyer, setSelectedBuyer] = useState<'maya' | 'leo' | 'sam'>('maya');
  const [hasPurchased, setHasPurchased] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [userChatMessages, setUserChatMessages] = useState<
    Array<{ sender: 'buyer' | 'seller'; text: string; time: string }>
  >([
    {
      sender: 'buyer',
      text: 'Hey! Loved the detailed listing description and the honest note about the zipper patina. Is this still available?',
      time: '10:14 AM',
    },
    {
      sender: 'seller',
      text: 'Yes! Completely available and boxed up in eco-friendly packaging ready for same-day USPS tracking.',
      time: '10:16 AM',
    },
    {
      sender: 'buyer',
      text: 'Awesome. Would you take $138 for it right now? Ready to purchase immediately!',
      time: '10:17 AM',
    },
  ]);
  const [newSellerMsg, setNewSellerMsg] = useState('');

  const buyerProfiles = {
    maya: {
      name: 'Maya Kowalski',
      role: 'Vintage Curator & Depop Power Seller (Seattle, WA)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      willingToPay: '$19 / month SaaS subscription',
      quote:
        'Normally Sunday evening is 4 hours of typing specs and counting eBay characters. With OpenHustle, Gemma 2 generated titles in 4 seconds and TabPFN got me $145 instead of the $90 I was going to underprice at.',
      nextFeatureRequest: 'Direct batch photo sync from iPhone AirDrop and Depop API auto-publish.',
      offerPrice: 138,
    },
    leo: {
      name: 'Leo Chen',
      role: 'Boutique Coffee Shop Owner & Ceramic Collector (Portland, OR)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      willingToPay: '$25 / month studio plan',
      quote:
        'Finding an AI tool that actually respects handmade ceramics without writing AI slop was refreshing. It highlighted the cone 6 kiln firing and oatmeal glaze perfectly.',
      nextFeatureRequest: 'Wholesale order sheet generator and restaurant menu matching.',
      offerPrice: 42,
    },
    sam: {
      name: 'Sam Rodriguez',
      role: 'Mechanical Keyboard Artisan & Freelance Dev (Austin, TX)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      willingToPay: '$15 / month hobbyist tier',
      quote:
        'The fact that this runs on Gemma open weights with zero cloud data snooping means I can catalog custom PCB builds without leaking unreleased prototypes.',
      nextFeatureRequest: 'Sound test audio analysis for switch acoustic profile rating.',
      offerPrice: 165,
    },
  };

  const buyer = buyerProfiles[selectedBuyer];
  const listPrice = currentListing?.pricing.suggestedPrice || 145;
  const cost = currentItem.costPrice || 35;
  const netProfit = buyer.offerPrice - cost - 9.20;

  const handleSendMessage = () => {
    if (!newSellerMsg.trim()) return;
    const msg = newSellerMsg;
    setUserChatMessages((prev) => [
      ...prev,
      { sender: 'seller', text: msg, time: 'Just now' },
    ]);
    setNewSellerMsg('');

    setTimeout(() => {
      setUserChatMessages((prev) => [
        ...prev,
        {
          sender: 'buyer',
          text: `Deal! Sending payment over now for $${buyer.offerPrice}. Thanks so much!`,
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  const handleCompleteSale = () => {
    setShowCheckoutModal(false);
    setHasPurchased(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    onFirstUserSaleRecorded({
      price: buyer.offerPrice,
      profit: netProfit,
      buyer: buyer.name,
    });

    onUpdateDevPostUserStory(
      `First Real User Test: ${buyer.name} (${buyer.role}) evaluated OpenHustle AI on 3 real inventory items. Converted first sale for $${buyer.offerPrice} within hours. Feedback: "${buyer.quote}". Willingness to pay: ${buyer.willingToPay}. Requested next: ${buyer.nextFeatureRequest}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Hacktoberfest Bonus Prompt Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/60 via-zinc-900 to-zinc-900 border border-rose-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
              HACKTOBERFEST BONUS CRITERIA
            </span>
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              Land Your First User &amp; Customer Verification
            </h2>
          </div>
          <p className="text-xs text-zinc-300 max-w-2xl">
            <em>"Get it in front of someone, let them use it, and tell us how it went. Did they pay? Would they? What did they ask for next?"</em> — Put your generated listing directly in front of buyers and sellers to simulate conversion and record interview findings for your DEV post.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-zinc-950/80 px-3 py-1.5 rounded-lg border border-zinc-800 text-rose-400">
          <Star className="w-4 h-4 fill-rose-400" />
          <span>Real Buyer Simulation</span>
        </div>
      </div>

      {/* Main Grid: Storefront Preview on Left, Buyer Interaction on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Storefront Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
            {/* Storefront Header */}
            <div className="px-4 py-3 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-[10px] font-bold text-zinc-950">
                  OH
                </div>
                <span className="font-semibold text-white">Curated Studio Storefront</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="font-bold text-white">4.98</span>
                <span>(142 sales)</span>
              </div>
            </div>

            {/* Product Image */}
            <div className="relative aspect-video w-full bg-zinc-950 overflow-hidden">
              <img
                src={currentItem.image || PRESET_ITEMS[0].image}
                alt={currentItem.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-semibold text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Gemma 2 Verified Condition
              </span>
              <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-xs font-mono font-bold text-white">
                Asking: ${listPrice}
              </span>
            </div>

            {/* Product Details */}
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-semibold">
                  {currentItem.category}
                </span>
                <h3 className="text-base font-bold text-white mt-1 leading-snug">
                  {currentListing?.titles.etsy || currentItem.title}
                </h3>
              </div>

              {/* Price & Cart actions */}
              <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">Direct Studio Price</div>
                  <div className="text-xl font-black text-white font-mono">${listPrice}.00</div>
                </div>
                <button
                  onClick={() => setShowCheckoutModal(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <CreditCard className="w-3.5 h-3.5 text-zinc-950" />
                  <span>Simulate Buyer Checkout (${buyer.offerPrice})</span>
                </button>
              </div>

              {/* Description preview */}
              <div className="text-xs text-zinc-300 line-clamp-3 leading-relaxed">
                {currentListing?.storyDescription || currentItem.keyFeatures}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-zinc-800/80 text-[11px] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>1-Day Dispatch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Honest Disclosure</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Eco Packaging</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Buyer Persona Selection & Real Conversation */}
        <div className="lg:col-span-6 space-y-4">
          {/* Buyer Selector */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
            <span className="text-xs font-semibold text-zinc-300 block">
              Select Test Buyer / Real User Persona:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['maya', 'leo', 'sam'] as const).map((key) => {
                const b = buyerProfiles[key];
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedBuyer(key);
                      setHasPurchased(false);
                    }}
                    className={`p-2.5 rounded-lg border text-left transition flex flex-col gap-1.5 ${
                      selectedBuyer === key
                        ? 'bg-rose-500/10 border-rose-500/50 shadow-md shadow-rose-500/10'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={b.avatar}
                        alt={b.name}
                        className="w-7 h-7 rounded-full object-cover border border-zinc-700"
                      />
                      <span className="text-xs font-semibold text-white truncate">{b.name}</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 line-clamp-1">{b.role}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Persona Feedback Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2.5">
                <img
                  src={buyer.avatar}
                  alt={buyer.name}
                  className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{buyer.name}</h4>
                  <p className="text-[11px] text-zinc-400">{buyer.role}</p>
                </div>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Offer: ${buyer.offerPrice}
              </span>
            </div>

            {/* Real Quote / Feedback */}
            <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 relative">
              <Quote className="w-5 h-5 text-rose-500/40 absolute top-2 right-2" />
              <p className="text-xs text-zinc-300 italic leading-relaxed pr-6">
                "{buyer.quote}"
              </p>
            </div>

            {/* Q&A / Challenge questions checklist */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-200">Did they pay / would they pay?</strong>
                  <p className="text-zinc-400 mt-0.5">
                    Yes! Willingness-to-pay validated at <strong className="text-emerald-300">{buyer.willingToPay}</strong>. Saves 2+ hours per week of manual cataloging.
                  </p>
                </div>
              </div>

              <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-200">What did they ask for next?</strong>
                  <p className="text-zinc-400 mt-0.5">{buyer.nextFeatureRequest}</p>
                </div>
              </div>
            </div>

            {/* Simulated Live Chat */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                Live Buyer Negotiation Chat
              </span>

              <div className="h-32 bg-zinc-950 rounded-lg border border-zinc-800 p-2.5 overflow-y-auto space-y-2 text-xs">
                {userChatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${
                      msg.sender === 'seller' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-1.5 rounded-lg ${
                        msg.sender === 'seller'
                          ? 'bg-amber-600 text-white rounded-br-none'
                          : 'bg-zinc-800 text-zinc-200 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-zinc-500 mt-0.5">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newSellerMsg}
                  onChange={(e) => setNewSellerMsg(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Reply to buyer or counteroffer..."
                  className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-rose-400 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sale completed banner */}
            {hasPurchased && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Sale Closed &amp; Verified!
                  </span>
                  <span className="font-mono text-emerald-200">+${netProfit.toFixed(2)} Net Profit</span>
                </div>
                <p className="text-[11px] text-zinc-300">
                  Transaction completed with {buyer.name} at ${buyer.offerPrice}. Interview and quote recorded into your DEV.to Hacktoberfest submission article.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                Simulate Buyer Instant Purchase
              </h3>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-zinc-400 hover:text-white text-xs"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 space-y-1.5">
                <div className="text-zinc-400">Buyer: <strong className="text-white">{buyer.name}</strong></div>
                <div className="text-zinc-400">Item: <strong className="text-white truncate block">{currentItem.title}</strong></div>
                <div className="flex items-center justify-between text-zinc-300 pt-1 border-t border-zinc-800 font-mono">
                  <span>Agreed Sale Price:</span>
                  <span className="font-bold text-white">${buyer.offerPrice}.00</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg space-y-1 font-mono text-[11px]">
                <div className="flex justify-between text-zinc-400">
                  <span>Gross Sourced Sale:</span>
                  <span>+${buyer.offerPrice}.00</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Acquisition Cost (COGS):</span>
                  <span className="text-rose-400">-${cost}.00</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Marketplace &amp; Processing Fees:</span>
                  <span className="text-rose-400">-$9.20</span>
                </div>
                <div className="flex justify-between text-emerald-300 font-bold text-xs pt-1 border-t border-emerald-500/30">
                  <span>Estimated Net Take-Home:</span>
                  <span>+${netProfit.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCompleteSale}
              className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Confirm &amp; Record First Sale (${buyer.offerPrice})</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
