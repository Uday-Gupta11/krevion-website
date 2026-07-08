import React from "react";
import Hero from "@/components/sections/Hero";
import { CompanyOverview, WhyChoose } from "@/components/sections/CommonSections";
import { ProductCategories, TherapeuticSegments } from "@/components/sections/Categories";
import { QualityTimeline, StatsSection, ExportMarkets, CTASection } from "@/components/sections/Showcase";

const Home = () => (
  <main data-testid="home-page">
    <Hero />
    <CompanyOverview />
    <WhyChoose />
    <ProductCategories />
    <TherapeuticSegments />
    <QualityTimeline />
    <ExportMarkets />
    <StatsSection />
    <CTASection />
  </main>
);

export default Home;
