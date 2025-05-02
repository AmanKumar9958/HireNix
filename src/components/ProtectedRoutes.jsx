import React from 'react' 
import { useUser } from '@clerk/clerk-react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {

  const { isSignedIn, user, isLoaded } = useUser()
  const { pathName } = useLocation()

  if(isLoaded && !isSignedIn && isSignedIn!==undefined){
    return <Navigate to={'/'} />
  }

  return children
}

export default ProtectedRoutes