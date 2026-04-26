'use client'
import HeroSection from '@/components/landing/HeroSection'
import StatsBar from '@/components/landing/StatsBar'
import ProtocolCarousel from '@/components/landing/ProtocolCarousel'
import CommandShowcase from '@/components/landing/CommandShowcase'
import HowItWorks from '@/components/landing/HowItWorks'
import ExplorerPreview from '@/components/landing/ExplorerPreview'
import ComparisonTable from '@/components/landing/ComparisonTable'
import MonetizationSection from '@/components/landing/MonetizationSection'
import DeveloperSection from '@/components/landing/DeveloperSection'
import TrustSection from '@/components/landing/TrustSection'
import AuditSection from '@/components/landing/AuditSection'
import CTASection from '@/components/landing/CTASection'
import Footer from '@/components/landing/Footer'
import ParallaxBackground from '@/components/ui/ParallaxBackground'
import GlobalEffects from '@/components/ui/GlobalEffects'
import ScrollFrame from '@/components/ui/ScrollFrames'
import TechnicalSpacer from '@/components/ui/TechnicalSpacer'
import ZoomTextSection from '@/components/landing/ZoomTextSection'
import StackedLottieCards from '@/components/landing/StackedLottieCards'
import TransparentInfrastructure from '@/components/landing/TransparentInfrastructure'

export default function HomePage() {
  return (
    <main className="relative text-white selection:bg-primary/20 selection:text-primary min-h-screen">
      <GlobalEffects />
      <ParallaxBackground />
      
      <HeroSection />
      
      <TechnicalSpacer />

      <div className="relative z-10 px-4 md:px-10 lg:px-20">
        <ScrollFrame index={1}><StatsBar /></ScrollFrame>
        <TechnicalSpacer />
        <ScrollFrame index={2}><CommandShowcase /></ScrollFrame>
        <ScrollFrame index={3}><ProtocolCarousel /></ScrollFrame>
      </div>

      {/* New Stacked Lottie Narrative */}
      <StackedLottieCards />

      <div className="relative z-10 px-4 md:px-10 lg:px-20">
        <ScrollFrame index={4}><TransparentInfrastructure /></ScrollFrame>
        <TechnicalSpacer />
        <ScrollFrame index={5}><MonetizationSection /></ScrollFrame>
        <ScrollFrame index={6}><DeveloperSection /></ScrollFrame>
        <ScrollFrame index={7}><ComparisonTable /></ScrollFrame>
      </div>

      {/* Extreme Cinematic Transition */}
      <ZoomTextSection 
        text={`The\nSovereign\nShift.`} 
        subtitle="TRANSITION_PROTOCOL_V2" 
      />

      <div className="relative z-10 px-4 md:px-10 lg:px-20">
        <ScrollFrame index={8}><AuditSection /></ScrollFrame>
        <ScrollFrame index={9}><TrustSection /></ScrollFrame>
      </div>

      <CTASection />
      <Footer />
    </main>
  )
}
