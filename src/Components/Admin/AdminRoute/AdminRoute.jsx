import React, { useContext } from 'react'
import { authContext } from '../../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function AdminRoute( {children}) {



if(localStorage.getItem('admintkn') !== null){
  return<>
  {children}
  </>
}else{
  return <Navigate to = {'/login'} />
}

}
