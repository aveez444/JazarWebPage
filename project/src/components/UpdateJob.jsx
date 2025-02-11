import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateJob = () => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    eligibility: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/job/${jobId}/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setJobData(response.data);
      } catch (err) {
        console.error('Error fetching job data:', err);
      }
    };

    fetchJobData();
  }, [jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/update-job/${jobId}/`,
        jobData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          }
        }
      );

      if (response.status === 200) {
        alert('Job updated successfully!');
        navigate('/jobmanage');
      }
    } catch (err) {
      alert('Failed to update the job. Please try again.');
      setLoading(false);
      if (err.response && err.response.status === 401) {
        // If the token is expired or invalid, redirect to login page
        navigate('/login');
      }
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto py-16 px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Update Job Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Job Title</label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Eligibility</label>
            <input
              type="text"
              name="eligibility"
              value={jobData.eligibility}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
