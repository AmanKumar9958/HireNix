import React from 'react'

const JobListing = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>Job Listing</h1>
      <p>Here you can find job listings.</p>
      <div className="job-listing">
        <h2>Job Title 1</h2>
        <p>Description of Job 1</p>
        <button>Apply Now</button>
      </div>
      <div className="job-listing">
        <h2>Job Title 2</h2>
        <p>Description of Job 2</p>
        <button>Apply Now</button>
      </div>
    </div>
  )
}

export default JobListing