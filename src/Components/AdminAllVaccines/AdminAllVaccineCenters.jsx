import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';

export default function AdminAllVaccineCenters() {
  const [allcenters, setAllCenters] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  async function getAllCenters() {
    setIsLoad(true);
    try {
      const response = await axios.get("https://localhost:7127/api/VaccinationCenter");
      console.log(response?.data[0]);
      setAllCenters(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoad(false); 
    }
  }

  useEffect(() => {
    getAllCenters();
  }, []);

  return (
    <>
      {isLoad ? (
        
        <div className='vh-100 d-flex align-items-center justify-content-center'>
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
        <div className='my-5 px-5'>
          <div className='container-fluid'>
            <div className='d-flex align-items-center justify-content-center'>
              <h1 className='text center fw-bold text-success'>Hello Admin</h1>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
              <h3 className='text center fw-bold text-black my-4'>All Centers</h3>
            </div>
            <table className="table table-hover m-4 shadow-lg">
              <thead className='fs-3'>
                <tr>
                  <th className="p-2 fs-4">Id</th>
                  <th className="p-2 fs-4">Name</th>
                  <th className="p-2 fs-4">Email</th>
                  <th className="p-2 fs-4">Location</th>
                  <th className="p-2 fs-4">Role</th>
                  <th className="p-2 fs-4">Vaccine Names</th>
                  <th className="p-2 fs-4">Update</th>
                  <th className="p-2 fs-4">Delete</th>
                </tr>
              </thead>
              <tbody className='fs-5'>
                {allcenters?.map((center, index) => (
                  <tr key={index}>
                    <td>{center.id}</td>
                    <td>{center.name}</td>
                    <td>{center.email}</td>
                    <td>{center.location}</td>
                    <td>{center.role}</td>
                    <td>
                      <ul>
                        {center?.vaccineNames?.map((vaccine, idx) => (
                          <li key={idx}>{vaccine.vaccineName}</li>
                        ))}
                      </ul>
                    </td>
                    <td><button className='btn btn-warning'>Update</button></td>
                    <td><button className='btn btn-danger'>Delete</button></td>
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
