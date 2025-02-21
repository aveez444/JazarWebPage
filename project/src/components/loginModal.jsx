import React, { useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// Option 1: Modal with subtle background blur
const LoginModal = ({ closeModal, position = { top: '50%', left: '50%' }, blurStyle = "subtle" }) => {
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
    setError("");
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", formData);
      localStorage.setItem("access_token", response.data.access);
  
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

      if (response.data.is_admin) {
        window.location.href = "/jobmanage";
      } else {
        window.location.href = "/career";
      }
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  // Different background blur styles
  const getBackgroundStyle = () => {
    switch (blurStyle) {
      case "none":
        return {};
      case "subtle":
        return {
          backdropFilter: 'blur(3px)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        };
      case "medium":
        return {
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        };
      case "strong":
        return {
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        };
      case "light":
        return {
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(255, 255, 255, 0.4)'
        };
      default:
        return {
          backdropFilter: 'blur(3px)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        };
    }
  };

  return (
    <>
      {/* Semi-transparent background overlay with blur */}
      <div 
        className="fixed inset-0 z-40"
        style={getBackgroundStyle()}
        onClick={closeModal}
      />

      {/* Modal */}
      <div 
        className="fixed z-50"
        style={{
          top: position.top,
          left: position.left,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm relative border border-gray-200">
          {/* Close Button */}
          <button 
            onClick={closeModal} 
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
          >
            ✕
          </button>
          
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
        </div>
      </div>
    </>
  );
};

export default LoginModal;