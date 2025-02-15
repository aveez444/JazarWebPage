import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import TopNav from '../Components/topnav';  // Import TopNav
import Footer from '../components/footer';  // Import Footer Component
import roboticVideo from '../assets/robotic.mp4'; // Import the video

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

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle answer visibility
  };

  return (
    <div className="bg-gray-100 text-black mt-8 min-h-screen">
      <TopNav />  {/* TopNav component */}

      {/* Main Content Section */}
      <div className="py-16 px-12 md:px-24 flex flex-col items-center">
        
        {/* Video Section */}
        <div className="mb-12 w-full   ">
          <div className="bg-gray-600 rounded-lg h-[700px]   overflow-hidden">
            {/* Video player */}
            <video autoPlay loop muted className="w-full h-full object-cover">
              <source src={roboticVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
        </div>

        <h2 className="text-4xl text-black font-extrabold text-center mb-12">Frequently Asked Questions</h2>

        {/* FAQ Section */}
        <div className="w-full max-w-screen-xl px-6 py-16 bg-gray-100">
          <div className="space-y-6">
            {/* FAQ Items */}
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-300 rounded-lg shadow-md overflow-hidden">
                <div
                  onClick={() => handleToggle(index)}
                  className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-400 transition"
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <Icon
                    icon={activeIndex === index ? "mdi:chevron-up" : "mdi:chevron-down"}
                    className="text-xl"
                  />
                </div>

                {activeIndex === index && (
                  <div className="p-6 bg-gray-400">
                    <p className="font-bold">{faq.answer}</p> {/* Answer in bold */}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer /> {/* Footer component */}
    </div>
  );
};

export default FaqPage;
