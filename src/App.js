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
  ]);
  

  return (
    <AuthProvider>
    
    <RouterProvider router={route} />

    </AuthProvider>
  );
}

export default App;
