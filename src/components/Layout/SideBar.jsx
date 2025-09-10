import React from 'react'

function SideBar() {
  return (
    <>
     {/* SideBar contain profile , logout button and user id etc */}
     <aside className='w-64 bg-white shadow-md p-6'>
            
    <nav>
      <ul>
        <li class="mb-3">
          <a href="#" class="block px-4 py-2 rounded hover:bg-blue-100 text-blue-600 font-medium">Overview</a>
        </li>
        <li class="mb-3">
          <a href="#" class="block px-4 py-2 rounded hover:bg-blue-100">Projects</a>
        </li>
        <li class="mb-3">
          <a href="#" class="block px-4 py-2 rounded hover:bg-blue-100">Settings</a>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 rounded hover:bg-blue-100">Logout</a>
        </li>
      </ul>
    </nav>

<div className='flex items-center mb-4 p-2 rounded-lg justify-end'>
              <div>
                <ul className='list-none flex gap-4 '>
                {/* user icon */}
                  <li>
                  <img src="https://www.svgrepo.com/show/7025/user.svg" alt="User Icon" className="inline w-3 h-3 mr-2" />
                  </li>
                  <li>
                  <img src="https://www.svgrepo.com/show/7025/user.svg" alt="User Icon" className="inline w-3 h-3 mr-2" />
                  </li>
                 
                  </ul>
              </div>
            </div>
            </aside>
</>
  )
}

export default SideBar