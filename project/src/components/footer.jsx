import React from 'react';
import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-6">
        {/* Footer Top Section */}
        <div className="flex flex-wrap justify-between mb-8">
          {/* Quick Links Section */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a href="/" className="text-white hover:text-gray-400">Home</a>
              </li>
              <li className="mb-2">
                <a href="/services" className="text-white hover:text-gray-400">Services</a>
              </li>
              <li className="mb-2">
                <a href="/faqs" className="text-white hover:text-gray-400">FAQs</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-white hover:text-gray-400">Contact Us</a>
              </li>
              <li className="mb-2">
                <a href="/carrer" className="text-white hover:text-gray-400">Carrer</a>
              </li>
              <li className="mb-2">
                <a href="/blog" className="text-white hover:text-gray-400">Blog</a>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p>Office No.303, Majestique Biznow, B G Lonkar Road, NIBM, Kondhwa, Pune, India</p>
            <p>+91 9800790088</p>
            <p>0203551813</p>
            <p>info@jazartech.com</p>
          </div>

          {/* Social Media Section */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <Icon icon="mdi:facebook" className="text-2xl text-white hover:text-gray-400" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <Icon icon="mdi:twitter" className="text-2xl text-white hover:text-gray-400" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <Icon icon="mdi:linkedin" className="text-2xl text-white hover:text-gray-400" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <Icon icon="mdi:instagram" className="text-2xl text-white hover:text-gray-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center text-sm">
          <p>&copy; 2025 Jazar Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;