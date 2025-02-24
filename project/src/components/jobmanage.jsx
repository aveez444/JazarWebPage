import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar";

const AdminJobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState("w-60"); // Default expanded state

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://127.0.0.1:8000/list-jobs/", {
          headers: { Authorization: `Bearer ${token}` },
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

  // Fetch job applications
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

  // Handle Excel Download
  const handleDownloadExcel = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/export-excel/", {
        responseType: "blob",
      });

      if (response.status === 404) {
        alert("No applications found.");
        return;
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Job_Applications.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Failed to download Excel file. Please try again.");
    }
  };

  // Handle job deletion
  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://127.0.0.1:8000/delete-job/${jobId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((job) => job.id !== jobId));
      alert("Job deleted successfully!");
    } catch (err) {
      alert("Failed to delete the job. Please try again.");
    }
  };

  // Handle View CV in Modal
  const openCVModal = (cvUrl) => {
    const fileUrl = `http://127.0.0.1:8000${decodeURIComponent(cvUrl)}`;
    window.open(fileUrl, "_blank"); // Open in a new tab
  };
  
  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCV(null);
  };

  // Handle sidebar state change
  const handleSidebarChange = (isExpanded) => {
    setSidebarWidth(isExpanded ? "w-60" : "w-20");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar onStateChange={handleSidebarChange} />
        <div className={`flex-1 ${sidebarWidth} flex items-center justify-center transition-all duration-300`}>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a1f2e] mb-4"></div>
            <div className="text-[#1a1f2e] text-lg font-semibold">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar onStateChange={handleSidebarChange} />
        <div className={`flex-1 ${sidebarWidth} flex items-center justify-center transition-all duration-300`}>
          <div className="text-[#1a1f2e] text-lg font-semibold">{error}</div>
        </div>
      </div>
    );
  }

  const handleDownloadCV = async (cvUrl) => {
    try {
      const fileUrl = `http://127.0.0.1:8000${decodeURIComponent(cvUrl)}`;
      
      // Fetch the file as a blob
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("Failed to fetch file.");
  
      const blob = await response.blob();
      
      // Create a download link
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", "Candidate_CV.pdf"); // Forces download with a filename
      
      // Append to document, trigger click, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      alert("CV downloaded successfully! Check your Downloads folder.");
    } catch (error) {
      alert("Error downloading CV. Please try again.");
    }
  };
  
  

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar onStateChange={handleSidebarChange} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarWidth === "w-60" ? "ml-2" : "ml-2"}`}>
        {/* Header */}
        <div className=" bg-slate-800 text-white py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Admin Job Management</h1>
          <p className="text-gray-300 text-center mt-2 max-w-3xl mx-auto">
            Manage your posted jobs. Delete or update job listings as needed.
          </p>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="p-6 flex-grow">
                  <h2 className="text-xl font-bold text-[#1a1f2e] mb-3">{job.title}</h2>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Location: {job.location}</p>
                    <p className="text-sm text-gray-500">Eligibility: {job.eligibility}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-4 flex justify-between items-center mt-auto">
                  <Link
                    to={`/update-job/${job.id}`}
                    className="bg-[#ff9800] text-white px-4 py-2 rounded hover:bg-[#f57c00] transition duration-200"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Excel Download Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleDownloadExcel}
              className=" bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-[#2a2f3e] transition duration-200 flex items-center space-x-2"
            >
              <span>📥</span>
              <span>Download Job Applications (Excel)</span>
            </button>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className=" bg-slate-800 p-4">
              <h2 className="text-xl font-bold text-white text-center">
                Candidates Applied for Jobs
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className=" bg-slate-800 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Full Name</th>
                    <th className="px-6 py-3 text-left">Job Title</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Phone Number</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{application.full_name}</td>
                      <td className="px-6 py-4">{application.job_title}</td>
                      <td className="px-6 py-4">{application.email}</td>
                      <td className="px-6 py-4">{application.phone_number}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => openCVModal(application.cv)}
                            className="text-[#ff9800] hover:text-[#f57c00] font-medium"
                          >
                            View CV
                          </button>
                          <button
                          onClick={() => handleDownloadCV(application.cv)}
                          className="bg-[#ff9800] text-white px-3 py-1 rounded hover:bg-[#f57c00] transition duration-200 flex items-center space-x-1"
                        >
                          <span>⬇</span>
                          <span>Download</span>
                        </button>


                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CV Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full m-4">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold text-[#1a1f2e]">View CV</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <iframe
                  src={selectedCV}
                  className="w-full h-96 border-2 border-gray-200 rounded"
                  title="CV"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobManagement;