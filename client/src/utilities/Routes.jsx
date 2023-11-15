import React, {useState} from 'react'
import {Route,Routes,createBrowserRouter,RouterProvider } from 'react-router-dom';
// import SignIn from '../Pages/Login/login';

import Main from './Main'
import Home from '../Pages/home/home';
import SignIn from '../components/Login/login';

const Router = () => {
  const [elmBlog, setElmBlog] = useState([]);

  const router = createBrowserRouter([
      {
      path: '/',
      element: <SignIn/>,
      // children: [
      //   {
      //     path: '/',
      //     element: <Home/>
      //   },
      // ]  
      
        },
        {
          path:'/home',
          element:<Home/>
        }
        
  ])
  return <>
   <RouterProvider router={router}></RouterProvider>
  
  
  </>
}

export default Router