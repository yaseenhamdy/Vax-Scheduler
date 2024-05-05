import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../../Context/AuthContext'
import axios from 'axios';

export default function Home() {

    let {patiToken} = useContext(authContext)
    const [allcenters, setAllCenters] = useState(null);
    const [isLoad, setIsLoad] = useState(false);

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

useEffect(()=>{
        getAllCenters()
},[])



  return (
    <>
    <div className='my-5 p-5'>
        <div className="container">
            <div className="row">
           
                {
                allcenters?.map((center, index) => (

                    <>
                    <div className='col-md-4 text-center'>
                    <tr key={index}>

                     <h5 key={index}> {center.id} </h5> 
                     {center.name}
                     {center.email}
                     {center.location}
                    
                     
                        <ul>
                          {center?.vaccineNames?.map((vaccine, idx) => (
                            <li key={idx}>{vaccine.vaccineName}</li>
                          ))}
                        </ul>
                      
                    
                        
                         
        
        
                    </tr>
                    </div>
                    </>

                  )
                
                
                )
                
                }
             
                <div className="col-md-4">

                </div>
            </div>
        </div>
    </div>
    
    </>
  )
}
