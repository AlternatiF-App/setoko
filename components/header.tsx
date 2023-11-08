import React from 'react'

function header() {
  return (
    <nav className='border-b border-gray-400/50 shadow-md'>
      <div className='container w-full lg:w-8/12 mx-auto flex justify-center items-center px-4 py-2'>
        <h1 className='text-lg font-bold'>GitHub Repository Explorer</h1>
      </div>
    </nav>
  )
}

export default header
