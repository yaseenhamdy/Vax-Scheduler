import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function PatientLayout() {
  return (
    <>

      <Navbar />
      <Outlet />
      <Footer></Footer>



    </>
  )
}
