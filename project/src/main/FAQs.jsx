import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom"; // Redirect users to Inquiry page
import TopNav from "../components/Topnav";
import Footer from "../components/footer"; // Import Footer Component

const faqs = [
  { question: "1. What services does your IT company provide?", answer: "We offer a wide range of IT services, including software development, mobile app development, web development, IT consulting, cloud solutions, and managed IT services." },
  { question: "2. Which industries do you serve?", answer: "We cater to various industries such as healthcare, finance, retail, manufacturing, telecommunications, education, government, logistics, energy, entertainment, and more." },
  { question: "3. How can your services benefit my business?", answer: "Our services are designed to improve operational efficiency, enhance data security, streamline processes, and drive digital transformation. Whether it's automation, system integration, or cloud migration, we help businesses grow." },
  { question: "4. Do you offer custom software development?", answer: "Yes, we specialize in custom software development tailored to your business needs." },
  { question: "5. What is the process for starting a project with your company?", answer: "Our process begins with a consultation to understand your goals and needs. We then move into the planning and design phase, followed by development, testing, and deployment." },
  { question: "6. Do you provide ongoing support and maintenance?", answer: "Yes, we offer comprehensive post-launch support and maintenance services. We ensure that your systems are running smoothly, provide troubleshooting, implement updates, and perform regular maintenance to keep everything up-to-date." },
  { question: "7. Can you help us with cloud migration?", answer: "Absolutely. We provide cloud consulting and migration services to help businesses transition to cloud-based infrastructure." },
  { question: "8. How do you charge for your services?", answer: "Our pricing depends on the scope and complexity of the project. We offer flexible pricing models, including fixed-price projects, hourly rates, and retainer packages." },
  { question: "9. What makes your IT company different from others?", answer: "We focus on delivering customized, client-centric solutions that drive business results. Our experienced team leverages cutting-edge technologies and innovative strategies to provide high-quality IT services with a strong focus on communication, reliability, and client satisfaction." },
  { question: "10. What technologies do you specialize in?", answer: "We work with a broad range of technologies, including Java, .NET, Python, PHP, JavaScript, React, Angular, AWS, Azure, Kubernetes, Docker, and many others. Our team stays updated with the latest tools and trends to deliver modern, future-proof solutions." }
];

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Toggle FAQs
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Filter FAQs based on search
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen text-black">
      <TopNav /> {/* Navbar */}
      
      {/* Page Container */}
      <div className="pt-24 px-4 md:px-16 flex flex-col items-center">
        
        {/* Page Title */}
        <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-6 text-gray-900">
          Frequently Asked Questions
        </h2>

        {/* Search Bar */}
        <div className="relative w-full max-w-lg mb-6">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
          />
          <Icon
            icon="mdi:magnify"
            className="absolute left-3 top-3 text-gray-500 text-xl"
          />
        </div>

        {/* FAQ Section */}
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4 md:p-6 border border-gray-200">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-300">
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center p-3 md:p-4 hover:bg-gray-100 transition-all focus:outline-none"
                >
                  <span className="text-sm md:text-lg font-semibold">{faq.question}</span>
                  <Icon
                    icon={activeIndex === index ? "mdi:chevron-up" : "mdi:chevron-down"}
                    className="text-lg md:text-xl text-gray-500"
                  />
                </button>

                {/* Smooth Transition for Answers */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeIndex === index ? "max-h-40 p-3 md:p-4 bg-gray-50" : "max-h-0 p-0"
                  }`}
                >
                  <p className="text-sm md:text-base text-gray-700">{faq.answer}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No results found.</p>
          )}
        </div>

        {/* "Still Have Questions?" Section */}
        <div className="text-center mt-6 w-full max-w-xl mx-auto bg-white shadow-md p-5 md:p-6 rounded-lg border border-gray-300">
          <h3 className="text-lg md:text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
            <Icon icon="mdi:help-circle-outline" className="text-lg md:text-2xl text-gray-700" />
            Still have questions?
          </h3>
          <p className="text-sm md:text-base text-gray-600 mt-2">Let us know how we can help you.</p>
          <button
            onClick={() => navigate("/contact")}
            className="mt-3 md:mt-4 px-4 md:px-6 py-2 md:py-3 bg-black text-white rounded-lg text-sm md:text-lg font-semibold hover:bg-gray-800 transition-all"
          >
            Contact Us
          </button>
        </div>

      </div>

      <Footer /> {/* Footer component */}
    </div>
  );
};

export default FaqPage;
