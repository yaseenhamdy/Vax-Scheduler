import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';
import style from './UpdateCenter.module.css';
import Swal from 'sweetalert2';
import { authContext } from '../../../Context/AuthContext';


export default function UpdateCenter() {
  let {AdminToken} = useContext(authContext);

  const { id } = useParams();
  const [centerdata, setCenterdata] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  let [ErrorMsg, setErrorMsg] = useState(null);


  async function getACenterById(id) {
    setIsLoad(true);
    try {
      const response = await axios.get(`https://localhost:7127/api/VaccinationCenter/${id}`,{
        headers :{
          Authorization: `Bearer ${AdminToken}`
        }
      });
      setCenterdata(response.data);
      console.log("call api get one center", response?.data);
    } catch (error) {
      console.error("Error fetching data for vaccination center:", error);
    } finally {
      setIsLoad(false);
    }
}

  useEffect(() => {
    getACenterById(id);
  }, [id]);


const formikObject = useFormik({
    initialValues: {
      name: '',
      email: '',
      location: '',
      password :""
    },
    validate: checkValidate,
    onSubmit: SendData
});



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



  let [IsLoading, setIsLoading] = useState(false);

  let Navigat = useNavigate();


async function SendData(values) {
        setIsLoading(true);
        try {
                  let { data } = await axios.put(
                    `https://localhost:7127/api/VaccinationCenter/${id}`,
                    values , {
                      headers :{
                        Authorization: `Bearer ${AdminToken}`
                      }
                    }
                  );

                  if(data?.status?.value==="Success" && data?.role==="Center"){
                           
                           
                            
                            Swal.fire({
                              position: "center-center",
                              icon: "success",
                              title: "center Updated Succefully",
                              showConfirmButton: false,
                              timer: 1500
                            });
                    
                            setTimeout(function () {
                              Navigat("/admin/allvaccinecenters");
                            }, 1000);
                          }
                          
                    
                        } catch (error) {
                           console.error("API Error:", error);
                          //setErrorMsg(error.response.data.value);
                        }
                        setIsLoading(false);


}





useEffect(() => {
    if (Object.keys(centerdata).length > 0) {
      formikObject.setValues({
        name: centerdata.name || '',
        email: centerdata.email || '',
        location: centerdata.location || '',
        password : "",
      });
    }
}, [centerdata]);





  return (
    <>
      {isLoad ? (
        <div className='vh-100 d-flex align-items-center justify-content-center'>
          <Bars
            height="190"
            width="190"
            color="#09c"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="container my-3">
          <h5 className='text-center fs-3'>Update Vaccine Center</h5>
          <form onSubmit={formikObject.handleSubmit}>
          {ErrorMsg ? (
            <div className="alert alert-danger fs-4 fw-bold">{ErrorMsg}</div>
          ) : (
            ""
          )}
            <input
              type="text"
              className={`form-control my-4 bg-form ${style.myInput}`}
              placeholder="Name"
              name="name"
              id="name"
              value={formikObject.values.name}
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
            />
            {formikObject.errors.name && formikObject.touched.name && (
              <div className="alert alert-danger">{formikObject.errors.name}</div>
            )}



            <input
              type="email"
              className={`form-control my-4 bg-form ${style.myInput}`}
              placeholder="Email"
              name="email"
              id="email"
              value={formikObject.values.email}
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
            />
            {formikObject.errors.email && formikObject.touched.email && (
              <div className="alert alert-danger">{formikObject.errors.email}</div>
            )}



            <input
              type="text"
              className={`form-control my-4 bg-form ${style.myInput}`}
              placeholder="Location"
              name="location"
              id="location"
              value={formikObject.values.location}
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
            />
            {formikObject.errors.location && formikObject.touched.location && (
              <div className="alert alert-danger">{formikObject.errors.location}</div>
            )}


            <h5 className='mt-5'>Enter New Password :</h5>

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
    "Update Center"
  )}
</button>



          </form>
        </div>
      )}
    </>
  );

      }
      