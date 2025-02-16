import React, { useState } from "react";
import TopNav from "../components/Topnav";// Import TopNav component
import videoBg from "../assets/videoBg.mp4.mp4"; // Import the video file
import pythonImage from "../assets/python.png.webp";
import softwareImage from "../assets/software.png";
import dataImage from "../assets/data.png";
import cloudImage from "../assets/cloud.png";
import { Icon } from "@iconify/react"; // Import Iconify for Industries Icons
import missionImage from '../assets/mission.png';
import visionImage from '../assets/vision.png';
import invvoImage from '../assets/invvo.png';  // Adjust the path based on your folder structure
import teamImage from '../assets/team.png';  // Adjust the path as needed based on the folder structure
import aiImage from '../assets/ai.png';  // Adjust the path as needed based on the folder structure

const services = [
  {
    title: "Software Testing",
    description: "Manual and automated testing, QA services, etc.",
    details:
      "Our Software Testing services ensure high-quality software through manual and automated testing, including functional, performance, and security tests.",
    image: softwareImage,
  },
  {
    title: "Python Development",
    description: "Web apps, automation, and custom solutions.",
    details:
      "Our Python Development team specializes in web applications, automation tools, data processing, and custom software solutions.",
    image: pythonImage,
  },
  {
    title: "Data Analysis",
    description: "Insights through Excel, Power BI, Tableau, SQL, etc.",
    details:
      "We offer Data Analysis services that provide actionable insights using tools like Power BI, Tableau, and advanced SQL queries.",
    image: dataImage,
  },
  {
    title: "Cloud Solutions",
    description: "Azure-based cloud services.",
    details:
      "Our Cloud Solutions include Azure-based cloud architecture, deployment, and management to ensure scalability and reliability.",
    image: cloudImage,
  },
];

const industries = [
  { title: "Software", icon: "mdi:monitor" },
  { title: "Healthcare", icon: "mdi:medical-bag" },
  { title: "Retail", icon: "mdi:shopping" },
  { title: "Education", icon: "mdi:school" },
  { title: "Manufacturing", icon: "mdi:factory" },
  { title: "Government and Public Sector", icon: "mdi:office-building" },
  { title: "Hospitality", icon: "mdi:hotel" },
  { title: "Energy and Utilities", icon: "mdi:power-plug" },
];

