import HeroSection from '@/components/landing/HeroSection'
import StatsSection from '@/components/landing/StatsSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import ChartSection from '@/components/landing/ChartSection'
import PricingSection from '@/components/landing/PricingSection'
import CTASection from '@/components/landing/CTASection'

export default function LandingPage() {
    return (
        <>
            <HeroSection />
            <StatsSection />
            <FeaturesSection />
            <ChartSection />
            <PricingSection />

            <CTASection />
        </>
    )
}