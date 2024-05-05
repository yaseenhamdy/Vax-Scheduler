import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";

import { authContext } from "../../../Context/AuthContext";

export default function CenterWaiting() {
  let { AdminToken } = useContext(authContext);

  const [allwaiting, setallallwaiting] = useState(null);
  const [isLoad, setIsLoad] = useState(false);



  async function getAllvaccines() {
    setIsLoad(true);

    try {
      const response = await axios.get(
        "https://localhost:7127/api/VaccinationCenter/GetAllWaitingDoses"
      );
      setallallwaiting(response?.data);
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoad(false);
    }
}





  useEffect(() => {
    getAllvaccines();
  }, []);
  return (
    <>
      {isLoad ? (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <Bars
            height="190"
            width="190"
            color="#fff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="my-5 px-5">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-center">
              <h1 className="text center fw-bold text-success">Hello Center</h1>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <h3 className="text center fw-bold text-black my-4">
                All Waiting Patients
              </h3>
            </div>
            <table className="table table-hover m-4 shadow-lg">
              <thead className="fs-3">
                <tr>
                  <th className="p-2 fs-4">Patient Id</th>
                  <th className="p-2 fs-4">Name</th>
                  <th className="p-2 fs-4">Email</th>

                  <th className="p-2 fs-4">VaccineName</th>

                  <th className="p-2 fs-4">Vaccine Id</th>

                  <th className="p-2 fs-4">Accept</th>
                
                </tr>
              </thead>

              <tbody className='fs-5'>
              {allwaiting?.map((vac, index) => (
                <tr key={index}>

                  <td>{vac.patientId}</td>
                  <td>{vac.name}</td>
                  <td>{vac.email}</td>
                  <td>{vac.vaccineName}</td>
                  <td>{vac.vaccineId}</td>
                 
                


                 
                  <td><button className='btn btn-success'>Accept</button></td>
                </tr>
              ))}


            </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
