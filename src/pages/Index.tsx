import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";

const Index = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-amber-500/20 blur-[120px] pointer-events-none animate-blob" />
      <div className="absolute top-[500px] right-[-200px] w-[600px] h-[600px] rounded-full bg-primary/15 blur-[120px] pointer-events-none animate-blob-delay" />
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
      <HeroSection onOpenAuth={() => setIsAuthOpen(true)} />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection onOpenAuth={() => setIsAuthOpen(true)} />
      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export default Index;