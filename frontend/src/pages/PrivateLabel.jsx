import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero } from "./About";
import { IMAGES } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const PrivateLabel = () => (
  <main data-testid="private-label-page">
    <PageHero
      eyebrow="Private Label"
      title="Build your brand with KREVION"
      subtitle="End-to-end private label solutions — from custom branding and artwork to regulatory and international shipping coordination."
      image={IMAGES.packaging}
    />

    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { i: "Palette", t: "Custom Branding", d: "Distinct brand identity, name and visual language for your target market." },
            { i: "PenTool", t: "Artwork", d: "Bilingual and regulatory-compliant artwork design for primary and secondary packaging." },
            { i: "Package2", t: "Packaging", d: "Tailored pack sizes, materials and tamper-evident formats." },
            { i: "ScrollText", t: "Regulatory", d: "Dossier preparation aligned to destination-country requirements." },
            { i: "Factory", t: "Manufacturing Coordination", d: "Liaison with compliant facilities for production scheduling and QC." },
            { i: "Ship", t: "International Shipping", d: "Documented exports with cold-chain handling where applicable." },
            { i: "Boxes", t: "MOQ", d: "Flexible minimum order quantities suited to distributors and tenders." },
            { i: "Gavel", t: "Tender Supply", d: "Specialized support for government and institutional tenders." },
          ].map((c) => {
            const Ico = Icons[c.i] || Icons.Circle;
            return (
              <motion.div key={c.t} variants={fadeUp} data-testid={`pl-card-${c.t.toLowerCase().replace(/\s/g, "-")}`} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-11 h-11 rounded-xl bg-krevion-light text-krevion-teal flex items-center justify-center mb-4"><Ico className="h-5 w-5" strokeWidth={1.6} /></div>
                <div className="font-heading font-semibold text-krevion-navy">{c.t}</div>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{c.d}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>

    <section className="py-16 bg-krevion-navy text-white text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h3 className="font-heading text-2xl sm:text-3xl font-bold">Ready to build your private label portfolio?</h3>
        <Link to="/quotation" className="inline-flex items-center gap-2 mt-6 bg-white text-krevion-navy font-semibold px-7 py-3.5 rounded-full hover:bg-krevion-teal hover:text-white transition-colors">Start a conversation</Link>
      </div>
    </section>
  </main>
);

export default PrivateLabel;
