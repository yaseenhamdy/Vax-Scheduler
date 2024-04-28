import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AdminAllVaccineCenters() {
  const [allcenters, setAllCenters] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  const handleUpdateClick = (centerId) => {
    const updateUrl = `/admin/updatecenter/${centerId}`;
    window.location.href = updateUrl; // Redirect to the update center URL
  };

  async function getAllCenters() {
    setIsLoad(true);
    try {
      const response = await axios.get("https://localhost:7127/api/VaccinationCenter");
      console.log(response?.data[0]);
      setAllCenters(response?.data);
    } catch (error) {
      if(error.response.data.message===false){
        setAllCenters([]);
      }
      console.error("Error fetching data get all centers:", error);
    } finally {
      setIsLoad(false); 
    }
  }



async function deleteCenter(centerId) {
 

  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      setIsLoad(true);
      const response = await axios.delete("https://localhost:7127/api/VaccinationCenter", {
        data: {
          id: centerId
        }
      });

      if (response.data.message === true) {
        await getAllCenters(); // Assuming getAllCenters is an asynchronous function
        Swal.fire({
          title: "Deleted!",
          text: "Center has been deleted.",
          icon: "success"
        });
      } else {
        throw new Error("Failed to delete vaccination center");
      }
    }
  } catch (error) {
    console.error('Error deleting vaccination center:', error.message);
    Swal.fire({
      title: "Error",
      text: "Failed to delete vaccination center.",
      icon: "error"
    });
  } finally {
    setIsLoad(false); // Ensure setIsLoad is set to false regardless of outcome
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
            color="#09c"
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
                    <td>  <button
        className='btn btn-warning'
        onClick={() => handleUpdateClick(center.id)}
      >
        Update
      </button></td>
                    <td><button className='btn btn-danger' onClick={()=>deleteCenter(center.id)}>Delete</button></td>
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
