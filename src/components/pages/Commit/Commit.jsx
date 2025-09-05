import React from 'react'
import { Link } from 'react-router-dom'
import Editor from '../../../Monaco/MyEditor.jsx'

function Commit() {
  return (
    <>
        {/* here will be commit page for pair programming */}
        <header className='shadow sticky z-50 top-0'>
        <nav className='flex justify-between items-center p-4 max-w-7xl mx-auto'>
          <div >
            <h1>Commit </h1>
          </div>
          <div className='flex gap-4'>
            <button className='bg-gray-500 text-white px-4 py-2 rounded'><a href=''>Save</a></button>
            <button className='bg-gray-500 text-white px-4 py-2 rounded'><a href=''>Settings</a></button>
            <button className='bg-blue-500 text-white px-4 py-2 rounded'><a href='/signup'>SignUp</a></button>
            <button className='bg-gray-500 text-white px-4 py-2 rounded'><a href='/login'>Login</a></button>

          </div>
          </nav>
          </header>

            <main className='w-full h-screen p-4 mt-4 mb-6'>
              <Editor />
            </main>
    </>
  )
}

export default Commit