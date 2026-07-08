import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { WHY_CHOOSE } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const Section = ({ id, eyebrow, title, subtitle, children, dark, bgClass = "" }) => (
  <section id={id} className={`py-20 md:py-28 ${dark ? "bg-krevion-navy text-white" : "bg-white"} ${bgClass}`}>
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={stagger}
        className="max-w-3xl mb-14"
      >
        {eyebrow && (
          <motion.div variants={fadeUp} className={`text-xs uppercase tracking-[0.22em] font-semibold mb-4 ${dark ? "text-krevion-accent" : "text-krevion-teal"}`}>
            {eyebrow}
          </motion.div>
        )}
        <motion.h2 variants={fadeUp} className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${dark ? "text-white" : "text-krevion-navy"}`}>
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p variants={fadeUp} className={`mt-5 text-base sm:text-lg leading-relaxed ${dark ? "text-white/75" : "text-gray-600"}`}>
            {subtitle}
          </motion.p>
        )}
      </motion.div>
      {children}
    </div>
  </section>
);

export const CompanyOverview = () => (
  <Section
    id="overview"
    eyebrow="About KREVION"
    title="An export-focused pharmaceutical company"
    subtitle="KREVION Healthcare Pvt. Ltd. is an export-focused pharmaceutical company supplying high-quality formulations to healthcare providers, distributors and government tenders worldwide. We bring together rigorous quality systems, regulatory expertise and a partner-first mindset to make global healthcare sourcing more efficient, dependable and accessible."
  >
    <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="grid md:grid-cols-3 gap-6 mt-4">
      {[
        { icon: "Target", label: "Vision", text: "A globally trusted healthcare export partner connecting quality products with markets worldwide." },
        { icon: "Compass", label: "Mission", text: "High-quality products meeting international standards with transparency and timely delivery." },
        { icon: "HeartHandshake", label: "Purpose", text: "Improving access to quality healthcare products across borders." },
      ].map((c) => {
        const Ico = Icons[c.icon] || Icons.Circle;
        return (
          <motion.div key={c.label} variants={fadeUp} className="group bg-white rounded-2xl border border-gray-100 p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-krevion-light flex items-center justify-center mb-5 text-krevion-teal group-hover:bg-krevion-teal group-hover:text-white transition-colors">
              <Ico className="h-5 w-5" strokeWidth={1.6} />
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-krevion-teal font-semibold">{c.label}</div>
            <p className="mt-3 text-krevion-dark leading-relaxed text-sm">{c.text}</p>
          </motion.div>
        );
      })}
    </motion.div>
  </Section>
);

export const WhyChoose = () => (
  <Section
    id="why-choose"
    eyebrow="Why KREVION"
    title="A reliable partner for global healthcare sourcing"
    subtitle="Six commitments that define every KREVION engagement — from procurement to delivery at destination."
    bgClass="bg-krevion-light"
  >
    <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="why-choose-grid">
      {WHY_CHOOSE.map((item) => {
        const Ico = Icons[item.icon] || Icons.Circle;
        return (
          <motion.div key={item.title} variants={fadeUp} data-testid={`why-card-${item.title.toLowerCase().replace(/\s/g, "-")}`} className="group bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-krevion-teal/5 rounded-full -mr-12 -mt-12 group-hover:bg-krevion-teal/10 transition-colors" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-krevion-navy text-white flex items-center justify-center mb-6 group-hover:bg-krevion-teal transition-colors">
                <Ico className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading font-semibold text-krevion-navy text-lg mb-3">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  </Section>
);

export default Section;
