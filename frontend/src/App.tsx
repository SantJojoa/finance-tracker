import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './components/landing/HeroSection'
import StatsSection from './components/landing/StatsSection'
import FeaturesSection from './components/landing/FeaturesSection'
import ChartSection from './components/landing/ChartSection'

function App() {

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">
      <Header />

      <main className='flex-1'>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <ChartSection />
      </main>
      <Footer />
    </div>

  )
}

export default App
