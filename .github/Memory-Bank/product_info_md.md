# About the Product --- AI Usage Guide

This document defines the product vision, audience, purpose, and evolving direction of the application.

It provides **contextual memory** for the AI to ensure all code and features align with the product's goals and identity.

---

## 🧠 AI Interaction Rules

1. **Always review this document before implementing, refactoring, or suggesting new features.**
   Use this file to align development choices with the product's intent, tone, and audience.

2. **When updating or refining product details:**
   - Edit only the relevant sections (Purpose, Target Audience, etc.).
   - Maintain the existing Markdown heading structure.
   - Avoid removing historical context unless it's outdated or replaced with updated data.
   - When a major change occurs (like a new direction or rebrand), summarize it in the "Product Evolution Log."

3. **When adding new information:**
   - Place it under the correct section heading.
   - Use clear, concise, human-readable language.
   - Maintain professional tone and formatting consistency.

4. **Do not change section titles or structure.**
   - Keep this format intact so the AI can reliably read and update fields.

5. **Use dates for all updates.**
   - Include timestamps in "Product Evolution Log" whenever meaningful updates occur.

---

## 📋 Product Information Schema

---

## 🎯 Product Name

**Miami DJ & Live Music Entertainment Platform**

---

## 🎯 Purpose / Mission

Create a streamlined digital booking experience for Miami-based event entertainment services. The platform eliminates the friction of traditional booking processes by providing an intuitive, modern interface where clients can specify their exact entertainment needs, event details, and technical requirements in one comprehensive form. The product bridges the gap between clients seeking professional entertainment and a premier Miami DJ/live music company, making the booking process transparent, efficient, and enjoyable.

---

## 👥 Target Audience

**Primary Users:**
- Event planners organizing corporate events, weddings, private parties, and social gatherings in the Miami metropolitan area
- Individual clients (ages 25-55) hosting milestone celebrations (weddings, anniversaries, birthday parties)
- Corporate event coordinators booking entertainment for conferences, galas, and team events
- Hospitality venues seeking entertainment partnerships

**User Characteristics:**
- Tech-savvy individuals comfortable with online booking
- Value quality entertainment and professional service
- Event sizes ranging from intimate gatherings (10-50 guests) to large-scale events (500+ guests)
- Primarily mobile users (60%+ expected mobile traffic)
- Seeking premium entertainment with customizable packages

---

## 💎 Core Value Proposition

**What Makes This Platform Unique:**

1. **Comprehensive Entertainment Selection** - Single platform offering DJ services, live bands, lighting/smoke shows, and audio production with flexible combination options

2. **Miami-Centric Design** - Aesthetic and functionality tailored specifically to Miami's vibrant entertainment culture with ocean-inspired colors and sunset energy

3. **Intelligent Form Design** - Multi-step booking process with real-time validation reduces errors and abandonment while gathering all necessary information upfront

4. **Visual Mood Customization** - Day/Night mode toggle transforms the entire experience, allowing users to interact with the brand in their preferred aesthetic

5. **Technical Transparency** - Unique audio setup selection (Direct/Party Mode vs Indirect/Ambient) educates clients while capturing critical technical requirements

6. **Instant Confirmation** - Automated email notifications provide immediate peace of mind and booking confirmation

**Competitive Advantages:**
- Modern, app-like experience vs. traditional contact forms
- Persistent navigation with smooth interactions
- Mobile-first responsive design
- Professional legitimacy through polished digital presence

---

## 🚀 MVP Objective

**Core MVP Goal:** Launch a fully functional booking platform that captures 100+ bookings within the first 3 months with minimal form abandonment (<5%) and fast completion times (<3 minutes).

**Minimum Viable Feature Set:**

1. **Persistent Navigation System**
   - Fixed header with logo, navigation links, and theme toggle
   - Smooth scroll behavior with active page indicators
   - Responsive hamburger menu for mobile devices

2. **Day/Night Mode Toggle**
   - User preference persistence via localStorage
   - Smooth visual transitions across all pages
   - Complete color scheme transformation

3. **Four Core Pages**
   - Home: Hero section with video background, value proposition, CTAs
   - Services: Visual cards showcasing DJ, live bands, lighting, audio production
   - Book Now: Comprehensive booking form (primary conversion point)
   - Contact: Company information and Miami location details

4. **Comprehensive Booking Form**
   - 8 required fields capturing event details, entertainment preferences, and client information
   - Multi-step progress with visual indicators
   - Real-time validation with helpful error messages
   - Confirmation page with booking summary
   - Automated email notifications to both client and company

5. **Database Integration**
   - Secure storage of booking requests
   - Basic admin view for managing inquiries
   - Status tracking system

6. **Responsive Design**
   - Mobile-first approach
   - Tablet and desktop optimizations
   - Touch-friendly interactions

**Explicitly Excluded from MVP:**
- Payment processing integration
- Live calendar availability checking
- Client dashboard or booking management portal
- Video/photo gallery systems
- Multi-language support
- Advanced analytics dashboards

---

## 🔮 Long-Term Vision

**Phase 2 Enhancements (Post-MVP):**
- Integrated payment processing with deposits and installment options
- Real-time calendar synchronization showing available dates
- Client portal for booking management, document uploads, and communication
- Dynamic pricing calculator based on event parameters
- Video portfolio gallery with filterable categories
- Photo showcase with event type categorization
- Customer review and testimonial system
- Email marketing integration for follow-ups

**Phase 3 Expansion:**
- Mobile native apps (iOS/Android)
- AI-powered entertainment recommendations based on event type
- Virtual event planning consultation booking
- Vendor partner integrations (venues, catering, photography)
- Multi-city expansion beyond Miami
- Advanced analytics for business intelligence
- CRM integration for client relationship management
- Social media integration for instant sharing

