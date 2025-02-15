import React, { useState } from "react";
import axios from "axios"; // Ensure axios is imported
import TopNav from "../Components/topnav"; // Import TopNav
import Footer from "../components/footer"; // Import Footer Component
import contactImage from "../assets/contact.jpg"; // Import image for the contact section

const ContactPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    contact_number: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Log the form data for debugging

    try {
      const response = await axios.post("http://127.0.0.1:8000/contact-us/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        alert("Your message has been sent successfully!");
        setFormData({
          first_name: "",
          last_name: "",
          contact_number: "",
          email: "",
          message: "",
        });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900">
      <TopNav /> {/* TopNav component */}

      {/* Main Content Section */}
      <div className="pt-40 md:pt-32 pb-16 px-6 md:px-16">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Contact Us
        </h2>

        <div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-300 shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first_name" className="block text-sm font-semibold text-gray-700">
                  First Name *
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800"
                />
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact_number" className="block text-sm font-semibold text-gray-700">
                Contact Number *
              </label>
              <input
                type="text"
                name="contact_number"
                id="contact_number"
                value={formData.contact_number}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                Comment or Message *
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white rounded-lg text-lg font-semibold hover:bg-slate-700 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* How We Can Make a Difference Section */}
      <div className="bg-white py-12 px-6 md:px-16">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center md:space-x-8 space-y-6 md:space-y-0">
          {/* Left Column: Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              How We Can Make a Difference for You?
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              At Jazar Technologies, we’re dedicated to supporting you every step of the way.
            </p>
            <p className="text-lg text-gray-700">
              <strong>✔ Personalized Solutions:</strong> Tailored services to meet your specific needs.
            </p>
            <p className="text-lg text-gray-700">
              <strong>✔ Expert Guidance:</strong> Get professional insights from our experienced team.
            </p>
            <p className="text-lg text-gray-700">
              <strong>✔ 24/7 Support:</strong> We’re available anytime to assist you.
            </p>
            <p className="text-lg text-gray-700">
              <strong>✔ Feedback & Improvement:</strong> Your input helps us grow and improve.
            </p>
          </div>

          {/* Right Column: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={contactImage}
              alt="Support"
              className="rounded-lg shadow-xl w-full max-w-sm md:max-w-md object-cover"
            />
          </div>
        </div>
      </div>

      <Footer /> {/* Footer component */}
    </div>
  );
};

export default ContactPage;
