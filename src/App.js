import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import AdminLayout from './Components/AdminLayout/AdminLayout';


import AdminAllVaccineCenters from './Components/AdminAllVaccines/AdminAllVaccineCenters';
import AdminAddVaccineCenters from './Components/AdminAddVaccineCenters/AdminAddVaccineCenters';
function App() {



  let route = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    {
      path: 'admin',
      element: <AdminLayout />,
      children: [
        { path: '', element:<AdminAllVaccineCenters /> }, 
        { path: 'allvaccinecenters', element: <AdminAllVaccineCenters /> }, 
        { path: 'addVaccinecenters', element: <AdminAddVaccineCenters /> }, 
      ],
    },
  ]);
  

  return (
    <RouterProvider router={route} />

  );
}

export default App;
