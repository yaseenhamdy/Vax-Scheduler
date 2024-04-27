import React, { useState } from "react";
import photo from "../../Images/photo.jpg";
import style from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

export default function Register() {
  let patient = {
    name: "",
    ssn: "",
    password: "",
    email: "",
    phone: "",
    vaccinationCenterId: "",
  };

  let [ErrorMsg, setErrorMsg] = useState(null);
  let [SuccessMse, setSuccessMsg] = useState(null);
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
    } else if (/@vaccinecenter\b/.test(values.email) || /@admin\b/.test(values.email)) {
      errors.email = "Invalid email.";
    }

    if (!values.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)) {
      errors.password = "Invalid Password. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character."

    }

    if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
      errors.phone = "Invalid phone number. It must be 11 digits.";
    }

    if (values.ssn.length < 12 || values.ssn.length > 14) {
      errors.ssn = "Invalid SSN number. It must be between 12 and 14 digits.";
    }

    return errors;
  }

  function SendDate(values){
    console.log(values);
  }


  let formikObject = useFormik({
    initialValues: patient,
    validate: checkValidate,
    onSubmit:SendDate
  });

  return (
    <>
      <div className="container my-5 p-4">
        <div className="row gx-5 d-flex align-items-center">
          <div className="col-md-6 d-none d-md-block">
            <img src={photo} className="w-100 vh-100" alt="" />
          </div>

          <div className="col-md-6">
            <h1 className="text-center text-main fw-bold fs-1">Sign Up </h1>
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
                type="number"
                className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
                placeholder="National Id Number" 
                name="ssn"
                id="ssn"
                value={formikObject.values.ssn}
                onChange={formikObject.handleChange}
                onBlur={formikObject.handleBlur}
              />
              {formikObject.errors.ssn && formikObject.touched.ssn ? (
                <div className="alert alert-danger mb-5">
                  {formikObject.errors.ssn}
                </div>
              ) : (
                " "
              )}





              <input
                type="tel"
                className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
                placeholder="Phone"
                name="phone"
                id="phone"
                value={formikObject.values.phone}
                onChange={formikObject.handleChange}
                onBlur={formikObject.handleBlur}
              />
              {formikObject.errors.phone && formikObject.touched.phone ? (
                <div className="alert alert-danger mb-5">
                  {formikObject.errors.phone}
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


              <select required
                className={`form-select my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
                aria-label="Default select example" name="vaccinationCenterId"
                id="vaccinationCenterId"    value={formikObject.values.vaccinationCenterId}
                onChange={formikObject.handleChange}
                onBlur={formikObject.handleBlur}
              >
                <option value="">Choose Your Center</option>
                <option value="1">Dokki</option>
                <option value="2">Merg</option>
                <option value="3">Faisal</option>
              </select>
              
              <button className="btn btn-success w-100 p-2" type="submit" 
                disabled={!(formikObject.dirty && formikObject.isValid)}>
               
                Register Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
