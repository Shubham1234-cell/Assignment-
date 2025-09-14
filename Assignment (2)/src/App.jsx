import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Detail from './pages/Detail'
import { useAuth } from './context/AuthContext'

export default function App(){
  const { token } = useAuth()
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={token ? <Dashboard/> : <Navigate to='/login' />} />
      <Route path='/contracts/:id' element={token ? <Detail/> : <Navigate to='/login' />} />
    </Routes>
  )
}
