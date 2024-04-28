import React from 'react'
import LoginImg from '../../Images/Landing Page-image4.jpg'
import Style from './Login.module.css'
import { Link,useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { useState } from 'react'



export default function Login() {

  let navigate = useNavigate();
  const [error, setError] = useState(null);

  let passwordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

  let initial = {
    email: '',
    password: '',
  }
  async function loginSubmit(values) {
     await axios.post('localhost:8080/api/admin/login', values)
        .catch((err) => {
            setError("Error Is Exist");
        })
        navigate('/')
    
}
  let validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email Is Requiered'),
    password: Yup.string().matches(passwordRegex, 'Invalid  Password').required('Password Is Required'),
  })
  let loginFormik = useFormik({
    initialValues: initial,
    validationSchema,
    onSubmit: loginSubmit
    })

  return (
    <>
      <div className="row w-100">
        <div className="col-md-6 px-0">
          <div className="loginIMG">
            <img src={LoginImg} alt="img" className='w-100' />
          </div>
        </div>
        <div className={`col-md-6 ${Style['main-background']} px-0`}>
          <div className={`loginContent d-flex h-75 align-items-center`}>
            <div className='w-100'>
              <h3 className={`text-center ${Style['main-color']}`}>Login</h3>
              <p className={`text-center ${Style['main-color']}`}>We are glad to see you again</p>
              <div className={`${Style['loginInputs']}`}>
                <form onSubmit={loginFormik.handleSubmit} className='text-center' >

                  <input onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} type="email" placeholder='Email' className={`mx-auto ${Style['change-input-color']} border-0 form-control mb-4`} name='email' />
                  {loginFormik.errors.email && loginFormik.touched.email ? <div className='alert alert-danger p-2 mt-3'>{loginFormik.errors.email}</div> : ''}

                  <input  onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} type="password" placeholder='Password' className={`mx-auto ${Style['change-input-color']} border-0 form-control`} name='password' />
                  {loginFormik.errors.password && loginFormik.touched.password ? <div className='alert alert-danger p-2 mt-3'>{loginFormik.errors.password}</div> : ''}

                  <button disabled={!(loginFormik.dirty && loginFormik.isValid)} type='submit' className={`${Style['btn-login']} btn  text-white mt-4`}>Login</button>
                </form>
                <p className='text-center mt-4'>Don't have an account yet?<Link to='/register' className={`text-decoration-none ${Style['main-color']}`}> Signup now</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}