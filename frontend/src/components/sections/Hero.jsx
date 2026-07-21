import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, MousePointer2 } from "lucide-react";
import { IMAGES, COMPANY } from "@/lib/data";

const Hero = () => {
  return (
    <section data-testid="hero-section" className="relative min-h-screen pt-20 overflow-hidden bg-white molecular-bg">
      <div className="absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-krevion-light" />
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-[0.07]">
          <img src={IMAGES.hero} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 min-h-[calc(100vh-80px)] grid lg:grid-cols-2 gap-12 items-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-krevion-teal/10 border border-krevion-teal/20 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-krevion-teal animate-pulse" />
            <span className="text-xs uppercase tracking-[0.18em] text-krevion-navy font-semibold">{COMPANY.tagline}</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-krevion-navy leading-[1.05] tracking-tight">
            Delivering Trusted{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Healthcare</span>
              <span className="absolute -bottom-1 left-0 right-0 h-2 bg-krevion-teal/30 -z-0" />
            </span>{" "}
            Solutions Beyond Borders
          </h1>

          <p className="mt-7 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
            Exelvia Healthcare delivers internationally compliant pharmaceutical and healthcare products through innovation, quality assurance, and reliable global partnerships.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/products"
              data-testid="hero-explore-products-btn"
              className="inline-flex items-center gap-2 bg-krevion-navy text-white font-semibold px-7 py-4 rounded-full hover:bg-krevion-teal hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              Explore Products <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              to="/quotation"
              data-testid="hero-quotation-btn"
              className="inline-flex items-center gap-2 border-2 border-krevion-navy text-krevion-navy font-semibold px-7 py-4 rounded-full hover:bg-krevion-navy hover:text-white hover:-translate-y-1 transition-all duration-300"
            >
              Request Quotation
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-8 text-xs uppercase tracking-[0.18em] text-gray-500 font-semibold">
            <div className="flex items-center gap-2"><span className="w-6 h-px bg-krevion-teal" /> Global Exports</div>
            <div className="flex items-center gap-2"><span className="w-6 h-px bg-krevion-teal" /> Quality First</div>
            <div className="hidden sm:flex items-center gap-2"><span className="w-6 h-px bg-krevion-teal" /> Compliance</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img src={IMAGES.laboratory} alt="Pharmaceutical laboratory" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-krevion-navy/70 via-krevion-navy/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl">
              <div className="text-[10px] uppercase tracking-[0.2em] text-krevion-teal font-semibold mb-1">Quality Assurance</div>
              <div className="font-heading font-semibold text-krevion-navy">Internationally Compliant Facilities</div>
              <div className="text-xs text-gray-600 mt-1">Stringent pharmaceutical quality management systems.</div>
            </div>
          </div>
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden xl:block">
            <img src={IMAGES.microscope} alt="Research microscope" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-krevion-navy/60">
        <MousePointer2 className="h-4 w-4 animate-scroll-bounce" />
        <div className="text-[10px] uppercase tracking-[0.2em]">Scroll</div>
      </div>
    </section>
  );
};

export default Hero;