const CompanyInfo = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="relative w-full overflow-x-hidden">


      {/* Top Navigation */}
      <TopNav />

      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden">
        <video autoPlay loop muted className="w-full h-full object-cover">
         <source src={videoBg} type="video/mp4" />
         Your browser does not support the video tag.
        </video>

  {/* Dark Overlay */}
        <div div className="absolute inset-0 w-full h-full bg-black/40"></div>
        </div>

        {/* Content Over Video */}
        <div className="relative z-10 flex flex-col items-center justify-center h-screen text-white text-center px-6 md:px-10">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
            Welcome to Our Company
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl">
            We innovate to shape the future.
        </p>
        </div>

        {/* Company Tagline Section */}
        <div className="bg-gray-50 py-16 px-4 sm:px-8 md:px-16 text-center shadow-lg rounded-lg">
        <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 text-transparent bg-clip-text uppercase tracking-wide">
            Jazar Technology
        </p>
        <p className="text-base sm:text-lg md:text-2xl font-semibold mt-6 max-w-3xl mx-auto leading-relaxed text-transparent bg-gradient-to-r from-slate-500 via-green-500 to-sky-900 bg-clip-text">
            "Jazar Technologies empowers businesses to innovate, streamline operations, and enhance customer experiences, ensuring they lead in an ever-evolving digital landscape."
        </p>
        </div>


      {/* Our Services Section */}
      <div className="bg-white py-16 px-6 md:px-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden transform hover:scale-105 hover:z-10"
            >
              {/* Service Image */}
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 object-cover"
              />
              {/* Details */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm mb-4 px-4">{service.description}</p>
                <button
                  onClick={() => setSelectedService(service)}
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition mt-12"
                >
                  Know More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industries We Serve Section */}
      <div className="bg-gray-50 py-16 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Industries We Serve
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-center">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
            >
              {/* Industry Icon */}
              <div className="p-6 bg-slate-100 rounded-t-lg flex justify-center items-center">
                <Icon icon={industry.icon} className="text-4xl text-black" />
              </div>

              {/* Industry Title */}
              <h3 className="text-xl font-semibold text-gray-800 py-3 sm:py-4">{industry.title}</h3>


              {/* Description */}
              <div className="px-4 pb-6 text-sm sm:text-base text-slate-600">
                {industry.description}
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-black to-slate-100 bg-opacity-30 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-slate-900 text-lg font-semibold">{industry.title} Industry</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission and Vision Section */}
      <div className="bg-white py-16 px-6 md:px-16">
        {/* Mission Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Our Mission
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center md:space-x-8">
            <div className="w-full md:w-1/2 h-[300px] order-1">
            <img src={missionImage} alt="Mission" className="w-full h-full object-cover rounded-lg" />

          </div>
          <div className="w-full md:w-1/2 text-left mt-12 order-2 md:order-1">
            <p className="text-lg mb-4">
                <strong>Innovate and Empower:</strong> Leverage cutting-edge technology to create innovative solutions.
            </p>

            <p className="text-lg mb-4">
              <strong>Deliver Excellence:</strong> Provide high-quality, reliable, and efficient services across software development, data analysis, and cloud solutions.
            </p>
            <p className="text-lg mb-4">
             <strong> Foster Growth:</strong> Cultivate a collaborative and growth-oriented environment that supports continuous learning and professional development.
            </p>
            <p className="text-lg mb-4">
            <strong> Prioritize Integrity:</strong> Uphold the highest standards of integrity and transparency in all our interactions.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <h2 className="text-3xl font-bold text-gray-800 mt-16 mb-8 text-center">
          Our Vision
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center md:space-x-8">
            <div className="w-full md:w-1/2 h-[300px] order-1 md:order-none mb-6 md:mb-0">
            <img src={visionImage} alt="Mission" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="w-full md:w-1/2 mb-8 md:mb-0 text-left order-2 md:order-none">
          <p className="text-lg mb-4">
            <strong>Transform the Future with Technology:</strong> Lead the way in technological innovation by creating solutions.
            </p>
            <p className="text-lg mb-4">
            <strong>Be a Trusted Partner:</strong> Establish ourselves as a go-to partner for businesses seeking cutting-edge technology solutions.
            </p>
            <p className="text-lg mb-4">
            <strong>Foster Sustainable Growth:</strong> Drive sustainable growth for our clients and ourselves by continuously adapting to emerging technologies.
            </p>
            <p className="text-lg mb-4">
            <strong>Empower People and Organizations:</strong> Enhance the capabilities of individuals and organizations.
            </p>
          </div>
        </div>
      </div>

      {/* Stride Into Your Next Challenge Section */}
      <div className="bg-gray-100 py-16 px-6 md:px-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Stride Into Your Next Challenge!
        </h2>
        <p className="text-lg mb-8 text-gray-600">
          Your intention, our mission. Connect with us and let's bring ideas to life.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Text Section */}
          <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] bg-gray-300 rounded-lg overflow-hidden">
            <img src={aiImage} alt="AI Image" className="w-full h-full object-cover" />
          </div>
          <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] bg-gray-300 rounded-lg overflow-hidden">
            <img src={invvoImage} alt="Your Image" className="w-full h-full object-cover" />
          </div>
          <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] bg-gray-300 rounded-lg overflow-hidden">
            <img src={teamImage} alt="Team Image" className="w-full h-full object-cover" />
          </div>

        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-black text-white py-8 px-4 md:px-16">
        <div className="flex mb-9 justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">Explore</h3>
            <ul>
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/services" className="hover:underline">Services</a></li>
              <li><a href="/faqs" className="hover:underline">FAQs</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
              <li><a href="/career" className="hover:underline">Carrer</a></li>
              <li><a href="/blogs" className="hover:underline">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Contact Us</h3>
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:map-marker" className="text-xl" />
              <p className="ml-2">Office No.303, Majestique Biznow, B G Lonkar Road, NIBM, Kondhwa, Pune, India</p>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Icon icon="mdi:phone" className="text-xl" />
              <p className="ml-2">+91 9800790088</p>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Icon icon="mdi:telephone" className="text-xl" />
              <p className="ml-2">0203551813</p>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Icon icon="mdi:email" className="text-xl" />
              <p className="ml-2">info@jazartech.com</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>&copy; 2025 Jazar Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CompanyInfo;
