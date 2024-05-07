import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../../Context/AuthContext'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../Header/Header';

export default function Home() {

  let { patiToken, setpatiToken } = useContext(authContext)
  const [allcenters, setAllCenters] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  let [patientDetails, setpatientDetails] = useState();

  let patientId = localStorage.getItem("patiid");

  console.log(patientDetails);


  async function getPatientDetails() {
    try {
      setIsLoad(true);
      let response = await axios.get(`https://localhost:7127/api/Patients/${patientId}`);
      setpatientDetails(response?.data);
      console.log("patient details", response?.data);
      setIsLoad(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPatientDetails();
  }, []);

  let [vaccineArr, setVaccineArr] = useState([]);


  useEffect(() => {
    if (patientDetails && patientDetails.vaccines) {
      const newVaccineArr = patientDetails.vaccines.reduce((acc, vaccine) => {
        if (vaccine.secondDose === true) {
          acc.push({
            vaccineId: vaccine.vaccineId,
            vaccinationCenterId: vaccine.vaccinationCenterId
          });
        }
        return acc;
      }, []);
      setVaccineArr(newVaccineArr);
    }
  }, [patientDetails]);



  console.log(vaccineArr);




  async function getAllCenters() {
    setIsLoad(true);
    try {
      const response = await axios.get("https://localhost:7127/api/VaccinationCenter");
      setAllCenters(response?.data);
      console.log(response?.data[0]);
    } catch (error) {
      if (error.response.data.message === false) {
        setAllCenters([]);
      }
      console.error("Error fetching data get all centers:", error);
    } finally {
      setIsLoad(false);
    }
  }

  useEffect(() => {
    getAllCenters()
    getPatientDetails()
  }, [])



  // return (
  //   <>
  //     <div className='my-5'>
  //       <div className="container-fluid my-5 p-5">
  //         <div className="row">

  //           {allcenters?.map((center, index) => (
  //             <div key={index} className="col-md-3 mb-4">
  //               <div className="card"> {/* Added card container */}
  //                 <div className="card-header d-flex justify-content-between">
  //                   <h5 className="card-title">{center.name}</h5> {/* Center Name */}
  //                   <p className="card-text">{center.location}</p> {/* Location */}
  //                 </div>
  //                 <ul className="list-group list-group-flush"> {/* Vaccine list */}
  //                   {center.vaccineNames?.map((vaccine, idx) => {
  //                     const takeDoss = async () => {
  //                       let data = {
  //                         patientId: patientId,
  //                         vaccineId: vaccine.vaccineId,
  //                         vaccinationCenterId: center.id
  //                       };

  //                       console.log(data);

  //                       try {
  //                         let response = await axios.post(
  //                           `https://localhost:7127/api/Patients/SendDose`,
  //                           data
  //                         );
  //                         console.log(response?.data);
  //                       } catch (error) {
  //                         console.error(error);
  //                       }
  //                     };

  //                     const isAlreadyTaken = vaccineArr.some(
  //                       (x) =>
  //                         x.vaccineId === vaccine.vaccineId &&
  //                         x.vaccinationCenterId === center.id
  //                     );

  //                     return (
  //                       <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
  //                         <span>{vaccine.vaccineName}{" "}{/* ({vaccine.vaccineId}) */}</span>
  //                         {isAlreadyTaken ? (
  //                           <span>
  //                             We Cannot Take More Than Two Doses
  //                             <button className="btn btn-success">
  //                               <Link
  //                                 className="nav-link"
  //                                 to={`certificate/${center.id}/${vaccine.vaccineId}`}
  //                               >
  //                                 Certificates
  //                               </Link>
  //                             </button>
  //                           </span>
  //                         ) : (
  //                           <button onClick={takeDoss} className="btn btn-primary">
  //                             Take Dose
  //                           </button>
  //                         )}
  //                       </li>
  //                     );
  //                   })}
  //                 </ul>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>

  //     </div>





  //   </>
  // )




  return (
    <>
      <Header>

      </Header>
      <div className='my-5'>
        <div className="container my-5 py-5">
          <div className="row">

            {allcenters?.map((center, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h5 className="card-title">{center.name}</h5>
                    <p className="card-text">{center.location}</p>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      {center.vaccineNames?.map((vaccine, idx) => {
                        const takeDoss = async () => {
                          let data = {
                            patientId: patientId,
                            vaccineId: vaccine.vaccineId,
                            vaccinationCenterId: center.id
                          };

                          try {
                            let response = await axios.post(
                              `https://localhost:7127/api/Patients/SendDose`,
                              data
                            );
                            if (response?.data.message === true) {
                              Swal.fire({
                                position: "center-center",
                                icon: "success",
                                title: "Request to take dose send Successfully",
                                showConfirmButton: false,
                                timer: 1500
                              });

                            }
                            console.log(response?.data.message);
                          } catch (error) {
                            if(!error.response.data.message){
                              Swal.fire({
                                position: "center-center",
                                icon: "error",
                                title: "You Take Two Doses from this Vaccine not Allow To Take More Or May Wait Approve From Center",
                                showConfirmButton: false,
                                timer: 1500
                              });
                            }
                            console.error(error.response.data);

                          }
                        };

                        const isAlreadyTaken = vaccineArr.some(
                          (x) =>
                            x.vaccineId === vaccine.vaccineId &&
                            x.vaccinationCenterId === center.id
                        );

                        return (
                          <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{vaccine.vaccineName}</span>
                            {isAlreadyTaken ? (
                              <span>
                                <button className="btn btn-success">
                                  <Link
                                    className="nav-link text-success"
                                    to={`certificate/${center.id}/${vaccine.vaccineId}`}
                                  >
                                    Certificates
                                  </Link>
                                </button>
                                <span className="badge bg-warning text-dark ml-2">Max Doses Reached</span>
                              </span>
                            ) : (
                              <button onClick={takeDoss} className="btn btn-primary">
                                Take Dose
                              </button>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
