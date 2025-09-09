import React from 'react'
import { Link } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { useState } from 'react'
import SideBar from '../../Layout/SideBar'

function Commit() {
  const [code, setCode] = useState(`console.log("Hello, world!");`);
    const [output, setOutput] = useState('');
  
    const handleEditorChange = (value) => {
      setCode(value);
    };
  
    const runCode = () => {
      try {
        // Capture console.log output
        let consoleOutput = '';
        const originalConsoleLog = console.log;
        console.log = (...args) => {
          consoleOutput += args.join(' ') + '\n';
        };
  
        // Run the code
        // eslint-disable-next-line no-new-func
        new Function(code)();
  
        // Restore console.log
        console.log = originalConsoleLog;
  
        setOutput(consoleOutput || 'No output');
      } catch (err) {
        setOutput(err.message);
      }
    };
  return (
    <> 
        {/* here will be commit page for pair programming */}
        <header className='shadow sticky z-50 top-0 bg-white'>
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
<div className='flex min-h-screen w-full bg-gray-100'>
            <SideBar/>
            
            <main className='w-full h-min p-4  mb-6'>

            <div className='flex flex-row items-center justify-center gap-4'>
            <div className='h-[350px] w-[700px] border-2 border-gray-300 rounded-lg overflow-hidden'>
              {/* <Editor /> */}
              <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={handleEditorChange}
          options={{ fontSize: 16 }}
        />
            </div>
            <div className='h-[350px] w-[700px] border-2 border-gray-300 rounded-lg overflow-hidden'>
              {/* <Editor /> */}
              <div
              className='h-full'
        style={{
          flex: 1,
          padding: '14px',
          margin: '0px',
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
          overflowY: 'auto',
        }}
      >
        {output}
      </div>
            </div>
            
            
            </div>
             {/* user details and room details aside bar */}
            <div className='flex items-center mb-4 p-2 rounded-lg justify-end'>
              <button 
        className='bg-green-500 text-white text-center h-10 px-4 py-2 rounded mt-2'
        onClick={runCode} 
        >
          Run
        </button>
            </div>
            {/* chat box */}
            <div className='mt-4 bg-gray-200 p-4 rounded-lg'>
              <h2 className='text-lg font-semibold mb-2'>Chat Box</h2>
              <div className='h-20 overflow-y-auto mb-2 p-2 border border-gray-300 rounded-lg bg-white'>
                {/* Chat messages will go here */}
                <p>User1: Hello!</p>
                <p>User2: Hi there!</p>
                <p>User1: How are you?</p>
               
              </div>
            </div>
            <div className='mt-4 bg-amber-400 items-center  rounded-lg text-center'>
              <Link to='/'>
                <button className='bg-gray-500 text-white m-2 rounded'>Go Back Home</button>
              </Link>
            </div>

           
            </main>
            </div>
            
    </>
  )
}

export default Commit