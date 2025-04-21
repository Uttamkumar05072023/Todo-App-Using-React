import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-indigo-800 text-white py-2'>
        <div className="logo">
            <span className="font-bold text-xl mx-8">iTask</span>
        </div>
        <ul className='flex gap-8 mx-9'>
            <li className="nav-li">Home</li>
            <li className="nav-li">Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
