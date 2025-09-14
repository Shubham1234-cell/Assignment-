import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav(){
  return (
    <aside className="w-60 bg-white border-r hidden md:block">
      <div className="p-4 font-bold">Menu</div>
      <nav className="px-2 space-y-2">
        <NavLink to="/" className={({isActive})=> isActive? 'block bg-indigo-50 px-3 py-2 rounded':'block hover:bg-gray-50 px-3 py-2 rounded'}>Contracts</NavLink>
        <NavLink to="/settings" className="block px-3 py-2 rounded hover:bg-gray-50">Settings</NavLink>
      </nav>
    </aside>
  )
}
