import { useFormik } from 'formik';
import React, { useState } from 'react'
import style from './AdminAddVaccineCenters.module.css'
import { Bars } from 'react-loader-spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AdminAddVaccineCenters() {
  let center = {
    name: "",
    email: "",
    password: "",
    location: "",
  }
  let [ErrorMsg, setErrorMsg] = useState(null);
  let [IsLoading, setIsLoading] = useState(false);
  let Navigat = useNavigate();


  function checkValidate(values) {

    const errors = {};

    setErrorMsg(null);

    if (values.name.length < 4 || values.name.length > 12) {
      errors.name = "Name length must be between 4 and 10 characters.";
    }

    if (!values.email.includes("@") || !values.email.includes(".")) {
      errors.email = "Invalid email. It should contain '@' and '.'.";
  } else if (!/@center\b/.test(values.email)) {
      errors.email = "Invalid email. It should contain '@center'.";
  }
  

    if (!values.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)) {
      errors.password = "Invalid Password. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character."

    }

    if (!values.location.match(/^\d{3,4}-[a-zA-Z]{6}-[a-zA-Z]{6}-[a-zA-Z]{6}$/)) {
      errors.location = "Location format is invalid. It should match the pattern: 123-street-city-country";
    }
    

  

   

    return errors;
  }
//https://localhost:7127/api/VaccinationCenter/AddCenter
  async function SendData(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "https://localhost:7127/api/VaccinationCenter/AddCenter",
        values
      );


      if(data?.status?.value==="Success" && data?.role==="Center"){
        console.log("center Added Succefully");
        //Store Token
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: "center Added Succefully",
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(function () {
          Navigat("/admin/allvaccinecenters");
        }, 1000);
      }
      

    } catch (error) {
      // console.error("API Error:", error.response.data.value);
      setErrorMsg(error.response.data.value);
    }
    setIsLoading(false);
}


  let formikObject = useFormik({
    initialValues: center,
    validate: checkValidate,
    onSubmit:SendData
  });



  return (
    <>
   <div className="container my-3">
    <h5 className='text-center fs-3'>Add New Vaccine Center</h5>
    {ErrorMsg ? (
            <div className="alert alert-danger fs-4 fw-bold">{ErrorMsg}</div>
          ) : (
            ""
          )}
          
    <form onSubmit={formikObject.handleSubmit}>
              <input
                type="text"
                className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
                placeholder="Name"
                name="name"
                id="name"
                value={formikObject.values.name}
                onChange={formikObject.handleChange}
                onBlur={formikObject.handleBlur}
              />
              {formikObject.errors.name && formikObject.touched.name ? (
                <div className="alert alert-danger mb-5">
                  {formikObject.errors.name}
                </div>
              ) : (
                " "
              )}


<input
                type="email"
                className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
                placeholder="Email"
                name="email"
                id="email"
                value={formikObject.values.email}
                onChange={formikObject.handleChange}
                onBlur={formikObject.handleBlur}
              />
              {formikObject.errors.email && formikObject.touched.email ? (
                <div className="alert alert-danger mb-5">
                  {formikObject.errors.email}
                </div>
              ) : (
                " "
              )}

<input
                type="password"
                className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
                placeholder="Password"
                name="password"
                id="password"
             
              value={formikObject.values.password}
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
              />
              {formikObject.errors.password && formikObject.touched.password ? (
                <div className="alert alert-danger mb-5">
                  {formikObject.errors.password}
                </div>
              ) : (
                " "
              )}


<input
                type="text"
                className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
                placeholder="location"
                name="location"
                id="location"
                value={formikObject.values.location}
                onChange={formikObject.handleChange}
                onBlur={formikObject.handleBlur}
              />
              {formikObject.errors.location && formikObject.touched.location ? (
                <div className="alert alert-danger mb-5">
                  {formikObject.errors.location}
                </div>
              ) : (
                " "
              )}
<button
  className="btn btn-success w-100 p-2"
  type="submit"
  disabled={!(formikObject.dirty && formikObject.isValid)}
>
  {IsLoading ? (
    <Bars
      height="90"
      width="90"
      color="#fff"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  ) : (
    "Add Center"
  )}
</button>






      <div>

      </div>

    </form>
   </div>
    </>
  )
}
