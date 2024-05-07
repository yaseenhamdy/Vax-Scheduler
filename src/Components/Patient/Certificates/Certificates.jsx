// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

// export default function Certificates() {


//   let {vaccineid} = useParams()
//   let {centerid} = useParams();
// let [image,setImage] = useState(null);


//   let PatientId = localStorage.getItem("patiid");

//   let data={
//     PatientId:PatientId,
//     VaccineId:vaccineid,
//     VaccinationCenterId:centerid
//   };


// async function getCertificate() {
//   try {
//     let response = await axios.post('https://localhost:7127/api/VaccinationCenter/getCertificateName',data, {
//       headers: {
//         'Content-Type': 'application/json'
//       }

//     });
//     if(response.data.message===true){
//       setImage(response.data.value)
//     }

//     console.log(response.data);
//   } catch (error) {
//     console.error('Error fetching certificate:', error);
//   }
// }



// useEffect(()=>{
//  getCertificate();
// },[])

//   return (
//     <div className='mt-5 p-5 w-100 h-100 vh-100'>
//       <img src={image} className='w-100' height={100} alt="" />
//     </div>
//   )
// }



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Certificates() {
  const { vaccineid, centerid } = useParams();
  const [image, setImage] = useState(null);

  const PatientId = localStorage.getItem('patiid');

  const data = {
    PatientId: PatientId,
    VaccineId: vaccineid,
    VaccinationCenterId: centerid,
  };




async function getCertificate() {
    try {
      const response = await axios.post(
        'https://localhost:7127/api/VaccinationCenter/getCertificateName',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        }
      );
  
      if (response.data.message === true) {
        const base64Image = arrayBufferToBase64(response.data.value);
        const imageUrl = `data:image/jpeg;base64,${base64Image}`;
        console.log("test",imageUrl); 
        setImage(imageUrl);
      }
  
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching certificate:', error);
    }
  }

  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}



  useEffect(() => {
    getCertificate();
  }, []);

  return (
    <div className='mt-5 p-5 w-100 h-100 vh-100'>
      {image && <img src={image} className='w-100' height={100} alt='' />}
    </div>
  );
}