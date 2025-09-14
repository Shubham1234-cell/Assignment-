import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  const { login } = useAuth()
  const nav = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(login(username, password)){
      nav('/')
    } else {
      setErr('Invalid login')
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h1 className="text-xl mb-4 font-semibold">Contracts Dashboard</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full border p-2 rounded" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
          <input type="password" className="w-full border p-2 rounded" placeholder="password (test123)" value={password} onChange={e=>setPassword(e.target.value)} />
          {err && <div className="text-red-600 text-sm">{err}</div>}
          <button className="w-full bg-indigo-600 text-white p-2 rounded">Login</button>
        </form>
      </div>
    </div>
  )
}
