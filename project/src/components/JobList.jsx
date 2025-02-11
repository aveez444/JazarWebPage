import React, { useState, useEffect } from "react";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch jobs from the API when the component mounts
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/list-jobs/");
        setJobs(response.data);
      } catch (err) {
        setError("Error fetching jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Available Job Listings
      </h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">No jobs available at the moment.</div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-600">{job.title}</h3>
              <p className="text-sm text-gray-500">{job.location}</p>
              <p className="mt-2 text-gray-700">{job.description.substring(0, 150)}...</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-400">{new Date(job.created_at).toLocaleDateString()}</span>
                <button className="text-blue-500 hover:text-blue-700 font-semibold">Apply Now</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;
