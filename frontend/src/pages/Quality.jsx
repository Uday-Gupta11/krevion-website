import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { PageHero } from "./About";
import { IMAGES, QUALITY_TIMELINE } from "@/lib/data";
import { QualityTimeline } from "@/components/sections/Showcase";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const Quality = () => (
  <main data-testid="quality-page">
    <PageHero
      eyebrow="Quality Commitment"
      title="Engineered for international standards"
      subtitle="Products are manufactured in internationally compliant facilities following stringent pharmaceutical quality management systems."
      image={IMAGES.qcLab}
    />

    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
          <div className="text-xs uppercase tracking-[0.22em] text-krevion-teal font-semibold mb-4">Quality Philosophy</div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-krevion-navy">Built on documented systems, not promises</h2>
          <p className="mt-6 text-gray-600 leading-relaxed">
            Every product Exelvia exports passes through layered checks designed to align with internationally recognised pharmaceutical quality standards. From raw material qualification to finished-product stability, our processes prioritise traceability, batch integrity and customer-specific compliance.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-8">
            {["Manufacturing Excellence", "Quality Assurance", "Regulatory Compliance", "Documentation Support"].map((l) => (
              <div key={l} className="flex items-center gap-2 text-sm text-krevion-navy"><Icons.CheckCircle2 className="h-4 w-4 text-krevion-teal" /> {l}</div>
            ))}
          </div>
        </motion.div>
        <motion.img initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportOnce} transition={{ duration: 0.8 }} src={IMAGES.microscope} alt="Microscope" className="rounded-3xl shadow-2xl aspect-[4/3] object-cover" />
      </div>
    </section>

    <QualityTimeline />

    <section className="py-20 bg-krevion-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-xs uppercase tracking-[0.22em] text-krevion-teal font-semibold mb-4">Documentation Support</div>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-krevion-navy mb-10">Every shipment, fully documented</h2>
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { i: "FileText", t: "Certificate of Analysis" },
            { i: "FileSpreadsheet", t: "Product Specifications" },
            { i: "FileBarChart", t: "Stability Data" },
            { i: "FileWarning", t: "Material Safety Data" },
          ].map((c) => {
            const Ico = Icons[c.i];
            return (
              <motion.div key={c.t} variants={fadeUp} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-krevion-navy text-white flex items-center justify-center mb-4"><Ico className="h-5 w-5" /></div>
                <div className="font-heading font-semibold text-krevion-navy text-sm">{c.t}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  </main>
);

export default Quality;
