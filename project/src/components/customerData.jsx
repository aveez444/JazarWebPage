import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests
import Sidebar from "./sidebar"; // Import Sidebar instead of TopNav

const CustomerList = () => {
  const [customerData, setCustomerData] = useState([]); // State to store the fetched customer data

  // Function to fetch the customer data from the backend API
  const fetchCustomerData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/contact-list/"); // Replace with your API endpoint
      setCustomerData(response.data); // Set fetched data to state
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    fetchCustomerData(); // Fetch customer data when the component mounts
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Section */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-center mb-8 text-black">
          Inquire info
        </h1>

        {/* Table of customer orders */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-6 py-3 text-left text-xl font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-xl font-semibold">Contact No</th>
                <th className="px-6 py-3 text-left text-xl font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-xl font-semibold">Message</th>
              </tr>
            </thead>
            <tbody>
              {customerData.map((customer, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {customer.first_name} {customer.last_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {customer.contact_number}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;