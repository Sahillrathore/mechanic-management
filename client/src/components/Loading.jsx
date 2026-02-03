import React from 'react'
import { BiLoaderAlt, BiLoaderCircle, BiLogoAdobe, BiLogoDeezer } from 'react-icons/bi'

const Loading = () => {
  return (
    <div className='text-2xl min-h-screen w-full gap-3 flex items-center justify-center'>
        <BiLoaderAlt size={24} className='animate-spin' />
        <h3>Loading data</h3>
    </div>
  )
}

export default Loading