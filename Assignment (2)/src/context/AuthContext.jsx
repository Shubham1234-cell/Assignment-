import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }){
  const [token, setToken] = useState(localStorage.getItem('jwt_demo'))

  const login = (username, password) => {
    if(password === 'test123'){
      const jwt = 'jwt-' + Date.now()
      localStorage.setItem('jwt_demo', jwt)
      setToken(jwt)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('jwt_demo')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
