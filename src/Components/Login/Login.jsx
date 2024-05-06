import React, { useContext, useState } from "react";
import photo from "../../Images/photo.jpg";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { authContext } from "../../Context/AuthContext";

export default function Register() {

let {setAdminToken , setCenterToken  ,setpatiToken , setCenterId } =  useContext(authContext);


  let user = {
    Email: "",
    Password: "",
  };

  let [ErrorMsg, setErrorMsg] = useState(null);
  let [SuccessMse, setSuccessMsg] = useState(null);

  let [IsLoading, setIsLoading] = useState(false);

  let Navigat = useNavigate();

  function checkValidate(values) {
    const errors = {};

    setErrorMsg(null);

    if (!values.Email.includes("@") || !values.Email.includes(".")) {
      errors.Email = "Invalid email. It should contain '@' and '.' ";
    }

    if (
      !values.Password.match(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
      )
    ) {
      errors.Password =
        "Invalid Password. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    return errors;
  }

  async function SendData(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "https://localhost:7127/api/Accounts/Login",
        values
      );

      if (data?.status?.value === "Success" && data?.role === "Admin") {


        localStorage.setItem("admintkn",data?.token);
        setAdminToken(data?.token);
        setTimeout(function () {
          Navigat("/admin");
        }, 1000);
      }

      if (data?.status?.value === "Success" && data?.role === "Center") {


        localStorage.setItem("centertkn",data?.token);
        localStorage.setItem("centerid",data?.id);
        setCenterToken(data?.token);
        setCenterId(data?.id)


        


        setTimeout(function () {
          Navigat("/center");
        }, 1000);
      }


      if (data?.status?.value === "Success" && data?.role === "Patient") {


        localStorage.setItem("patitoken",data?.token);
        setpatiToken(data?.token);
        localStorage.setItem("patiid",data?.id);
        


        setTimeout(function () {
          Navigat("/patient");
        }, 1000);
      }


    } catch (error) {
      console.error("API Error:", error.response.data.value);
      setErrorMsg(error.response.data.value)
    }
    setIsLoading(false);
}


let formikObject = useFormik({
  initialValues: user,
  validate: checkValidate,
  onSubmit: SendData,
});



return (
  <>
      <div className="container-fluid overflow-x-hidden ">
        <div className="row gx-5 d-flex align-items-center">
          <div className="col-md-6 d-none d-md-block">
            <img src={photo} className="w-100 vh-100" alt="" />
          </div>

          <div className="col-md-6">
            <h1 className="text-center text-main fw-bold fs-1">Login Now </h1>
            <form onSubmit={formikObject.handleSubmit}>
            {ErrorMsg ? (
            <div className="alert alert-danger fs-4 fw-bold">{ErrorMsg}</div>
          ) : (
            ""
          )}


              <input
                type="email"
                className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
                placeholder="Email"
                name="Email"
                id="Email"
                value={formikObject.values.Email}
                onChange={formikObject.handleChange}
                onBlur={formikObject.handleBlur}
              />
              {formikObject.errors.Email && formikObject.touched.Email ? (
                <div className="alert alert-danger mb-5">
                  {formikObject.errors.Email}
                </div>
              ) : (
                " "
              )}

              <input
                type="password"
                className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
                placeholder="Password"
                name="Password"
                id="Password"
                value={formikObject.values.Password}
                onChange={formikObject.handleChange}
                onBlur={formikObject.handleBlur}
              />
              {formikObject.errors.Password && formikObject.touched.Password ? (
                <div className="alert alert-danger mb-5">
                  {formikObject.errors.Password}
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
    "Login Now"
  )}
</button>
<h5 className="text-center mt-5"> You don't Have Account ?  <Link className="text-success" to="/register"> Create Account </Link> </h5>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}