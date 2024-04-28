import React, { useContext, useState } from "react";
import photo from "../../Images/photo.jpg";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { authContext } from "../../Context/AuthContext";

export default function Register() {

let {setAdminToken} =  useContext(authContext);


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
        // console.log("inside if", data?.status?.value, data?.role);
        // console.log(data);

        localStorage.setItem("admintkn",data?.token);
        setAdminToken(data?.token);


        setTimeout(function () {
          Navigat("/admin");
        }, 1000);
        
      }
    } catch (error) {
      console.error("API Error:", error);
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
    <div>Login</div>
    <h5>ahmed mohamed </h5>
    </>
  )
}
