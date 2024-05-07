import axios from 'axios';
import React, { useEffect, useState } from 'react'
import photo from "../../../Images/Medical prescription-rafiki.png";
import { Bars } from 'react-loader-spinner';


export default function CenterPatients() {

    let centerToken = localStorage.getItem("centertkn");

    console.log("tokenCenter",centerToken);

  const [isLoad, setIsLoad] = useState(false);
  const [allPatients, setallPatients] = useState(null);


let centerId = (localStorage.getItem("centerid"))

  

    async function getAllPatientseEnrolled() {
        setIsLoad(true);
    
        try {
          const response = await axios.get(
            `https://localhost:7127/api/Patients/GetAllPatients/${centerId}`,
            {
                headers :{
                    Authorization: `Bearer ${centerToken}`
                  }
            }
          );
          setallPatients(response.data || []);
          console.log(response?.data);
        } catch (error) {
          console.error("Error fetching waiting doses:", error);
          setallPatients([]); 
          
        } finally {
          setIsLoad(false);
        }
      }

      useEffect(()=>{
        getAllPatientseEnrolled()
      },[])

      if (allPatients && allPatients?.length === 0) {
        return (
          <>
            <div className="vh-50 d-flex align-items-center justify-content-center">
              <div className="d-flex align-items-center justify-content-center">
                <img src={photo} className="w-50" alt="" />
              </div>
            </div>
            <h4 className="fs-1 text-center">No Waiting Patients Here</h4>
          </>
        );
    }   


  return (
    <>
    
    {isLoad ? (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <Bars height="190" width="190" color="#fff" />
        </div>
      ) : (
        <div className="my-5 px-5">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-center">
              <h1 className="text-center fw-bold text-success">Hello Center</h1>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <h3 className="text-center fw-bold text-black my-4">
                All  Patients in Our Center
              </h3>
            </div>
            <table className="table table-hover m-4 shadow-lg">
              <thead className="fs-3">
                <tr>
                  <th className="p-2 fs-4">Patient Id</th>
                  <th className="p-2 fs-4">Name</th>
                  <th className="p-2 fs-4">Email</th>
                  <th className="p-2 fs-4">Phone</th>
                  <th className="p-2 fs-4">SSN</th>
                 
                </tr>
              </thead>
              <tbody className="fs-5">
                {allPatients?.map((pat, index) => (
                  <tr key={index}>
                    <td>{pat.id}</td>
                    <td>{pat.name}</td>
                    <td>{pat.email}</td>
                    <td>{pat.phone}</td>
                    <td>{pat.ssn}</td>


                  


                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    
    </>
  )
}
