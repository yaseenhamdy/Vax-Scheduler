import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Login from './Components/Login/Login';
import Register from './Components/Register/Register';



import AdminLayout from './Components/Admin/AdminLayout/AdminLayout'
import  AdminAllVaccineCenters from './Components/Admin/AdminAllVaccinesCenters/AdminAllVaccineCenters'
import  AdminAddVaccineCenters from './Components/Admin/AdminAddVaccineCenters/AdminAddVaccineCenters'
import { AuthProvider } from './Context/AuthContext';
import AdminRoute from './Components/Admin/AdminRoute/AdminRoute';
import AdminAllVaccine from './Components/Admin/AdminAllVaccine/AdminAllVaccine';
import AdminAddVaccine from './Components/Admin/AdminAddVaccine/AdminAddVaccine';
import UpdateCenter from './Components/Admin/AdminUpdateCenter/UpdateCenter';
import Waiting from './Components/Admin/GetWaitingPatient/Waiting';
import CenterLayout from './Components/Center/CenterLayout/CenterLayout';
import CenterWaiting from './Components/Center/CenterWaiting/CenterWaiting';
import CenterRoute from './Components/Center/CenterRoute/CenterRoute';
import Home from './Components/Patient/PatientHome/Home';
import PatientLayout from './Components/Patient/PatientLayout/PatientLayout';
import PatientRoute from './Components/Patient/PatientRoute/PatientRoute';









function App() {



let route = createBrowserRouter([
    { path: '/', element: <Login /> },

    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },



    {
      path: 'admin',
      element: <AdminRoute>  <AdminLayout /> </AdminRoute>,
      children: [
        { path: '', element: <AdminRoute>  <AdminAllVaccineCenters />  </AdminRoute> }, 
        { path: 'allvaccinecenters', element: <AdminRoute><AdminAllVaccineCenters /> </AdminRoute>  }, 


        { path: 'addVaccinecenters', element: <AdminRoute>  <AdminAddVaccineCenters />  </AdminRoute> }, 

        { path: 'allvaccines', element: <AdminRoute>  <AdminAllVaccine />  </AdminRoute> }, 
        { path: 'addvaccine', element: <AdminRoute>  <AdminAddVaccine />  </AdminRoute> }, 
        { path: 'updatecenter/:id', element: <AdminRoute>  <UpdateCenter />  </AdminRoute> }, 
        { path: 'waitingpatients', element: <AdminRoute><Waiting /> </AdminRoute>  }, 
      ],
    },


    {
      path:'center',
      element:  <CenterRoute> <CenterLayout/> </CenterRoute> ,
      children:[
       { path:'' ,element : <CenterRoute> <CenterWaiting/>  </CenterRoute>   },
       { path:'AllWaitingPatients' ,element : <CenterRoute> <CenterWaiting/>  </CenterRoute>   },
      ]
    },

    {
      path:'patient',
      element:<PatientRoute><PatientLayout/> </PatientRoute> ,
      children:[
        {path:'',element:<PatientRoute><Home/> </PatientRoute> },
        {path:'home',element:<PatientRoute><Home/> </PatientRoute> },
      ]
}



    

    


   
  ]);
  

  return (
    <AuthProvider>
    
    <RouterProvider router={route} />

    </AuthProvider>
  );
}

export default App;
