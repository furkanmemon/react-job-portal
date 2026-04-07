import React from "react";
import { useState, useEffect } from "react";
import jobs from "../jobs.json";
import JobListing from "./JobListing";
import Spinner from "./Spinner";
import { getJobs } from "../services/apiServices";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        isHome ? setJobs(data.slice(0,3)) : setJobs(data)
      } catch (error) {
        console.log("Error while fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          jobs.map((job) => <JobListing key={job.id} job={job} />)
        )}
      </div>
    </section>
  );
};

export default JobListings;
