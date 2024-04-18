import React from 'react'
import photo from '../../Images/photo.jpg'
import style from './Register.module.css'

export default function Register() {
  return (
    <>





    <div className="container my-5 p-4">
      <div className="row gx-5 d-flex align-items-center">
      <div className="col-md-6 d-none d-md-block">
          <img src={photo} className='w-100 vh-100'  alt="" />

        </div>

        <div className="col-md-6">
          <h1 className='text-center text-main fw-bold fs-1'>Sign Up </h1>
          <input type="text" className={`form-control my-4 bg-form ${style.myInput} ${style['bg-form']}`} placeholder='First Name' />
          <input type="text" className={`form-control my-4 bg-form ${style.myInput} ${style['bg-form']}`}  placeholder='Last Name' />
          <input type="email" className={`form-control my-4 bg-form ${style.myInput} ${style['bg-form']}`}  placeholder='Email' />
          <input type="number" className={`form-control my-4 bg-form ${style.myInput} ${style['bg-form']}`}  placeholder='National Id Number' />
          <input type="number" className={`form-control my-4 bg-form ${style.myInput} ${style['bg-form']}`}  placeholder='Age' />
          <input type="password" className={`form-control my-4 bg-form ${style.myInput} ${style['bg-form']}`}  placeholder='Password' />
          <input type="password" className={`form-control my-4 bg-form ${style.myInput} ${style['bg-form']}`}  placeholder='Re Password' />
          {/* <input type="date" className='form-control my-4 bg-form myInput' placeholder='Date OF Birth' /> */}
          <button className='btn btn-success w-100 p-2'> Register Now </button>
        </div>
      </div>
    </div>

    </>
  )
}
