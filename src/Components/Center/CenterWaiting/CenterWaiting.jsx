import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import photo from "../../../Images/Medical prescription-rafiki.png";
import { authContext } from "../../../Context/AuthContext";
import Swal from "sweetalert2";


export default function CenterWaiting() {
  const { CenterId , setCenterId } = useContext(authContext);

  const [allwaiting, setAllWaiting] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

setCenterId(localStorage.getItem("centerid"))

  async function getAllvaccines() {
    setIsLoad(true);

    try {
      const response = await axios.get(
        `https://localhost:7127/api/VaccinationCenter/GetAllWaitingDoses/${CenterId}`
      );
      setAllWaiting(response.data || []);
    } catch (error) {
      console.error("Error fetching waiting doses:", error);
      setAllWaiting([]); 
      
    } finally {
      setIsLoad(false);
    }
  }

  useEffect(() => {
    getAllvaccines();
  }, [CenterId]); 



  if (allwaiting && allwaiting?.length === 0) {
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
              <tbody className="fs-5">
                {allwaiting?.map((vac, index) => (
                  <tr key={index}>
                    <td>{vac.patientId}</td>
                    <td>{vac.name}</td>
                    <td>{vac.email}</td>
                    <td>{vac.vaccineName}</td>
                    <td>{vac.vaccineId}</td>


                    <td>
                      <button
                        className="btn btn-success"
                        onClick={async () => {
                          try {
                            const data = {
                              patientId: vac.patientId,
                              vaccineId: vac.vaccineId,
                              vaccinationCenterId: CenterId,
                            };
                            const response = await axios.post(
                              "https://localhost:7127/api/VaccinationCenter/ApproveDoses",
                              data
                            );
                            if(response.data.message){
                              Swal.fire({
                                position: "center-center",
                                icon: "success",
                                title: "Patient Doses Approve  ",
                                showConfirmButton: false,
                                timer: 1500
                              });
                            }
                            await getAllvaccines();
                          } catch (error) {
                            console.error("Error accepting vaccine:", error);
                          }
                        }}
                      >
                        Accept
                      </button>
                    </td>


                    
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
