# ⚡ OpenHustle AI

> **The Open-Weight Operating Suite for Side Hustles, Micro-Sellers & Freelancers**  
> *Built for the [Hacktoberfest 2026 Open-Source AI Challenge: Week 2 (Side Hustle)](https://dev.to/challenges/hacktoberfest-week2-2026-10-12)*

[![Hacktoberfest 2026](https://img.shields.io/badge/Hacktoberfest%202026-Week%202%3A%20Side%20Hustle-orange.svg)](https://dev.to/challenges/hacktoberfest-week2-2026-10-12)
[![Model Core](https://img.shields.io/badge/Model%20Core-Google%20Gemma%202%20%7C%20Prior%20Labs%20TabPFN-blue.svg)](https://ai.google.dev/gemma)
[![Data Privacy](https://img.shields.io/badge/Privacy-100%25%20Local%20Edge%20%2F%200%20Cloud%20Egress-emerald.svg)](#privacy-first-local-mode)
[![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)](./LICENSE)

---

## 💡 The Problem: The "Closed-API Tax" on Micro-Sellers

Every weekend, thousands of thrifters, vintage pickers, ceramicists, and crafters scour flea markets and estate sales. But back in their home studios, they hit the same wall: **the grueling administrative tax of cataloging, pricing, and bookkeeping**.

Photographing an item takes 2 minutes. Researching clearance prices, crafting SEO keywords for Etsy and eBay, writing specs, and calculating margin fees takes **25 minutes per item**.

When side hustlers try generic closed AI APIs (like GPT-4o or Claude 3.5), they hit two dealbreakers:
1. **Cost Unit-Economics:** At $0.05 to $0.08 per multimodal call, listing 300 catalog items costs $15–$25+/month—a massive dent in micro-business cash flow on $15–$30 vintage items.
2. **Pricing Hallucinations:** Generic LLMs invent arbitrary numbers when asked what a vintage jacket or artisan mug should sell for.
3. **Data Sovereignty & Privacy:** Uploading estate sale receipts, wholesale bills of materials, and client addresses to centralized clouds exposes sensitive trade sourcing advantages.

---

## 🛠️ The Solution: OpenHustle AI

**OpenHustle AI** is a localized, zero-cloud-leakage studio for side-hustlers powered by open-source AI:

- **Google Gemma 2 (9B / 27B)**: Extracts garment/craft visual features, drafts marketplace-compliant copy, and generates 13 platform-specific Etsy SEO tags.
- **Prior Labs TabPFN-3.5**: Tabular foundation model that predicts empirical market clearance prices and 7-day velocity without hallucinated pricing.
- **Local IRS Expense Sorter**: Parses receipt photos directly in the browser/edge with zero server transmission.
- **First Customer Simulator**: Interactive storefront testing with simulated buyer personas, negotiation chat, and live checkout.
- **DEV.to Submission Kit**: One-click generation of the official Hacktoberfest Week 2 DEV Challenge markdown article.

---

## 🏗️ System Architecture

```
                                ┌────────────────────────────────────────┐
                                │   OpenHustle Web & Local Edge Studio   │
                                └──────────────────┬─────────────────────┘
                                                   │
                ┌──────────────────────────────────┼──────────────────────────────────┐
                │                                  │                                  │
    ┌───────────▼───────────┐          ┌───────────▼───────────┐          ┌───────────▼───────────┐
    │   Google Gemma 2 9B   │          │     Prior Labs        │          │   Tinker LoRA Adapter │
    │   Open-Weight Model   │          │     TabPFN-3.5        │          │   Domain Specific     │
    │  - Multimodal Vision  │          │  - Tabular Pricing    │          │  - Vintage & Craft    │
    │  - Multi-platform SEO │          │  - 7-Day Velocity     │          │  - Flaw Disclosure    │
    │  - $0.00 Marginal Cost│          │  - Fee Optimization   │          │  - Reseller Jargon    │
    └───────────────────────┘          └───────────────────────┘          └───────────────────────┘
```

---

## 🌟 Key Features

### 1. 🏷️ Multi-Platform AI Listing Studio
- **Platform Character Caps Enforced:**
  - **Etsy:** ≤ 140 chars (algorithm front-loaded keyword structure)
  - **eBay:** ≤ 80 chars (keyword-dense search title)
  - **Poshmark:** ≤ 50 chars (punchy mobile feed card title)
  - **Depop:** Curated indie lower-case aesthetic with hashtags
  - **Shopify & FB Marketplace:** Clean storefront and local pickup titles
- **13 Algorithmic Etsy Tags:** Ready for one-click batch entry into the Etsy listing manager.
- **Reseller Flaw Disclosure:** Automatically surfaces authentic vintage wear and patina to safeguard 5-star seller ratings.
- **Quick Test Presets:** Includes 5 curated realistic verticals:
  1. *Vintage 1994 Schott NYC Heavyweight Steerhide Leather Bomber Jacket*
  2. *Hand-Thrown Speckled Stoneware Wabi-Sabi Espresso Cups (Set of 2)*
  3. *Custom Gasket-Mount Mechanical Keyboard (Lubed Holy Pandas, GMK Keycaps)*
  4. *Artisan Botanical Soy Candle Set (Wildwood Apothecary)*
  5. *Refurbished Nintendo Game Boy Color (Q5 IPS Backlit Screen Mod)*

### 2. 📊 TabPFN Tabular Price & Velocity Forecaster
- Powered by **Prior Labs' TabPFN-3.5** tabular foundation model.
- Evaluates tabular features (`Category`, `Brand Tier`, `Condition Grade`, `Age`, `Original MSRP`, `Photo Count`, `Free Shipping`, `Seasonality`).
- Calculates:
  - Empirical market clearing price ($)
  - 90% confidence interval
  - 7-day velocity likelihood (%)
  - Days on market prediction
  - Feature importance sensitivity weights
  - Platform take-rate comparison (Etsy 6.5% vs eBay 13.25% vs Shopify 2.9% vs Poshmark 20%)

### 3. 🧾 100% Private In-Browser Receipt & Tax Sorter
- **Zero Cloud Egress:** Client data, estate sale sourcing locations, and wholesale invoice margins never leave local memory.
- **IRS Form 1040 Schedule C Mapping:**
  - Line 22: Supplies & shipping packaging
  - Part III Line 36: Purchases for resale (COGS inventory)
  - Part III Line 38: Raw materials for manufacturing
  - Line 18: Office expenses, software & web hosting
- Instant tax savings calculation (~30% SE tax shelter) and 1-click `.CSV` export.

### 4. 🤝 First Customer & Checkout Simulator (Bonus Criteria)
- Live boutique storefront preview with 4.98-star trust badges and item gallery.
- Interactive buyer personas (*Maya K. - Vintage Curator*, *Leo C. - Ceramicist & Cafe Owner*, *Sam R. - Mechanical Keyboard Dev*).
- Live negotiation chat, instant simulated Stripe checkout with confetti celebration, and real user interview recording for your DEV writeup.

### 5. 📝 DEV.to Post Submission Generator
- Complete Hacktoberfest Week 2 DEV Challenge submission post formatted strictly according to the official template.
- Pre-populated with architecture diagrams, unit-economic math, first-user case study, and partner technology tags ready to publish directly on `dev.to/new`.

---

## 💰 Unit Economics: Open Innovation vs Closed APIs

| Metric | Closed Commercial APIs (GPT-4o / Claude) | OpenHustle (Gemma 2 + TabPFN) |
| :--- | :--- | :--- |
| **Marginal Cost per Listing** | ~$0.045 - $0.065 per item | **$0.00 (Local Edge / Self-Hosted GPU)** |
| **Annual Token Expense (300 items/mo)** | $162.00 - $234.00 / year | **$0.00 (Retained directly in bank)** |
| **Wholesale Receipt Privacy** | Sent to third-party corporate servers | **100% In-Browser Local Memory** |
| **Offline Capability** | Fails completely at flea markets & popups | **Runs on laptop with zero internet connection** |
| **Pricing Grounding** | LLM guesses / arbitrary hallucination | **TabPFN empirical Bayesian regression** |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/openhustle-ai.git
   cd openhustle-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key (or connect to a local Ollama instance on `http://localhost:11434`):
   ```env
   GEMINI_API_KEY="your-gemini-api-key"
   PORT=3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

---

## 📡 API Reference

### `POST /api/generate-listing`
Generates platform-compliant titles, descriptions, 13 Etsy tags, condition report, and TabPFN price forecast.

### `POST /api/predict-price-tabular`
Runs TabPFN tabular regression over product features to predict clearing price and 7-day velocity.

### `POST /api/parse-receipt`
Extracts vendor, line items, and IRS Schedule C tax categories with 100% edge privacy.

### `POST /api/generate-dev-post`
Compiles the complete Hacktoberfest Week 2 DEV Challenge markdown writeup.

---

## 🏆 Hacktoberfest 2026 Partner Categories

- **Google Gemma ($200 Featured Winner):** Open-weight foundation model for edge instruction tuning and character-limited title formatting.
- **Prior Labs TabPFN ($200 Featured Winner):** Tabular foundation model for market clearing price and velocity forecasting.
- **Thinking Machines Tinker ($200 Featured Winner):** Domain-specific LoRA adapter for vintage and craft terminology.
- **Sentry Agent Tracing ($100):** End-to-end telemetry and token latency audits.
- **Render ($200 Featured Winner):** Full-stack web service and container runtime.
- **.tech Domains ($100):** Live production domain deployment.

---

## 📄 License
This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.
