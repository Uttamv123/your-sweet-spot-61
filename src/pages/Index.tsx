import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ProblemSection from "@/components/ProblemSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSection from "@/components/ProcessSection";

import TechStackSection from "@/components/TechStackSection";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import FloatingBubbles from "@/components/FloatingBubbles";
import AmbientBackground from "@/components/AmbientBackground";
import { SectionConnector, SectionGlow } from "@/components/SectionFlow";

const Index = () => {
  const location = useLocation();

  // When navigated here from another page with a target section (e.g. clicking
  // "Services" in the navbar while on /team), scroll to that section after mount.
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      // Give the page a moment to fully render before scrolling
      const timer = setTimeout(() => {
        const el = document.getElementById(state.scrollTo!);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return () => clearTimeout(timer);
    }
  return (
    <div className="min-h-screen bg-background relative">
      <AmbientBackground />
      <FloatingBubbles />
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <SectionConnector />
        <div className="relative">
          <SectionGlow position="right" color="primary" />
          <ProblemSection />
        </div>
        <SectionConnector variant="accent" />
        <div className="relative">
          <SectionGlow position="left" color="secondary" />
          <AboutSection />
        </div>
        <SectionConnector />
        <div className="relative">
          <SectionGlow position="right" color="primary" />
          <ServicesSection />
        </div>
        <SectionConnector variant="accent" />
        <WhyChooseUs />
        <SectionConnector />
        <div className="relative">
          <SectionGlow position="center" color="secondary" />
          <ProcessSection />
        </div>
        <SectionConnector />
        <TechStackSection />
        <SectionConnector variant="accent" />
        <div className="relative">
          <SectionGlow position="right" color="secondary" />
          <LeadMagnetSection />
        </div>
        <SectionConnector />
        <FaqSection />
        <SectionConnector variant="accent" />
        <ContactSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
