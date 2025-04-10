import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";

import { ShowreelSection } from "@/components/showreel-section";
import { AchievementsSection } from "@/components/achievements-section";
import { PricingSection } from "@/components/pricing-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  useEffect(() => {
    document.title = "Vish VFX | Premium Video Editing";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <HeroSection />
      <ShowreelSection />
      <AboutSection />
      <AchievementsSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
