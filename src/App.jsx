import './App.css'
import Layout from './Layout'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Register from './components/register/Register'
import View from './components/View/View'


function App() {
  const router = createBrowserRouter([

    {
      path: "/",
      element: <Layout />,
    },
    {
      element: <Register />,
      path: '/register/:id',
    },
    {
      element: <View />,
      path: '/view/:id',
    },

  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
