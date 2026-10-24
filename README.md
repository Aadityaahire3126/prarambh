# KaamSetu — Trusted Help. Safer Homes. Fairer Work.

> **A Premium, Interactive Indian Home Services Marketplace Prototype**  
> Focused on explainable trust verification, worker safety check-ins, reliable booking lifecycles, and fair treatment of domestic and technical home-service professionals.

---

## 🌟 Product Vision & Core Differentiator

Most Indian gig platforms display a generic, unexplained "Verified" checkmark that breeds false security. **KaamSetu** fundamentally rebuilds trust around **evidence-based, explainable indicators**:
- **Identity Checked**: Documentary review of government ID (Aadhaar, Voter ID, Driving License in demo).
- **Address Checked**: Local utility bill or registered lease agreement verified.
- **Attendance & Punctuality**: Historical percentage of on-time doorstep arrivals (e.g. 98%).
- **Repeat Customers**: Real counts of households that re-hired the worker (e.g. 26 regular clients).
- **Criminal Background Check**: Only marked "Completed" if an authentic police verification certificate or court record search is on file. Never conflated with simple identity checks.
- **Fair Work & Dignity Charter**: 0% commission deduction from worker base hourly wages; protected phone numbers; and fair review dispute redressal.

---

## 🛠 Tech Stack

- **Framework**: React 19 + Vite 8
- **Routing**: React Router v7 (`react-router-dom`)
- **Styling**: Tailwind CSS + Custom Brand Tokens (`#2ECC71` Emerald, `#17623A` Dark Green, `#FDF4C8` Light Yellow, `#FFFDF5` Off-white)
- **Icons**: Lucide React
- **State Management**: React Context (`AppDataContext`, `AuthContext`) + LocalStorage persistence
- **Dates & Helpers**: `date-fns`, `nanoid`

---

## 🚀 Quick Start Guide

### 1. Installation
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 🎭 Persona & Role Switcher

KaamSetu includes a persistent **Demo Role Switcher** in the top navigation bar to test all perspectives seamlessly:
- **Guest / Public**: Browse 12 service categories, search & filter workers, read trust policies.
- **Customer (`Rohit Mehta`)**: Post requirements, view AI-suggested matches, manage bookings, review arrival OTPs, chat, and submit multi-criteria reviews.
- **Worker (`Asha Sharma`)**: Receive matching leads, accept jobs, conduct Doorstep OTP check-in, send "I'm Safe" heartbeats, raise SOS incident flags, and track net earnings.
- **Admin / Operations Lead (`Pooja Rao`)**: Executive telemetry, verify worker submissions, triage real-time safety alerts, arbitrate complaints, and inspect transactions.

---

## 📱 Application Routes & Sitemap

### Public Pages
- `/` — Homepage with Hero search, 12 categories, trust model explainer, customer vs. worker workflows, featured workers, FAQs.
- `/services` — Complete directory of all 12 home service categories with pricing benchmarks.
- `/services/:category` — Category-specific worker listings and specialized booking entry point.
- `/search` — Multi-faceted search by keyword, locality/PIN, price range slider, rating, experience, and trust badges.
- `/workers/:id` — Comprehensive worker profile with interactive trust badge evidence popovers, attendance stats, work history, reviews, and protected contact.
- `/how-it-works` — Detailed visual guide for households and domestic service professionals.
- `/trust-and-safety` — Transparent trust charter, privacy principles, and distinction between ID checks and criminal records.
- `/help` — FAQs and interactive support ticket submission.
- `/login` & `/signup` — Authentication simulator with instant demo persona buttons.

### Customer Portal (`/customer/*`)
- `/customer/dashboard` — Overview, active visit tracker with doorstep OTP code, recent services, favourites.
- `/customer/post-requirement` — Form with validation for one-time or recurring domestic requirements.
- `/customer/matches` — Smart matches ranked by category, locality, budget, and trust scores, with side-by-side comparison modal.
- `/customer/bookings` — Filterable bookings list (`All`, `Active`, `Completed`, `Disputed`).
- `/customer/bookings/:id` — Visual timeline tracker (Requirement Posted $\rightarrow$ Worker Accepted $\rightarrow$ Doorstep Arrival OTP $\rightarrow$ Work in Progress $\rightarrow$ Completed), confirm completion, and review triggers.
- `/customer/messages` — Protected in-app chat simulator with persistent message threads.
- `/customer/favourites` — Saved worker profiles with instant re-booking.
- `/customer/reviews` — Multi-criteria reviews (punctuality, quality, communication) for completed visits.
- `/customer/payments` — Digital escrow receipts and disclosed platform convenience fee breakdown.
- `/customer/support` — Dispute mediation tickets and replacement domestic help requests.
- `/customer/profile` — Household settings, saved addresses, and pet/accessibility notes.

