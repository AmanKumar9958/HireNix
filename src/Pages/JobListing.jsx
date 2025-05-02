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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className=" p-6 rounded-2xl shadow-md bg-[rgba(0,123,255,0.04)] backdrop-blur hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-blue-700">{job.title}</h2>
                <HeartIcon className="hover:cursor-pointer hover:fill-red-500 transition-all duration-200" stroke="red" />
              </div>
            
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {job.company && job.company.logo_url && (
                    <img src={job.company.logo_url} alt="logo" className="h-20 w-20 object-contain rounded-full" />
                  )}
                </div>
                <p className="flex items-center gap-1 text-gray-600 text-sm">
                  <MapPinIcon className="w-4 h-4" />
                  {job.location}
                </p>
              </div>
            
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                <span className="font-semibold text-white">Description:</span> {job.description}
              </p>
            
              <div className="flex justify-between items-center">
                <Link
                  to={`/job/${job.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 font-semibold text-sm"
                >
                  View Job
                </Link>
              </div>
            </div>
            
            ))}
          </div>
        ) : (
          <div>No Jobs Found</div>
        )}
      </div>
      
      )}

    </div>
  );
};

export default JobListing;
