import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {

  const [auth, setAuth] = useAuth();
  if (!auth?.token) {
    return <Navigate to="/" />
  }
  if (allowedRoles && !allowedRoles.includes(auth?.token?.user?.role)) {
    return <Navigate to="/" />
  }
  return <Outlet />
}

export default PrivateRoute
