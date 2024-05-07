import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ds from '../../../Images/istockphoto-1349606247-612x612.jpg'
import { useParams } from 'react-router-dom';

export default function Certificates() {
  const { vaccineid, centerid } = useParams();
  const [image, setImage] = useState(null);
  const [stat, setStat] = useState(null);
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
      setStat(response.status)
      if (response.data.message === true) {
        const base64Image = arrayBufferToBase64(response.data.value);
        const imageUrl = `data:image/jpeg;base64,${base64Image}`;
        console.log("test", imageUrl);
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

  if(stat==200){

  
  return (
    <div className='mt-3 p-5 w-100 h-100 vh-100 d-flex align-items-center justify-content-center'>
      <img src={ds} className='w-50' alt='certificate' />
    </div>
  );
}
else{
  <p>fdksjhdfkjgh</p>
}
}