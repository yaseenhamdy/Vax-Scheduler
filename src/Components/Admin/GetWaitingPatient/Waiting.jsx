// import React, { useContext, useEffect, useState } from 'react'
// import { authContext } from '../../../Context/AuthContext';
// import axios from 'axios';
// import { Bars } from 'react-loader-spinner';
// import Swal from 'sweetalert2';


// export default function Waiting() {
//   let {AdminToken} = useContext(authContext);
//   const [allwaiting, setallwaiting] = useState(null);
//   const [isLoad, setIsLoad] = useState(false);
//   const [onePatient, setonePatient] = useState(null);


// async function getAllWaiting() {
//     setIsLoad(true);
//     try {
//       const response = await axios.get("https://localhost:7127/api/Accounts",{
//         headers:{
//             Authorization: `Bearer ${AdminToken}`
//         }
//       });

//       setallwaiting(response?.data);

//     } catch (error) {
//        setallwaiting(null)
//     } finally {
//       setIsLoad(false); 
//     }
// }


// async function getAllWaitingId(id) {
//     setIsLoad(true);
//     try {
//       const response = await axios.get(`https://localhost:7127/api/Accounts/${id}`, {
//         headers: {
//           Authorization: `Bearer ${AdminToken}`
//         }
//       });
  
//       await setonePatient(response?.data); 
//       await AcceptUser();
//     } catch (error) {
//       console.error("Error fetching one patient:", error);
//     } finally {
//       setIsLoad(false);
//     }
// }
  
// async function AcceptUser() {
//     setIsLoad(true);
//     try {
//       if (onePatient) {
//         let { name, ssn, password, email, phone } = onePatient;


//         let extractedData = { name, ssn, password, email, phone };

  
//         const response = await axios.post(`https://localhost:7127/api/Accounts/AcceptUser`, extractedData, {
//           headers: {
//             Authorization: `Bearer ${AdminToken}`
//           }
//         });
  
//         if(response.data.status.message===true){
//             Swal.fire({
//                 title: "Accepted!",
//                 text: "User has been Added to System",
//                 icon: "success"
//               });
//         }
//         await getAllWaiting();
//       }
//     } catch (error) {
//       console.error("Error accepting user:", error);
//     } finally {
//       setIsLoad(false);
//     }
// }







// useEffect(() => {
//     getAllWaiting();
// }, []);





// if(allwaiting===null){
//     return<>
//      <div className='vh-100 d-flex align-items-center justify-content-center'>
//          <h1 className='fs-1 fw-bolder'>No Waiting Users Exist</h1>
          
//         </div>
    
//     </>
// }


//   return (
//     <>
//      {
     
//      isLoad ? (
        
//         <div className='vh-100 d-flex align-items-center justify-content-center'>
//           <Bars
//             height="490"
//             width="490"
//             color="#09c"
//             ariaLabel="bars-loading"
//             wrapperStyle={{}}
//             wrapperClass=""
//             visible={true}
//           />
          
//         </div>

//       ) :
      
//       (
//         <div className='my-5 px-5'>
//           <div className='container-fluid'>
//             <div className='d-flex align-items-center justify-content-center'>
//               <h1 className='text center fw-bold text-success'>Hello Admin</h1>
//             </div>
//             <div className='d-flex align-items-center justify-content-center'>
//               <h3 className='text center fw-bold text-black my-4'>All Waiting Patients</h3>
//             </div>
//             <table className="table table-hover m-4 shadow-lg">
//               <thead className='fs-3'>
//                 <tr>
//                   <th className="p-2 fs-4">Id</th>
//                   <th className="p-2 fs-4">Name</th>
//                   <th className="p-2 fs-4">SSN</th>

//                   <th className="p-2 fs-4">Email</th>
                 
//                   <th className="p-2 fs-4">Phone</th>

//                   <th className="p-2 fs-4">Accept</th>
//                   <th className="p-2 fs-4">Reject</th>
//                 </tr>

//               </thead>
//               <tbody className='fs-5'>
//                 {allwaiting?.map((Patient, index) => (
//                   <tr key={index}>
//                     <td>{Patient.id}</td>
//                     <td>{Patient.name}</td>
//                     <td>{Patient.ssn}</td>
//                     <td>{Patient.email}</td>
//                     <td>{Patient.phone}</td>
                   
                   


//                     <td><button className='btn btn-success' onClick={()=>getAllWaitingId(Patient.id)}>Accept</button></td>

//                     <td><button className='btn btn-danger'>Reject</button></td>
                  
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )
      
      
      
//       }


      


    
    
//     </>
//   )
// }



// work done in accept and Refresh
import React, { useContext, useEffect, useState } from 'react'; 
import { authContext } from '../../../Context/AuthContext'; 
import axios from 'axios'; 
import { Bars } from 'react-loader-spinner'; 
import Swal from 'sweetalert2'; 

