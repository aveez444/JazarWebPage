import React, { useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LoginModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", formData);
  
      // Save the access token in localStorage
      localStorage.setItem("access_token", response.data.access);
  
      // Redirect admin or normal user based on the response
      if (response.data.is_admin) {
        window.location.href = "/jobmanage";
      } else {
        window.location.href = "/career";
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };
  

  const handleGoogleLogin = async (googleData) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/google-login/", {
        google_token: googleData.credential,
      });

      // Check if login is successful and if user is admin
      if (response.data.is_admin) {
        window.location.href = "/jobmanage";
      } else {
        window.location.href = "/career";
      }
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div>
      {/* Modal */}
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center backdrop-blur-md">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm relative">
          <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Log into your account</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full mt-2 p-3 border border-gray-300 rounded-md text-gray-800"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full mt-2 p-3 border border-gray-300 rounded-md text-gray-800"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-md hover:bg-slate-700 mt-4">
              Log In
            </button>

            {/* Google Login */}
            <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => setError("Google login failed")}
                useOneTap
                shape="pill"
                theme="outline"
                text="signin_with"
                className="w-full py-3 mt-4 bg-gray-800 text-white rounded-md"
              />
            </GoogleOAuthProvider>
          </form>

          {/* Close and Back Button */}
          <div className="absolute top-2 right-2">
            <button onClick={closeModal} className="text-black hover:text-gray-700 mr-2">
              X
            </button>
            <button onClick={closeModal} className="text-gray-600 hover:text-gray-700">
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
