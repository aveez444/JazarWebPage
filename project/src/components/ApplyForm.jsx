import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import hooks for dynamic routing and navigation

const ApplyForm = () => {
  const { jobId } = useParams(); // Get the job ID from the URL
  const navigate = useNavigate(); // To navigate after form submission
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
    linkedinProfile: "",
    jobTitle: "",
    qualification: "",
    cv: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, cv: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("full_name", formData.fullName);
    form.append("email", formData.email);
    form.append("phone_number", formData.phoneNumber);
    form.append("location", formData.location);
    form.append("linkedin_profile", formData.linkedinProfile);
    form.append("job_title", formData.jobTitle);
    form.append("qualification", formData.qualification);
    form.append("cv", formData.cv);
    form.append("job", jobId);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/apply-job/", // Your backend API to post the application
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 201) {
        alert("Application submitted successfully!");
        navigate("/career"); // Redirect to the career page after successful submission
      } else {
        alert("Error submitting application.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900">
      <div className="py-16 px-6 md:px-16">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Job Application</h2>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 mt-2 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 mt-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="linkedinProfile" className="block text-sm font-semibold text-gray-700">
                LinkedIn Profile (optional)
              </label>
              <input
                type="text"
                name="linkedinProfile"
                value={formData.linkedinProfile}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="qualification" className="block text-sm font-semibold text-gray-700">
                Qualification
              </label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="cv" className="block text-sm font-semibold text-gray-700">
                Upload CV
              </label>
              <input
                type="file"
                name="cv"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyForm;
