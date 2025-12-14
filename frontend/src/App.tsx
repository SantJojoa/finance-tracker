import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function App() {

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">
      <Header />

      <main className='py-20 flex-1'>
        <div className='max-w-7xl mx-auto px-4'>
          <h1 className="text-5xl font-bold mb-4">Finance Tracker</h1>
          <p className="text-text-dim text-lg">Probando estilos</p>
        </div>
      </main>
      <Footer />
    </div>

  )
}

export default App
