import React from 'react'
import LoginImg from '../../Images/Landing Page-image4.jpg'
import Style from './Login.module.css'
import { Link} from 'react-router-dom'


export default function Login() {
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
                <form className='text-center' >
                  <input type="email" placeholder='Email' className={`mx-auto ${Style['change-input-color']} border-0 form-control mb-4`} name='email'  />
                  <input type="password" placeholder='Password' className={`mx-auto ${Style['change-input-color']} border-0 form-control`} name='password'  />
                  <button type='submit' className={`${Style['btn-login']} btn  text-white mt-4`}>Login</button>
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
