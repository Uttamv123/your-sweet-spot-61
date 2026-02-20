import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUs />
        <ProcessSection />
        <PortfolioSection />
        <PricingSection />
        <ContactSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
