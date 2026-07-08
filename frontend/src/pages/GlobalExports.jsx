import React from "react";
import { PageHero } from "./About";
import { IMAGES } from "@/lib/data";
import { ExportMarkets, StatsSection, CTASection } from "@/components/sections/Showcase";

const GlobalExports = () => (
  <main data-testid="global-exports-page">
    <PageHero
      eyebrow="Global Exports"
      title="Connecting healthcare across continents"
      subtitle="A focused export operation spanning six high-growth regions, supported by tailored documentation, logistics and partner enablement."
      image={IMAGES.shipping}
    />
    <ExportMarkets />
    <StatsSection />
    <CTASection />
  </main>
);

export default GlobalExports;
