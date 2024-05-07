import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../../Context/AuthContext';
import logo from '../../../Images/photo_5895523619935731499_y.jpg'
export default function Navbar() {

  let Navigat = useNavigate();

  let { setpatiToken } = useContext(authContext)

  function LogOut() {
    localStorage.removeItem("patitoken");
    localStorage.removeItem("patiid");
    setpatiToken(null)
    Navigat('/login');
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-nav fixed-top mb-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">

          <img src={logo} alt="logo" width={90} height={60} />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">





              <li className="nav-item">

              </li>

              <li className="nav-item">
                <Link className="nav-link"><button className='btn btn-danger' onClick={LogOut}> LogOut</button></Link>
              </li>



            </ul>





          </div>
        </div>
      </nav>

    </>
  )
}
