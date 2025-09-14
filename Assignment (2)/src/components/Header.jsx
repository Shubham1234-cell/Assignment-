import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Header(){
  const { logout } = useAuth()
  return (
    <div className="flex justify-between items-center p-4 border-b bg-white">
      <div className="font-semibold">Contracts Dashboard</div>
      <button onClick={logout} className="text-sm text-red-600">Logout</button>
    </div>
  )
}
