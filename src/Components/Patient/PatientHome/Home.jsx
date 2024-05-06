import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../../Context/AuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  let { patiToken, setpatiToken } = useContext(authContext)
  const [allcenters, setAllCenters] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  let [patientDetails, setpatientDetails] = useState();

  let patientId = localStorage.getItem("patiid");


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
          acc.push(vaccine.vaccineId);
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



  return (
    <>
      <div className='my-5 p-5'>
        <div className="container">


          <div className="row">


            {
              allcenters?.map((center, index) => (
                <div key={index} className="col-md-4 text-center">
                  <h5>{center.location}</h5>
                  <p>{patientId}</p>
                  <p>{center.name}</p>
                  <p>{center.id}</p>
                  <ul>
                    {center.vaccineNames?.map((vaccine, idx) => {
                      const takeDoss = async () => {
                        let data = {
                          patientId: patientId,
                          vaccineId: vaccine.vaccineId,
                          vaccinationCenterId: center.id
                        };

                        console.log(data);

                        try {
                          let response = await axios.post(
                            `https://localhost:7127/api/Patients/SendDose`,
                            data
                          );
                          console.log(response?.data);
                        } catch (error) {
                          console.error(error);
                        }
                      };
                      return (
                        <li key={idx}>
                          {vaccine.vaccineName}
                          {vaccine.vaccineId}
                          {
                            vaccineArr.includes(vaccine.vaccineId)
                              ?
                              <p>We Cannot Take More Than Two Doses</p>
                              :
                              <button onClick={takeDoss}>Take Dose</button>
                          }
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            }

          </div>
        </div>
      </div>

    </>
  )
}
