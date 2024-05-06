import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PatientRoute({children}) {


    if(localStorage.getItem('patitoken') !== null){
        return<>
        {children}
        </>
      }else{
        return <Navigate to = {'/login'} />
      }


}
