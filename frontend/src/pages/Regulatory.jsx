import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { PageHero } from "./About";
import { IMAGES } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const Regulatory = () => (
  <main data-testid="regulatory-page">
    <PageHero
      eyebrow="Regulatory Support"
      title="Documentation that travels with every shipment"
      subtitle="Comprehensive regulatory support to facilitate product registration, market entry and ongoing lifecycle compliance."
      image={IMAGES.laboratory}
    />

    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { i: "FileStack", t: "CTD Dossier", d: "Common Technical Document compilation aligned to ICH structure." },
            { i: "Files", t: "ACTD", d: "ASEAN Common Technical Document for SE Asian markets." },
            { i: "BookCheck", t: "Product Registration", d: "End-to-end registration support across destination markets." },
            { i: "ClipboardCheck", t: "Certificate of Analysis", d: "Batch-specific CoA aligned to finished-product specifications." },
            { i: "ClipboardList", t: "Product Specifications", d: "Detailed specifications meeting pharmacopoeial standards." },
            { i: "LineChart", t: "Stability Data", d: "Long-term and accelerated stability data per ICH guidelines." },
            { i: "ShieldAlert", t: "MSDS", d: "Material Safety Data Sheets for handling and transport." },
            { i: "Plane", t: "Export Documentation", d: "Pro-forma invoices, packing lists, certificates of origin and more." },
          ].map((c) => {
            const Ico = Icons[c.i] || Icons.File;
            return (
              <motion.div key={c.t} variants={fadeUp} data-testid={`reg-card-${c.t.toLowerCase().replace(/\s/g, "-")}`} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-krevion-navy text-white flex items-center justify-center mb-4"><Ico className="h-5 w-5" /></div>
                <div className="font-heading font-semibold text-krevion-navy text-sm">{c.t}</div>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{c.d}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-12 bg-krevion-light rounded-2xl p-7 border border-gray-100">
          <div className="text-xs uppercase tracking-[0.22em] text-krevion-teal font-semibold mb-3">Important Note</div>
          <p className="text-sm text-gray-600 leading-relaxed">
            KREVION provides regulatory and documentation support for products manufactured in internationally compliant facilities under stringent pharmaceutical quality management systems. We do not claim ownership of third-party certificates. All certifications and approvals are attributed to the respective manufacturing facilities and authorities.
          </p>
        </div>
      </div>
    </section>
  </main>
);

export default Regulatory;
