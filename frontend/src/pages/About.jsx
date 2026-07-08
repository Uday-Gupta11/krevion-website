import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { IMAGES, COMPANY } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const PageHero = ({ eyebrow, title, subtitle, image }) => (
  <section className="relative pt-32 pb-20 bg-krevion-light overflow-hidden">
    <div className="absolute inset-0 opacity-[0.05]">
      <img src={image} alt="" className="w-full h-full object-cover" />
    </div>
    <div className="relative max-w-5xl mx-auto px-6 lg:px-12 text-center">
      <div className="text-xs uppercase tracking-[0.25em] text-krevion-teal font-semibold mb-4">{eyebrow}</div>
      <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-krevion-navy tracking-tight">{title}</h1>
      <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
    </div>
  </section>
);

const About = () => (
  <main data-testid="about-page">
    <PageHero
      eyebrow="About KREVION"
      title="A globally focused pharmaceutical export company"
      subtitle="Built on the values of precision, purity and progress — we connect quality healthcare products with markets worldwide."
      image={IMAGES.researcher}
    />

    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
          <div className="text-xs uppercase tracking-[0.22em] text-krevion-teal font-semibold mb-4">Our Story</div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-krevion-navy">Where ethics, science and access converge</h2>
          <p className="mt-6 text-gray-600 leading-relaxed">
            KREVION was founded with a simple conviction: that high-quality medicines and healthcare products should travel freely across borders, supported by transparent processes and uncompromising standards. We work with internationally compliant manufacturing facilities, leverage technology and AI-driven processes, and build long-term partnerships rooted in trust.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Our team brings together regulatory expertise, supply-chain rigour and a global mindset to make pharmaceutical sourcing simpler for distributors, hospital networks and governments worldwide.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportOnce} transition={{ duration: 0.7 }} className="relative">
          <img src={IMAGES.scientist2} alt="Scientist in lab" className="rounded-3xl shadow-2xl aspect-[4/5] object-cover w-full" />
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100 max-w-xs">
            <div className="text-[10px] uppercase tracking-[0.2em] text-krevion-teal font-semibold">Brand Promise</div>
            <div className="font-heading font-semibold text-krevion-navy mt-1 text-sm">{COMPANY.promise}</div>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="py-20 bg-krevion-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-6">
        {[
          { label: "Vision", text: COMPANY.vision, icon: "Target" },
          { label: "Mission", text: COMPANY.mission, icon: "Compass" },
          { label: "Purpose", text: COMPANY.purpose, icon: "HeartHandshake" },
        ].map((c) => {
          const Ico = Icons[c.icon];
          return (
            <motion.div key={c.label} initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-krevion-navy text-white flex items-center justify-center mb-5"><Ico className="h-5 w-5" /></div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-krevion-teal font-semibold">{c.label}</div>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{c.text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>

    <section className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="text-xs uppercase tracking-[0.22em] text-krevion-teal font-semibold mb-4 text-center">Future Roadmap</div>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-krevion-navy text-center">Building the next chapter</h2>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { y: "Phase I", t: "Establish strong partnerships across the Middle East, Africa and South East Asia.", i: "MapPin" },
            { y: "Phase II", t: "Expand therapeutic portfolio with focus on chronic care, oncology adjuncts and pediatrics.", i: "Layers" },
            { y: "Phase III", t: "Scale technology-driven sourcing platform with AI-assisted demand and regulatory insights.", i: "Cpu" },
          ].map((p) => {
            const Ico = Icons[p.i];
            return (
              <motion.div key={p.y} initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-krevion-light text-krevion-teal flex items-center justify-center mb-4"><Ico className="h-5 w-5" /></div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-krevion-teal font-semibold">{p.y}</div>
                <div className="mt-2 text-sm text-gray-600 leading-relaxed">{p.t}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  </main>
);

export default About;
export { PageHero };
