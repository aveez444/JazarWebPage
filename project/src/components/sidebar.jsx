import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Briefcase, Calendar, Users, Settings, HelpCircle, FileText } from "lucide-react";

const Sidebar = () => {
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
    <div className="w-64 h-full bg-slate-800 text-white flex flex-col fixed top-0 left-0 shadow-lg">
      {/* Header */}
      <div className="p-6 font-bold text-xl flex items-center justify-center border-b border-gray-700">
        <span className="text-yellow-400">Tiimi</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 mt-4 space-y-1">
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-3 rounded-md transition duration-300 ${
                isActive ? "bg-yellow-500 text-gray-900" : "hover:bg-slate-700"
              }`
            }
          >
            {item.icon}
            <span className="text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;