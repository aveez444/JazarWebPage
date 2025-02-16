import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, Briefcase, Calendar, Users, Settings, HelpCircle, FileText, 
  Menu, X, ChevronLeft, ChevronRight 
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Controls sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "Inquiry", icon: <Briefcase size={20} />, path: "/contact-list" },
    { name: "Jobs", icon: <Briefcase size={20} />, path: "/jobs" },
    { name: "Blog", icon: <FileText size={20} />, path: "/blogstruc" },
    { name: "JobManage", icon: <Settings size={20} />, path: "/jobmanage" },
    { name: "Help", icon: <HelpCircle size={20} />, path: "/help" },
    { name: "Calendar & Todos", icon: <Calendar size={20} />, path: "/calendar" },
    { name: "Candidates", icon: <Users size={20} />, path: "/candidates" },
    { name: "Employee", icon: <Users size={20} />, path: "/employee" },
  ];

  return (
    <>
      {/* Sidebar Container */}
      <div className={`h-screen bg-slate-800 text-white shadow-lg transition-all duration-300 
       ${isOpen ? "w-64" : "w-20"} fixed top-0 left-0 md:relative flex flex-col`}>

        
        {/* Sidebar Header with Toggle Button */}
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <span className={`text-yellow-400 font-bold text-xl transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
            Tiimi
          </span>

          <button onClick={toggleSidebar} className="text-white">
            {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4 space-y-1">
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-md transition duration-300 ${
                  isActive ? "bg-yellow-500 text-gray-900" : "hover:bg-slate-700"
                }`
              }
            >
              {item.icon}
              <span className={`text-sm transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Content Overlay for Mobile */}
      {!isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
          onClick={toggleSidebar} 
        ></div>
      )}
    </>
  );
};

export default Sidebar;
