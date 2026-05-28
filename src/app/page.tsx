import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import RealityCheck from '@/components/landing/RealityCheck';
import BeforeAfter from '@/components/landing/BeforeAfter';
import WomensPerspective from '@/components/landing/WomensPerspective';
import ProductMockups from '@/components/landing/ProductMockups';
import PricingSection from '@/components/landing/PricingSection';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0B] text-foreground overflow-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <RealityCheck />
        <BeforeAfter />
        <WomensPerspective />
        <ProductMockups />
        <PricingSection />
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
