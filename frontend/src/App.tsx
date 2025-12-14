import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './components/landing/HeroSection'

function App() {

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">
      <Header />

      <main className='flex-1'>
        <HeroSection />
      </main>
      <Footer />
    </div>

  )
}

export default App
