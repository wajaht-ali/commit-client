/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full h-screen text-blue-500 flex flex-col items-center justify-center'>
      <p className='text-3xl font-semibold animate-bounce'>Commit: Your AI Code Buddy...</p>
      <p className='text-2xl font-semibold text-red-500 animate-pulse shadow-sm shadow-red-300'>Comming Soon!</p>
    </div>
  )
}

export default App
