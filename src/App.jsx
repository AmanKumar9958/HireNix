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
          element: <OnBoarding />,
        },
        {
          path: '/jobs',
          element: <JobListing />,
        },
        {
          path: '/job/:id',
          element: <Job />,
        },
        {
          path: '/post-job',
          element: <PostJob />,
        },
        {
          path: '/saved-jobs',
          element: <SavedJobs />,
        },
        {
          path: '/my-jobs',
          element: <MyJobs />,
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