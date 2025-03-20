import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import { Icon } from "@iconify/react"; // Import Iconify for the menu icon
import logoImage from '../assets/logo.png.jpg';
import LoginModal from './LoginModal';  // Import the LoginModal component

const TopNav = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white py-4 w-screen fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto px-8">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-3">
        <Link to="/">
          <img
            src={logoImage} 
            alt="Logo"
            className="h-12 w-18 rounded-full bg-white p-1 cursor-pointer"
          />
        </Link>

        </div>

        {/* Desktop Navigation - Hidden on Mobile */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-green-400 transition">Home</Link>
          <Link to="/services" className="hover:text-green-400 transition">Services</Link>
          <Link to="/contact" className="hover:text-green-400 transition">Contact</Link>
          <Link to="/career" className="hover:text-green-400 transition">Career</Link>
          <Link to="/blogs" className="hover:text-green-400 transition">Blog</Link>
          <Link to="/faq" className="hover:text-green-400 transition">FAQs</Link>
        </div>

        {/* Right Section: Buttons (Hidden on Mobile) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/contact">
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition">
              Inquire Now
            </button>
          </Link>

          <button onClick={toggleLoginModal} className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <Icon icon="mdi:menu" className="text-3xl" />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900 text-white shadow-lg py-4 px-6 flex flex-col space-y-4">
          <Link to="/" className="hover:text-green-400 transition" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/services" className="hover:text-green-400 transition" onClick={toggleMobileMenu}>Services</Link>
          <Link to="/faq" className="hover:text-green-400 transition" onClick={toggleMobileMenu}>FAQs</Link>
          <Link to="/contact" className="hover:text-green-400 transition" onClick={toggleMobileMenu}>Contact</Link>
          <Link to="/career" className="hover:text-green-400 transition" onClick={toggleMobileMenu}>Career</Link>
          <Link to="/blogs" className="hover:text-green-400 transition" onClick={toggleMobileMenu}>Blog</Link>

          {/* Mobile Buttons */}
          <Link to="/contact">
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition w-full">
              Inquire Now
            </button>
          </Link>

          <button onClick={toggleLoginModal} className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition w-full">
            Login
          </button>
        </div>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && <LoginModal closeModal={toggleLoginModal} />}
    </nav>
  );
};

export default TopNav;
