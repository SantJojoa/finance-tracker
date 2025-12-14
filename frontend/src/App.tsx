import { useState } from 'react'
import Header from './components/layout/Header'
function App() {

  return (
    <div className="min-h-screen bg-dark-bg text-white ">
      <Header />

      <main className='py-20'>
        <div className='max-w-74 mx-auto px-4'>
          <h1 className="text-5xl font-bold mb-4">Finance Tracker</h1>
          <p className="text-text-dim text-lg">Probando estilos</p>

        </div>

      </main>
    </div>

  )
}

export default App
