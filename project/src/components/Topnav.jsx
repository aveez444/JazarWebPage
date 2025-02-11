import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import logoImage from '../assets/logo.png.jpg';
import LoginModal from './LoginModal';  // Import the LoginModal component

const TopNav = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State to control modal visibility

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  return (
    <nav className="bg-gray-900 text-white py-4 w-screen fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto px-8">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-3">
          <img
            src={logoImage} // Replace with your logo URL or import
            alt="Logo"
            className="h-12 w-18 rounded-full bg-white p-1"
          />
          <span className="font-bold text-lg"></span>
        </div>

        {/* Middle Section: Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/home" className="hover:text-green-400 transition">
            Home
          </Link>
          <Link to="/service" className="hover:text-green-400 transition">
            Services
          </Link>
          <Link to="/faq" className="hover:text-green-400 transition">
            FAQs
          </Link>
          <Link to="/contact" className="hover:text-green-400 transition">
            Contact
          </Link>
          <Link to="/career" className="hover:text-green-400 transition">
            Career
          </Link>
          <Link to="/blogs" className="hover:text-green-400 transition">
            Blog
          </Link>
        </div>

        {/* Right Section: Buttons */}
        <div className="flex items-center space-x-4">
          <Link to="/contact"> {/* Link to Contact Page */}
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition">
              Inquire Now
            </button>
          </Link>

          <button onClick={toggleLoginModal} className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            Login
          </button>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && <LoginModal closeModal={toggleLoginModal} />}
    </nav>
  );
};

export default TopNav;