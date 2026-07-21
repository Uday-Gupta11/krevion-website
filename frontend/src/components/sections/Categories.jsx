import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import Section from "./CommonSections";
import { MANUFACTURING_CAPABILITIES, THERAPEUTIC_SEGMENTS } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export const ProductCategories = () => (
  <Section
    id="capabilities"
    eyebrow="Manufacturing Capabilities"
    title="Comprehensive dosage forms for every therapy"
    subtitle="Ten integrated manufacturing capabilities spanning solid, liquid, semi-solid, sterile and unit-dose formats — engineered for global markets."
  >
    <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4" data-testid="product-categories-grid">
      {MANUFACTURING_CAPABILITIES.map((c) => {
        const Ico = Icons[c.icon] || Icons.Pill;
        return (
          <motion.div key={c.slug} variants={fadeUp}>
            <Link
              to={`/products?cat=${c.slug}`}
              data-testid={`category-card-${c.slug}`}
              className="group block bg-white rounded-2xl border border-gray-100 p-5 hover:border-krevion-teal hover:shadow-lg transition-all duration-300 h-full"
            >
              <div className="w-11 h-11 rounded-xl bg-krevion-light text-krevion-teal flex items-center justify-center mb-4 group-hover:bg-krevion-teal group-hover:text-white transition-colors">
                <Ico className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <div className="font-heading font-semibold text-krevion-navy text-sm">{c.name}</div>
              <div className="text-[10px] uppercase tracking-wider text-krevion-teal font-semibold mt-0.5 mb-2 leading-tight line-clamp-2">{c.technical}</div>
              <div className="text-[11px] text-gray-500 leading-snug line-clamp-2">{c.desc}</div>
              <div className="mt-3 inline-flex items-center text-[11px] font-semibold text-krevion-teal uppercase tracking-wider gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <Icons.ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  </Section>
);

export const TherapeuticSegments = () => (
  <Section
    id="therapeutic"
    eyebrow="Therapeutic Segments"
    title="Coverage across leading therapy areas"
    subtitle="From critical care to wellness, Exelvia supports partners with formulations spanning seventeen therapeutic categories."
    bgClass="bg-krevion-light"
  >
    <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3" data-testid="therapeutic-segments-grid">
      {THERAPEUTIC_SEGMENTS.map((t) => {
        const Ico = Icons[t.icon] || Icons.Circle;
        return (
          <motion.div
            key={t.name}
            variants={fadeUp}
            data-testid={`therapeutic-card-${t.name.toLowerCase().replace(/\s/g, "-")}`}
            className="group relative bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-3 hover:bg-krevion-navy hover:border-krevion-navy transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="w-9 h-9 rounded-lg bg-krevion-light text-krevion-teal group-hover:bg-white/10 group-hover:text-krevion-accent flex items-center justify-center shrink-0 transition-colors">
              <Ico className="h-4 w-4" strokeWidth={1.6} />
            </div>
            <div className="text-xs sm:text-sm font-medium text-krevion-navy group-hover:text-white transition-colors">{t.name}</div>
          </motion.div>
        );
      })}
    </motion.div>
  </Section>
);
