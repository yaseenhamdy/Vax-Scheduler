import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
function App() {
  let route = createBrowserRouter(
    [
      {
        path: '/', element: <Layout />, children: [
          { index: true, element:<Home /> },
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
         
        ]
      }
    ]
  )

  return (
    <RouterProvider router={route} />

  );
}

export default App;
