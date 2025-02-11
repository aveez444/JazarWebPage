import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar"; // Import Sidebar

const AdminJobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]); // State to hold the job applications
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedCV, setSelectedCV] = useState(null); // State to store the selected CV URL

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://127.0.0.1:8000/list-jobs/", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        setJobs(response.data);
      } catch (err) {
        setError("Error fetching jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Fetch job applications from API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/job-applications/");
        setApplications(response.data);
      } catch (err) {
        setError("Error fetching job applications. Please try again.");
      }
    };

    fetchApplications();
  }, []);

  // Handle delete job
  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://127.0.0.1:8000/delete-job/${jobId}/`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      setJobs(jobs.filter((job) => job.id !== jobId));
      alert("Job deleted successfully!");
    } catch (err) {
      alert("Failed to delete the job. Please try again.");
    }
  };

  // Open Modal to view CV
  const openCVModal = (cvUrl) => {
    setSelectedCV(cvUrl);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCV(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="text-lg font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 text-white min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />  {/* Include Sidebar here */}

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="text-center py-16 px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">Admin Job Management</h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Manage your posted jobs. You can delete or update job listings as needed.
          </p>
        </div>

        {/* Jobs List */}
        <div className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:transform hover:scale-105 hover:shadow-2xl transition-all"
              >
                <h2 className="text-2xl font-bold text-blue-600 mb-4">{job.title}</h2>
                <p className="text-sm text-gray-500 mb-4">{job.description}</p>
                <p className="text-sm text-gray-600 mb-4">Location: {job.location}</p>
                <p className="text-sm text-gray-600 mb-4">Eligibility: {job.eligibility}</p>

                <div className="flex justify-between mt-4">
                  {/* Update Button */}
                  <Link
                    to={`/update-job/${job.id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
                  >
                    Update
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications List Section */}
        <div className="p-8 mt-8">
          <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Candidates Applied for Jobs
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg border-collapse">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-3 px-6 text-left">Full Name</th>
                    <th className="py-3 px-6 text-left">Job Title</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Phone Number</th>
                    <th className="py-3 px-6 text-left">CV</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application) => (
                    <tr key={application.id} className="border-b hover:bg-grey-100">
                      <td className="py-3 px-6 text-black">{application.full_name}</td>
                      <td className="py-3 px-6 text-black">{application.job_title}</td>
                      <td className="py-3 px-6 text-black">{application.email}</td>
                      <td className="py-3 px-6 text-black">{application.phone_number}</td>
                      <td className="py-3 px-6 text-black">
                        <button
                          onClick={() => openCVModal(application.cv)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View CV
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal for CV */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-black hover:text-gray-700"
              >
                X
              </button>
              <h2 className="text-2xl font-bold mb-6 text-center">View CV</h2>
              <div className="flex justify-center">
                <iframe
                  src={selectedCV}
                  className="w-full h-96 border-2 border-gray-300"
                  title="CV"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-8 text-center">
        <p className="text-gray-400 text-sm">© 2025 YourBrand. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AdminJobManagement;
