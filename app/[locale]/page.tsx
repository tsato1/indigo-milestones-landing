import localFont from "next/font/local"

import { TopNavbar } from "./_components/navbar";
import { HeroSection } from "./_components/sections/hero-section";
import { WhyThisAppSection } from "./_components/sections/why-this-app-section";
import { HowItWorksSection } from "./_components/sections/how-it-works-section";
import { FaqSection } from "./_components/sections/faq-section";
import { PricingSection } from "./_components/sections/pricing-section";
import { Footer } from "./_components/sections/footer";

const headingFont = localFont({
  src: "../fonts/PermanentMarker-Regular.ttf",
  preload: false
})

export default async function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      {/* Top Navigation Bar */}
      <TopNavbar />

      {/* Hero Section */}
      <HeroSection headingFont={headingFont} />

      {/* Why Indigo Milestones */}
      <WhyThisAppSection headingFont={headingFont} />

      {/* How it works */}
      <HowItWorksSection />

      {/* FAQ */}
      <FaqSection />

      {/* Pricing */}
      <PricingSection />

      {/* Footer */}
      <Footer headingFont={headingFont} />
    </main>
  );
}
