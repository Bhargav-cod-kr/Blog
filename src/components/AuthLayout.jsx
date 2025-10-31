import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Protected route wrapper that conditionally renders content based on authentication status
export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector((state) => state.auth?.status)

  // Redirects users based on authentication requirement and current auth state
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate('/login')
    } else if (!authentication && authStatus !== authentication) {
      navigate('/')
    }
    setLoader(false)
  }, [authStatus, navigate, authentication])

  // Displays loader while verifying authentication, then renders children
  return loader ? <h1>Loading...</h1> : <>{children}</>
}
