import React from 'react'
import { Outlet , Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ token }: { token: string | null }) {
 return (
    token ? <Outlet /> : <Navigate to="/" />
 )
}
