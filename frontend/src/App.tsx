import { useState } from 'react'
import Button from '@/components/Button'
function App() {

  return (
    <>
      <div className='min-h-screen flex items-center justify-center gap-4 p-8'>
        <div className='space-y-4'>
          <h1 className='text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>Finance Tracker</h1>

          <div className='flex gap-3'>
            <Button variant='primary'>Primary</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
          </div>

          <div className='flex gap-3'>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>

          <Button disabled>Disabled</Button>
        </div>
      </div>
    </>
  )
}

export default App
