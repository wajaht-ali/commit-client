import React from 'react'

function SignUp() {
  return (
    <div className='relative min-h-screen flex flex-row'>
    <div className=" w-full  justify-center items-center h-screen hidden md:flex">
        <img src="https://images.unsplash.com/photo-1526925539332-aa3b66e35444?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="login side image" className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full">
        <h1 className="text-3xl font-bold">Wellcome To Commit</h1>
        <form className="flex flex-col space-y-4 mt-4">
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 border border-gray-300 rounded"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Sign Up
          </button>
        </form>
        <div className="mt-4">
          <p className="text-sm">
            Already have an account? <a href="/login" className="text-blue-500">Login</a>
          </p>
        </div>
      </div>
    
    </div>
  )
}

export default SignUp