### Worker Portal (`/worker/*`)
- `/worker/dashboard` — Profile readiness, today's schedule, pending job requests, monthly earnings, quick safety check-in shortcut.
- `/worker/jobs` — Incoming neighborhood job requests with instant Accept or Decline actions.
- `/worker/bookings` & `/worker/bookings/:id` — Job milestones, private customer address, arrival OTP verification.
- `/worker/safety-checkin` — **Dedicated Safety Check-in Centre**:
  - Doorstep Arrival OTP verification (e.g. `4821`).
  - Resend demo code & simulate manual check-in.
  - "I'm Safe" heartbeat button (updates operations audit log).
  - "SOS / I Need Help" button with confirmation modal (generates high-priority Admin alert).
  - Job progress controls (`Work Started`, `Work Paused`, `Work Resumed`, `Work Completed`).
  - Strict privacy notices (No GPS tracking, no audio snooping).
- `/worker/verification` — Step-by-step verification hub (Govt ID, Address Proof, Reference Check, Police Check).
- `/worker/earnings` — Gross earnings, 0% platform wage deduction pledge, net disbursal ledger.
- `/worker/reviews` — Received customer feedback with "Report Unfair Review / Dispute" action.
- `/worker/support` — Worker helpline info, safety guidelines, and grievance redressal.
- `/worker/settings` — Availability toggle, hourly rates, and working hours.

### Admin Operations Console (`/admin/*`)
- `/admin/dashboard` — Executive overview KPIs, booking distribution charts, and live system activity journal.
- `/admin/workers` — Worker directory with trust badge inspector and manual badge toggling.
- `/admin/verification` — Verification approvals queue to approve/reject worker identity and police check records.
- `/admin/customers` — Registered households directory and booking volume.
- `/admin/bookings` — Master bookings manager with lifecycle status intervention.
- `/admin/safety-alerts` — Safety triage console: Priority alerts (Low/Medium/High/Critical), acknowledge, and resolve with audit notes.
- `/admin/complaints` — Customer complaints and replacement worker approvals.
- `/admin/categories` — 12 home service categories and base rate benchmarks.
- `/admin/transactions` — Escrow financial ledger with platform fee analysis.
- `/admin/activity` — Chronological audit trail with filter by category and "Reset Demo to Defaults" button.

---

## 🔒 Prototype Boundaries & Ethical Disclaimers

1. **Simulated Records**: All customer profiles, worker personas, reviews, transactions, and verification records are fictional demonstration data.
2. **Doorstep Arrival OTP**: The 4-digit OTP (e.g. `4821`) is simulated locally to demonstrate the arrival verification workflow.
3. **No False Emergency Claims**: The "SOS / I Need Help" action generates an operations alert inside the Admin dashboard. It does **not** call 112 or dispatch emergency personnel.
4. **Data Privacy**: No real government identity numbers (Aadhaar/PAN) are uploaded or handled. Customer addresses are kept private and masked on public listings.
5. **No Universal "100% Safe" Guarantee**: KaamSetu never guarantees zero risk. We provide transparent evidence, escrow safeguards, and prompt human mediation.

---

## 🔮 Future Production Backend Architecture

To connect this frontend prototype to a production cloud backend:
1. **API Layer**: Replace `AppDataContext` and `mockData.js` with Axios / React Query fetching from Node.js (Express / Fastify) or Go microservices.
2. **Real-time WebSockets**: Implement Socket.io for live in-app chat, arrival OTP updates, and real-time operations safety alerts.
3. **Identity Verification**: Integrate Digilocker / UIDAI Aadhaar e-KYC APIs and third-party police verification aggregators.
4. **Telephony & Masked Calling**: Connect Twilio or Exotel for virtual numbers and SMS OTP dispatch.
5. **Payment Gateway**: Integrate Razorpay / Cashfree for UPI autopay and automated escrow splits.
