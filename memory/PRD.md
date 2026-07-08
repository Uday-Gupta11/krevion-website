# KREVION Healthcare Pvt. Ltd. — PRD

## Problem Statement
Build a premium corporate website for KREVION Healthcare Pvt. Ltd. — an export-focused pharmaceutical company. Must communicate trust, scientific excellence, global capability, innovation, and professionalism. Fortune-500 pharma quality, NOT a template. Apple-level UI quality, lots of whitespace, micro animations.

## Tech Stack
- Frontend: React (CRA + Craco), TailwindCSS, Framer Motion, Lucide icons, Shadcn UI, sonner
- Backend: FastAPI + Motor (MongoDB)
- Fonts: Poppins (headings), Inter (body)
- Colors: Navy #0A2D6B / Teal #18B7B0 / Accent #36C2C1 / Light #F5F7FA / Dark #2D2D2D

## Architecture
- React SPA with 9 routes (Home, About, Products, Quality, Private Label, Global Exports, Regulatory, Contact, Quotation)
- FastAPI backend exposing /api endpoints for contact, quotation, newsletter, product inquiry submissions stored in MongoDB
- Static placeholder product catalog (20 products) and 15 categories / 17 therapeutic segments
- Royalty-free Unsplash/Pexels imagery

## Implementation Status (Iteration 1 — 2026-02)
- [x] Premium navbar with sticky behavior, mobile drawer, active link underline
- [x] Hero with split layout, animated scroll indicator, layered images, badge tagline
- [x] Company overview (Vision / Mission / Purpose)
- [x] Why Choose KREVION (6 cards)
- [x] Product Categories grid (15)
- [x] Therapeutic Segments grid (17)
- [x] Quality Timeline (5 stages, alternating)
- [x] Export Markets — illustrative SVG world map + region cards
- [x] Animated statistics counters
- [x] CTA banner + Footer with newsletter, social icons, contact info
- [x] WhatsApp floating button
- [x] About page (story, V/M/P, future roadmap)
- [x] Products page with search, category & segment filters, inquiry dialog
- [x] Quality page (philosophy + timeline + documentation)
- [x] Private Label page (8 capability cards)
- [x] Global Exports page (markets + stats + CTA)
- [x] Regulatory page (8 documentation cards + disclaimer)
- [x] Contact page (form + info + map placeholder + WhatsApp)
- [x] Quotation page (full B2B form)
- [x] Backend endpoints: /api/contact, /api/quotation, /api/newsletter, /api/product-inquiry (POST + listings)
- [x] Toast notifications via Sonner
- [x] data-testid attributes throughout

## Backlog / Next
- P1: Admin dashboard to view submitted forms
- P1: Real Google Maps embed with API key
- P2: Multilingual support (Arabic, Spanish, French)
- P2: Detailed product pages with packaging gallery
- P2: Blog / News / Regulatory updates section
- P2: Live chat integration
- P2: Distributor portal with login

## User Personas
1. International Importer / Distributor — looking for reliable supply
2. Procurement / Tender Authority — looking for documented compliance
3. Hospital Network — looking for therapeutic breadth