**Future Business Directions:**
- White-label platform for other entertainment companies
- Marketplace model connecting multiple entertainment vendors
- Subscription-based venue partnership program
- Event planning concierge service expansion

---

## 🎨 Design & Experience Principles

**Core Design Philosophy:**
- **Miami-Inspired Aesthetic** - Ocean teal and sunset coral creating emotional connection to Miami's entertainment culture
- **Elegant Simplicity** - Modern serif headings paired with clean sans-serif body copy for sophistication without pretension
- **Smooth Interactions** - Consistent 300ms transitions creating app-like fluidity
- **Split-Screen Layouts** - Bold visual hierarchy with balanced content distribution
- **Backdrop Blur Effects** - Modern glassmorphism for depth and premium feel

**User Experience Guidelines:**
- **Mobile-First Approach** - Design and develop for mobile before scaling up
- **Progressive Disclosure** - Multi-step forms reveal complexity gradually
- **Real-Time Feedback** - Immediate validation and confirmation at every interaction point
- **Clear Visual Hierarchy** - Typography and spacing guide users naturally through content
- **Accessibility Standards** - WCAG 2.1 AA compliance minimum
- **Performance Priority** - Sub-3-second load times, smooth 60fps animations
- **Persistent Navigation** - Users always know where they are and can navigate freely

**Color Psychology:**
- Deep Teal/Cyan (Primary) - Trust, professionalism, Miami ocean
- Warm Coral (Accent) - Energy, celebration, Miami sunset
- Charcoal (Dark Mode) - Sophistication, elegance
- Neon Highlights (Dark Mode) - Nightlife, excitement, entertainment

---

## 🛠 Technical Overview

**Frontend Stack:**
- **Framework:** Next.js 15 with App Router (React 18+)
- **Styling:** Tailwind CSS v4 with custom Miami-inspired theme
- **Animations:** Framer Motion for smooth transitions and micro-interactions
- **Forms:** React Hook Form + Zod for validation and type safety
- **State Management:** React Context API for theme management
- **Icons:** Lucide React or Heroicons

**Backend Stack:**
- **API Layer:** Next.js Route Handlers (API Routes)
- **Database:** Supabase (PostgreSQL) for relational data storage
- **Authentication:** Supabase Auth (for future admin portal)
- **Email Service:** Resend for transactional email delivery
- **File Storage:** Supabase Storage (for future media uploads)

**Development Tools:**
- **Package Manager:** pnpm or npm
- **TypeScript:** Strict mode for type safety
- **Linting:** ESLint with Next.js configuration
- **Formatting:** Prettier with Tailwind plugin
- **Version Control:** Git with conventional commits

**Deployment & Hosting:**
- **Platform:** Vercel (optimized for Next.js)
- **Domain:** Custom domain with SSL
- **CDN:** Vercel Edge Network
- **Environment Variables:** Secure secret management
- **CI/CD:** Automated deployments on git push

**Performance Targets:**
- Lighthouse Score: 90+ across all metrics
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Core Web Vitals: All "Good" ratings

---

## 🏗 Product Structure Overview

**Page Architecture:**

1. **Home Page (`/`)**
   - Hero section with video background
   - Value proposition section
   - Featured services carousel
   - Social proof / testimonials
   - Primary CTA to booking form

2. **Services Page (`/services`)**
   - Service category cards (DJ, Live Bands, Lighting/Smoke, Audio Production)
   - Detailed descriptions with imagery
   - Pricing tier indicators (without specific prices)
   - Secondary CTAs to booking form

3. **Book Now Page (`/book`)**
   - Multi-step booking form (primary conversion point)
   - Progress indicator
   - Real-time validation feedback
   - Confirmation page after submission

4. **Contact Page (`/contact`)**
   - Company information card
   - Miami location map integration
   - Contact methods (email, phone, social)
   - Operating hours
   - Secondary booking form CTA

**Component Architecture:**

- **Layout Components:** Navbar, Footer, ThemeProvider, PageWrapper
- **Form Components:** BookingForm, FormStep, ProgressBar, ValidationMessage
- **UI Components:** Button, Input, Select, Checkbox, RadioGroup, Toggle
- **Feature Components:** ServiceCard, TestimonialCard, HeroSection, ContactForm
- **Utility Components:** ErrorBoundary, LoadingSpinner, SEOHead

**Database Schema:**

```
bookings table:
- id (uuid, primary key)
- event_date (date, not null)
- event_time (time, not null)
- guest_count (integer, not null)
- entertainment_type (text[], not null)
- light_smoke_show (boolean, not null)
- audio_setup (varchar, not null)
- client_name (varchar, not null)
- client_email (varchar, not null)
- client_phone (varchar, not null)
- status (varchar, default: 'pending')
- created_at (timestamp, default: now())
- updated_at (timestamp)
- notes (text)
```

---

## 📅 Product Evolution Log

> *Chronological updates describing how the product concept, goals, or positioning have changed over time.*

- **2025-10-15** --- Initial product concept defined. MVP scope established with focus on booking form as primary conversion mechanism. Miami-inspired design direction confirmed with day/night mode toggle as differentiating feature. Technical stack selected: Next.js 15 + Tailwind CSS v4 + Supabase. Target metrics set: 100+ bookings in 3 months, <5% form abandonment, <3 min completion time.

---

## 📝 File Integrity Notes

- Preserve Markdown headings and section order.
- Keep whitespace between sections.
- Avoid embedding raw code here --- this file is conceptual, not technical.
- AI should write clear, concise, descriptive English.
- Always timestamp meaningful updates.