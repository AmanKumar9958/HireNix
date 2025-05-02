import { getJobs } from "@/api/jobsapi";
import useFetch from "@/hooks/useFetch";
import { useSession } from "@clerk/clerk-react";
import { useEffect } from "react";

const JobListing = () => {
  const { session } = useSession();

  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {});

  useEffect(() => {
    if(session){
      fnJobs();
    }
  }, [session]);

  useEffect(() => {
    if (dataJobs){
      console.log("Jobs Data from Database: ", dataJobs);
    }
  }, [dataJobs]);

  return (
    <div>
      <h1>Job Listing</h1>
    </div>
  );
};

export default JobListing;
