import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../../../Context/AuthContext";
import { useFormik } from "formik";
import { Bars } from "react-loader-spinner";
import style from './UpdateVaccine.module.css';


export default function UpdateVaccine() {
  let { id } = useParams();

  let { AdminToken } = useContext(authContext);

  const [Vaccinedata, setVaccinedata] = useState({});

  const [isLoad, setIsLoad] = useState(false);

  let [ErrorMsg, setErrorMsg] = useState(null);



  let [laoaCenter,setlaoaCenter] = useState(false);

  let [allcenters,setAllCenters] = useState(null);

  async function getAllCenters() {
    setlaoaCenter(true);
    try {
      const response = await axios.get("https://localhost:7127/api/VaccinationCenter");
      setAllCenters(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
        setlaoaCenter(false); 
    }
}






async function getVaccineById() {
    setIsLoad(true);
    try {
      const response = await axios.get(
        `https://localhost:7127/api/Vaccine/${id}`,
        {
          headers: {
            Authorization: `Bearer ${AdminToken}`,
          },
        }
      );
      setVaccinedata(response.data);
      console.log("call api get one Vaccine", response?.data);
  
      // Update the vaccinationCenterName in formikObject
      const selectedCenters = response.data.vaccinationCenterName || [];
      formikObject.setFieldValue('vaccinationCenterName', selectedCenters);
    } catch (error) {
      console.error("Error fetching data for vaccine:", error);
    } finally {
      setIsLoad(false);
    }
  }

useEffect(() => {
    getVaccineById();
    getAllCenters()
}, [id]);


const formikObject = useFormik({
    initialValues: {
        id: '',
        name: '',
        durationBetweenDoses: '',
        precautions: '',
        vaccinationCenterName: [] 
      },
    validate: checkValidate,
    onSubmit: SendData
});

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

function SendData(values){
    console.log(values);
}

useEffect(() => {
    if (Object.keys(Vaccinedata).length > 0) {
      formikObject.setValues({
        id: Vaccinedata.id || '',
        durationBetweenDoses: Vaccinedata.durationBetweenDoses || '',
        name: Vaccinedata.name || '',
        precautions: Vaccinedata.precautions || '',
        vaccinationCenterName:Vaccinedata.Vaccinedata   || '',
      });
    }
}, [Vaccinedata]);




let [IsLoading, setIsLoading] = useState(false);






  return <>
  
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
          <h5 className='text-center fs-3'>Update Vaccine </h5>
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
              type="number"
              className={`form-control my-4 bg-form ${style.myInput}`}
              placeholder="durationBetweenDoses"
              name="durationBetweenDoses"
              id="durationBetweenDoses"
              value={formikObject.values.durationBetweenDoses}
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
            />
            {formikObject.errors.durationBetweenDoses && formikObject.touched.durationBetweenDoses && (
              <div className="alert alert-danger">{formikObject.errors.durationBetweenDoses}</div>
            )}





            <input
              type="text"
              className={`form-control my-4 bg-form ${style.myInput}`}
              placeholder="precautions"
              name="precautions"
              id="precautions"
              value={formikObject.values.precautions}
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
            />
            {formikObject.errors.precautions && formikObject.touched.precautions && (
              <div className="alert alert-danger">{formikObject.errors.precautions}</div>
            )}


{/* {
  laoaCenter === true ? (
    <h5>Load</h5>
  ) : (
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
              const vaccinationCenterName = checked
                ? [...formikObject.values.vaccinationCenterName, center.name]
                : formikObject.values.vaccinationCenterName.filter(name => name !== center.name);
              formikObject.setFieldValue('vaccinationCenterName', vaccinationCenterName);
            }}
            checked={formikObject.values.vaccinationCenterName.includes(center.name)}
          />
          <label className="form-check-label fs-2 ms-3" htmlFor={`flexCheckChecked-${index}`}>
            {center.name} 
          </label>
        </div>
      </div>
    ))
  )
} */}


{
  laoaCenter === true ? (
    <h5>Load</h5>
  ) : (
    allcenters?.map((center, index) => {
      const isChecked = formikObject.values.vaccinationCenterName.includes(center.name);

      return (
        <div key={index}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={center.name}
              id={`flexCheckChecked-${index}`}
              style={{ width: '30px', height: '30px', borderColor:'black' }}
              onChange={(e) => {
                const checked = e.target.checked;
                const centerName = center.name;
                let vaccinationCenterName = [...formikObject.values.vaccinationCenterName];

                if (checked) {
                  vaccinationCenterName.push(centerName);
                } else {
                  vaccinationCenterName = vaccinationCenterName.filter(name => name !== centerName);
                }

                formikObject.setFieldValue('vaccinationCenterName', vaccinationCenterName);
              }}
              checked={isChecked}
            />
            <label className="form-check-label fs-2 ms-3" htmlFor={`flexCheckChecked-${index}`}>
              {center.name} 
            </label>
          </div>
        </div>
      );
    })
  )
}











         



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
    "Update Vaccine"
  )}
</button>



          </form>
        </div>
)}
  
  </>;


}
