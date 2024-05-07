import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";

export default function WaitCertificate() {
  let CenterId = localStorage.getItem("centerid");

  const [allwaiting, setAllWaiting] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setimage] = useState(null);

  async function getAllvaccines() {
    setIsLoad(true);

    try {
      const response = await axios.get(
        `https://localhost:7127/api/VaccinationCenter/CompletedVaccinations/${CenterId}`
      );
      setAllWaiting(response?.data || []);
      console.log(response?.data);
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



  const handleFileChange = (event) => {
    const file = event.target.files; // Get the first file from the selected files
    setSelectedFile(file);
    if (file && file.length > 0) {
        setimage(file[0]?.name);
    }
};


// async function deleteCertificate(){
//   let {data} = axios.delete()
// }


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
                All Waiting For Uplaod Certificate
              </h3>
            </div>
            <table className="table table-hover m-4 shadow-lg">
              <thead className="fs-3">
                <tr>
                  <th className="p-2 fs-4">patientName</th>
                  <th className="p-2 fs-4">patientEmail</th>
                  <th className="p-2 fs-4">VaccineName</th>

                  <th className="p-2 fs-4">Upload</th>
                  <th className="p-2 fs-4">Send</th>
                </tr>
              </thead>
              <tbody className="fs-5">
                {allwaiting?.map((vac, index) => (
                  <tr key={index}>
                    <td>{vac.patientName}</td>
                    <td>{vac.patientEmail}</td>
                    <td>{vac.vaccineName}</td>

                    <td>
                      <input
                        type="file"
                        className="btn btn-success"
                        onChange={handleFileChange}
                      />
                    </td>

                    <td className="p-2 fs-4">
                      <button
                        className="btn btn-warning"
                        onClick={async () => {
                          try {
                            const data = {
                              PatientId: vac.patientId,
                              VaccineId: vac.vaccineId,
                              VaccinationCenterId: CenterId,
                              ImageUrl: image,
                            };
                            const data2 = {
                              PatientId: vac.patientId,
                              VaccineId: vac.vaccineId,
                              VaccinationCenterId: CenterId,
                            };

                            const response = await axios.post(
                              "https://localhost:7127/api/VaccinationCenter/UploadCertificate",
                              data
                            );
                            const response2 = await axios.put(
                              "https://localhost:7127/api/VaccinationCenter/UpdateFlagShowCertificate",
                              data2
                            );
                            console.log(response);
                            if (response.data.message) {
                              Swal.fire({
                                position: "center-center",
                                icon: "success",
                                title: "Certification Uploaded Successfully  ",
                                showConfirmButton: false,
                                timer: 1500,
                              });
                            }
                            await getAllvaccines();
                          } catch (error) {
                            console.error("Error accepting vaccine:", error);
                          }
                        }
                      
                      
                      }
                      >
                        Send Certificate
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
