import React from 'react'

function ButtonCard() {
  return (
    <div className="flex space-x-4">
      {/* login button  */}
      <button className="bg-white hover:bg-blue-700 text-blue-700 font-bold py-2 px-4 rounded">
        Login
      </button>

      {/* signup button  */}
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">
        Sign Up
      </button>
    </div>
  )
}

export default ButtonCard
