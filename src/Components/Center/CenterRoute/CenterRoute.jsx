import React from 'react'
import { Navigate } from 'react-router-dom'

export default function CenterRoute( {children}  ) {







if(localStorage.getItem('centertkn') !== null){
  return<>
  {children}
  </>
}else{
  return <Navigate to = {'/login'} />
}













}
