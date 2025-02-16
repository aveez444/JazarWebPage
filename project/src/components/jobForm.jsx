import React, { useState } from "react";
import Sidebar from "./sidebar"; // Import Sidebar component
import axios from "axios";

const JobForm = () => {
  const [formData, setFormData] = useState({});
  const [columns, setColumns] = useState([
    { key: "title", label: "Job Title" },
    { key: "description", label: "Description" },
    { key: "location", label: "Location" },
    { key: "eligibility", label: "Eligibility" },
    { key: "roleOverview", label: "Role Overview" },
    { key: "preferred", label: "Preferred Qualifications" },
  ]);
  
  const [newColumnName, setNewColumnName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddColumn = () => {
    if (newColumnName.trim() === "") {
      alert("Column name cannot be empty!");
      return;
    }
    const newKey = newColumnName.toLowerCase().replace(/\s+/g, "_");
    setColumns([...columns, { key: newKey, label: newColumnName }]);
    setNewColumnName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/post-job/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setMessage("Job posted successfully!");
        setFormData({});
      } else {
        setMessage("Failed to post job. Please try again.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      setMessage("Error connecting to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">
            Job Posting Form
          </h2>

          {/* Message Alert */}
          {message && (
            <div
              className={`p-4 mb-4 rounded ${
                message.includes("successfully")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          {/* Job Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Render Fields */}
            {columns.map((column) => (
              <div key={column.key} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-sm font-medium text-gray-700">
                  {column.label}
                </label>
                {column.key === "description" ? (
                  <textarea
                    name={column.key}
                    value={formData[column.key] || ""}
                    onChange={handleChange}
                    placeholder={`Enter ${column.label}`}
                    className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                    rows="6"
                  ></textarea>
                ) : (
                  <input
                    type="text"
                    name={column.key}
                    value={formData[column.key] || ""}
                    onChange={handleChange}
                    placeholder={`Enter ${column.label}`}
                    className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    required
                  />
                )}
              </div>
            ))}

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-200 transition duration-200"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
