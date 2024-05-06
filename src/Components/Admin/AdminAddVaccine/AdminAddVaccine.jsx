import { Field, FieldArray, useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import style from "./AddVaccine.module.css";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authContext } from "../../../Context/AuthContext";

export default function AdminAddVaccine() {


  let {AdminToken} = useContext(authContext);



let vaccine = {
    name: "",
    durationBetweenDoses: "",
    precautions: "",
    vaccinationCenterIds:[],
};



  let [ErrorMsg, setErrorMsg] = useState(null);
  let [IsLoading, setIsLoading] = useState(false);
  let [laoaCenter,setlaoaCenter] = useState(false);

  let [allcenters,setAllCenters] = useState(null);

  let Navigat = useNavigate();







  function checkValidate(values) {
    const errors = {};

    setErrorMsg(null);

    if (values.name.length < 4 || values.name.length > 12) {
      errors.name = "Vaccine Name length must be between 4 and 12 characters.";
    }

    if (values.precautions?.length < 8 || values.nprecautionsame?.length > 25) {
      errors.precautions = "precautions length must be between 8 and 25 characters.";
    }

    if (
      !/^[0-9]+$/.test(values.durationBetweenDoses) ||
      parseInt(values.durationBetweenDoses) <= 10
    ) {
      errors.durationBetweenDoses =
        "DurationBetweenDoses must be a number containing only digits and greater than 10.";
    }

    return errors;
  }

  async function SendData(values) {
    console.log(values);
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "https://localhost:7127/api/Vaccine/AddVaccine",
        values,{
          headers :{
            Authorization: `Bearer ${AdminToken}`
          }
        }
      );



      if(data?.status?.value==="Success"){
        //console.log("Vaccine Added Succefully");
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: "Vaccine Added Succefully",
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(function () {
          Navigat("/admin/allvaccines");
        }, 1000);
      }

      

    } catch (error) {
      // console.error("API Error:", error.response.data.value);
      setErrorMsg(error.response.data.value);
    }
    setIsLoading(false);
}


async function getAllCenters() {
    setlaoaCenter(true);
    try {
      const response = await axios.get("https://localhost:7127/api/VaccinationCenter");
      console.log(response?.data[0]);
      setAllCenters(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
        setlaoaCenter(false); 
    }
}
  

  
  useEffect(() => {
    getAllCenters();
  }, []);


  let formikObject = useFormik({
    initialValues: vaccine,
    validate: checkValidate,
   onSubmit:SendData
  });


  




   return (
    <>

   <div className="container my-3">
    <h5 className='text-center fs-3'>Add New Vaccine</h5>

    {ErrorMsg ? (
            <div className="alert alert-danger fs-4 fw-bold">{ErrorMsg}</div>
          ) : (
            ""
          )}


          
    <form onSubmit={formikObject.handleSubmit}>
              <input
                type="text"
                className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
                placeholder="Vaccine Name"
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
                type="number"
                className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
                placeholder="Duration Between Doses"
                name="durationBetweenDoses"
                id="durationBetweenDoses"
                value={formikObject.values.durationBetweenDoses}
                onChange={formikObject.handleChange}
                onBlur={formikObject.handleBlur}
              />
              {formikObject.errors.durationBetweenDoses && formikObject.touched.durationBetweenDoses ? (
                <div className="alert alert-danger mb-5">
                  {formikObject.errors.durationBetweenDoses}
                </div>
              ) : (
                " "
              )}






<input
                type="text"
                className={`form-control my-4 bg-form ${style.myInput} ${style["bg-form"]}`}
                placeholder="Precautions"
                name="precautions"
                id="precautions"
                value={formikObject.values.precautions}
                onChange={formikObject.handleChange}
                onBlur={formikObject.handleBlur}
              />

              
              {formikObject.errors.precautions && formikObject.touched.precautions ? (
                <div className="alert alert-danger mb-5">
                  {formikObject.errors.precautions}
                </div>
              ) : (
                " "
              )}



<h2 className="text-center fw-bold">Designate places where this vaccine can be obtained </h2>



{laoaCenter === true ? (
  <h5>Load</h5>
) : 

(
  allcenters?.map((center, index) => (
    <div key={index}>

<div className="form-check">
  <input
    className="form-check-input"
    type="checkbox"
    value={center.id}
    id={`flexCheckChecked-${index}`}
    style={{ width: '30px', height: '30px', borderColor:'black' }}
    onChange={(e) => {
      const checked = e.target.checked;
      const centerId = center.id;
      const vaccineForCenter = {
        name: formikObject.values.name,
        durationBetweenDoses: formikObject.values.durationBetweenDoses,
        precautions: formikObject.values.precautions,
        vaccinationCenterIds: checked ? [...formikObject.values.vaccinationCenterIds, centerId] : formikObject.values.vaccinationCenterIds.filter(id => id !== centerId),
      };
      formikObject.setFieldValue('vaccinationCenterIds', vaccineForCenter.vaccinationCenterIds);
      formikObject.setFieldValue('vaccine', vaccineForCenter);
    }}
  />
  <label className="form-check-label fs-2 ms-3" htmlFor={`flexCheckChecked-${index}`}>
    {center.name} 
  </label>
</div>

    </div>
  ))
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
    "Add Vaccine"
  )}
</button>






      <div>

      </div>

    </form>
   </div>
    </>
  )
}
