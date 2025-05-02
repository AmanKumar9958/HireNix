import { getJobs } from "@/api/jobsapi";
import useFetch from "@/hooks/useFetch";
import { useSession } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { HeartIcon, MapPinIcon } from "lucide-react"
import { Link } from "react-router-dom";

const JobListing = () => {
  const { isLoaded } = useSession();
  const { session } = useSession();

  // for filters..
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompanyId] = useState("");

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    searchQuery,
    company_id,
  });

  useEffect(() => {
    if(isLoaded && session){
      fnJobs();
    }
  }, [isLoaded, session, location, searchQuery, company_id]);

  if(!isLoaded){
    return <BarLoader className='mb-4' width={"100%"} color='blue' />
}

  return (
    <div className="px-5">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 mt-5">
        Latest Jobs
      </h1>

      {/* Will add filters soon */}

      {loadingJobs && (
        <BarLoader className='mb-4' width={"100%"} color='blue' />
      )}

      {loadingJobs === false && (
        <div>
          {jobs?.length ? (
            jobs.map((job) => (
              <div key={job.id} className="lg:w-[60%] m-auto border p-4 mb-4 shadow-md hover:shadow-lg transition-all duration-300 bg-[rgba(0,123,255,0.04)] backdrop-blur rounded-lg">
                <h2 className="text-2xl font-bold">{job.title}</h2>
                <div className="flex flex-row items-center justify-between mb-2">
                  <p className="text-gray-500">{job.company && <img src={job.company.logo_url} className='h-6 mt-2 mb-2' />}</p>
                  <p className="text-gray-500 flex items-center justify-center gap-2"><MapPinIcon />{job.location}</p>
                </div>
                <hr className="py-2" />
                <p className="text-gray-600 text-justify"><span className="text-white">Description: </span> {job.description}</p>
                <div className="flex flex-row items-center justify-between mt-4">
                  <div className="flex flex-row items-center justify-center border mt-4 bg-[rgba(0,123,255,0.04)] backdrop-blur rounded-lg p-2">
                    <Link to={`/job/${job.id}`} className="text-blue-500 hover:text-blue-700 font-bold hover:cursor-pointer">View Job</Link>
                  </div>
                  <div>
                    <HeartIcon className="hover:cursor-pointer hover:fill-red-700" stroke="red" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              No Jobs Found
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default JobListing;
