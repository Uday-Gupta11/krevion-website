import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import * as Icons from "lucide-react";
import Section from "./CommonSections";
import { QUALITY_TIMELINE, STATS } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export { ExportMarkets } from "./ExportMarketsMap";

export const QualityTimeline = () => (
  <Section
    id="quality"
    eyebrow="Quality Commitment"
    title="A disciplined journey from molecule to market"
    subtitle="Every product is shepherded through five rigorous stages, each backed by documentation, testing and traceability."
  >
    <div className="relative" data-testid="quality-timeline">
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-krevion-teal/30 via-krevion-teal/60 to-krevion-teal/30 md:-translate-x-1/2" />
      <motion.ol initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="space-y-10 md:space-y-16">
        {QUALITY_TIMELINE.map((q, i) => {
          const Ico = Icons[q.icon] || Icons.Circle;
          const right = i % 2 === 1;
          return (
            <motion.li
              key={q.step}
              variants={fadeUp}
              className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${right ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className={`md:px-2 ${right ? "md:text-left" : "md:text-right"} pl-16 md:pl-0`}>
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-krevion-teal font-semibold mb-2">
                  Stage 0{i + 1}
                </div>
                <h3 className="font-heading text-2xl font-semibold text-krevion-navy">{q.step}</h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-md md:max-w-none md:inline-block">{q.desc}</p>
              </div>
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-krevion-teal flex items-center justify-center shadow-lg">
                <Ico className="h-5 w-5 text-krevion-navy" strokeWidth={1.6} />
              </div>
              <div className="hidden md:block" />
            </motion.li>
          );
        })}
      </motion.ol>
    </div>
  </Section>
);

const Counter = ({ value, suffix }) => {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();
    const tick = (t) => {
      const p = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * value));
      if (p < 1) requestAnimationFrame(tick);
      else setN(value);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return <span ref={ref}>{n}{suffix}</span>;
};

export const StatsSection = () => (
  <section className="py-20 md:py-24 bg-krevion-navy text-white relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.06]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(24,183,176,0.4),transparent_40%),radial-gradient(circle_at_70%_50%,rgba(54,194,193,0.4),transparent_40%)]" />
    </div>
    <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
      <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-8" data-testid="stats-grid">
        {STATS.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="text-center md:text-left">
            <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-krevion-accent font-semibold">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export const ExportMarketsOld_UNUSED = () => null;

export const CTASection = () => (
  <section className="relative py-24 md:py-28 overflow-hidden bg-gradient-to-br from-krevion-navy via-krevion-navy to-[#06214f] text-white">
    <div className="absolute inset-0 opacity-10">
      <img src="https://images.unsplash.com/photo-1605745341112-85968b19335b?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000" alt="" className="w-full h-full object-cover" />
    </div>
    <div className="relative max-w-5xl mx-auto px-6 lg:px-12 text-center">
      <div className="text-xs uppercase tracking-[0.25em] text-krevion-accent font-semibold mb-5">Partner With Exelvia</div>
      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
        Need a reliable pharmaceutical export partner?
      </h2>
      <p className="mt-6 text-base sm:text-lg text-white/75 max-w-2xl mx-auto">
        Whether you are a distributor, importer or government tender, we deliver internationally compliant products with the documentation you need.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a href="/quotation" data-testid="cta-quotation-btn" className="inline-flex items-center gap-2 bg-white text-krevion-navy font-semibold px-7 py-4 rounded-full hover:bg-krevion-teal hover:text-white hover:-translate-y-1 transition-all">
          Request Quotation <Icons.ChevronRight className="h-4 w-4" />
        </a>
        <a href="/contact" data-testid="cta-partner-btn" className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-7 py-4 rounded-full hover:bg-white hover:text-krevion-navy hover:-translate-y-1 transition-all">
          Become a Distribution Partner
        </a>
      </div>
    </div>
  </section>
);