export default function Waiting() { 
    const { AdminToken } = useContext(authContext); 
    const [allWaiting, setAllWaiting] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false); 
    const [onePatient, setOnePatient] = useState(null); 





   

async function getAllWaiting() { 
    setIsLoading(true); 
    try { 
      const response = await axios.get("https://localhost:7127/api/Accounts", { 
        headers: { 
          Authorization: `Bearer ${AdminToken} `
        } 
      }); 
      setAllWaiting(response.data.length > 0 ? response.data : null); // Set to null if no data 
    } catch (error) { 
      console.error("Error fetching waiting patients:", error); 
      setAllWaiting(null); // Consider setting to null or handling errors differently 
    } finally { 
      setIsLoading(false); 
    } 
  }



async function getAllWaitingId(id) { 
    setIsLoading(true); 
    try { 
      const response = await axios.get(`https://localhost:7127/api/Accounts/${id}`, { 
        headers: { 
          Authorization:`Bearer ${AdminToken}`
        } 
      }); 
      setOnePatient(response.data); // Set state and let useEffect handle the rest 
    } catch (error) { 
      console.error("Error fetching one patient:", error); 
    } finally { 
      setIsLoading(false); 
    } 
}





useEffect(() => { 
    async function acceptUser() { 
      if (onePatient) { 
        setIsLoading(true); 
        try { 
          const { name, ssn, password, email, phone } = onePatient; 
          const extractedData = { name, ssn, password, email, phone }; 
          const response = await axios.post("https://localhost:7127/api/Accounts/AcceptUser", extractedData, { 
            headers: { 
              Authorization: `Bearer ${AdminToken} `
            } 
          }); 

 
          if (response.data.status && response.data.status.message === true) { 
            Swal.fire({ 
              title: "Accepted!", 
              text: "User has been added to the system", 
              icon: "success" 
            }); 
          } 

          getAllWaiting(); 

        } catch (error) { 
          console.error("Error accepting user:", error); 
        } finally { 
          setIsLoading(false); 
        } 
      } 
    } 
   
 if (onePatient) acceptUser(); 

  }, [onePatient, AdminToken]); 
 


  useEffect(() => { 
    getAllWaiting(); // Initial load of waiting patients 
  }, [AdminToken]);



if (allWaiting === undefined) { 
    return ( 
      <div className='vh-100 d-flex align-items-center justify-content-center'> 
        <Bars 
          height="100" 
          width="100" 
          color="#09c" 
          ariaLabel="bars-loading" 
          visible={true} 
        /> 
      </div> 
    ); 
} else if (allWaiting === null) { 
    return ( 
      <div className='vh-100 d-flex align-items-center justify-content-center'> 
        <h1 className='fs-1 fw-bolder'>No Waiting Users Exist</h1> 
      </div> 
    ); 
}


  return ( 
    <> 
      {isLoading ? ( 
        <div className='vh-100 d-flex align-items-center justify-content-center'> 
          <Bars 
            height="100" 
            width="100" 
            color="#09c" 
            ariaLabel="bars-loading" 
            visible={true} 
          /> 
        </div> 
      ) : ( 
        <div className='my-5 px-5'> 
          <div className='container-fluid'> 
            <div className='d-flex align-items-center justify-content-center'> 
              <h1 className='text-center fw-bold text-success'>Hello Admin</h1> 
            </div> 
            <div className='d-flex align-items-center justify-content-center'> 
              <h3 className='text-center fw-bold text-black my-4'>All Waiting Patients</h3> 
            </div> 
            <table className="table table-hover m-4 shadow-lg"> 
              <thead className='fs-3'> 
                <tr> 
                  <th className="p-2 fs-4">Id</th> 
                  <th className="p-2 fs-4">Name</th> 
                  <th className="p-2 fs-4">SSN</th> 
                  <th className="p-2 fs-4">Email</th> 
                  <th className="p-2 fs-4">Phone</th> 
                  <th className="p-2 fs-4">Accept</th> 
                  <th className="p-2 fs-4">Reject</th> 
                </tr> 
              </thead> 
              <tbody> 
                {allWaiting.map((patient) => ( 
                  <tr key={patient.id}> 
                    <td>{patient.id}</td> 
                    <td>{patient.name}</td> 
                    <td>{patient.ssn}</td> 
                    <td>{patient.email}</td> 
                    <td>{patient.phone}</td> 
                    <td> 
                      <button className='btn btn-success' onClick={() => getAllWaitingId(patient.id)}>Accept</button> 
                    </td> 
                    <td> 
                      <button className='btn btn-danger' onClick={() => {getAllWaitingId(patient.id)}}>Reject</button> 
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


























































