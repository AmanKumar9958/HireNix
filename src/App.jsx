import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import LandingPage from './Pages/LandingPage'
import OnBoarding from './Pages/OnBoarding'
import JobListing from './Pages/JobListing'
import Job from './Pages/Job'
import PostJob from './Pages/PostJob'
import SavedJobs from './Pages/SavedJobs'
import MyJobs from './Pages/MyJobs'
import { ThemeProvider } from "@/components/theme-provider"
import ProtectedRoutes from './components/ProtectedRoutes'

const App = () => {

  // routes..
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <LandingPage />,
        },
        {
          path: '/onboarding',
          element: (
            <ProtectedRoutes>
              <OnBoarding />
            </ProtectedRoutes>
          )
        },
        {
          path: '/jobs',
          element: (
            <ProtectedRoutes>
              <JobListing />
            </ProtectedRoutes>
          )
        },
        {
          path: '/job/:id',
          element: (
            <ProtectedRoutes>
              <Job />
            </ProtectedRoutes>
          )
        },
        {
          path: '/post-job',
          element: (
            <ProtectedRoutes>
              <PostJob />
            </ProtectedRoutes>
          )
        },
        {
          path: '/saved-jobs',
          element: (
            <ProtectedRoutes>
              <SavedJobs />
            </ProtectedRoutes>
          )
        },
        {
          path: '/my-jobs',
          element: (
            <ProtectedRoutes>
              <MyJobs />
            </ProtectedRoutes>
          )
        },
      ]
    }
  ])

  return(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App