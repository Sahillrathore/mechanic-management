import React from 'react'
import { NavLink } from 'react-router-dom'

const Notfound = () => {
  return (
    <div className='flex flex-col min-h-screen w-full h-full justify-center items-center gap-2'>
        <h1 className='font-bold text-7xl'>OOPS!</h1>
        <h4 className='my-6 mt-0'>Page not found</h4>
        <NavLink to='/' className='px-4 py-1.5 bg-blue-500 hover:bg-blue-600/90 rounded text-white'>Go Back</NavLink>
    </div>
  )
}

export default Notfound