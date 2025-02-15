import React from 'react';
import { Icon } from '@iconify/react';
import softwareImage from '../assets/software.png';
import pythonImage from '../assets/python.png.webp';
import dataImage from '../assets/data.png';
import cloudImage from '../assets/cloud.png';
import webImage from '../assets/image4.png';  // Assuming you have a webImage
import mobileAppImage from '../assets/vision.png';  // Assuming you have a mobileAppImage
import itConsultingImage from '../assets/image5.png';  // Assuming you have an itConsultingImage
import aiImage from '../assets/ai.png';  // Assuming you have an aiImage
import TopNav from '../Components/topnav'; // Importing TopNav
import Footer from '../components/footer'; // Import Footer Component

const services = [
  {
    title: "Software Testing",
    description: "Manual and automated testing, QA services, etc.",
    details: [
      "Expertise: We bring a wealth of experience in both manual and automated testing.",
      "Efficiency: Our automated testing solutions save time and reduce costs.",
      "Quality Assurance: We offer end-to-end QA services.",
      "Customization: We tailor our testing approach to meet your specific needs.",
      "Reliability: Our testing processes help prevent costly post-release defects."
    ],
    image: softwareImage,
  },
  {
    title: "Python Development",
    description: "Web apps, automation, and custom solutions.",
    details: [
      "Proven Expertise: Our team excels in Python development.",
      "Tailored Solutions: We provide customized development.",
      "Rapid Delivery: We use Python’s powerful frameworks and libraries.",
      "Scalability: Our solutions scale with your business.",
      "Dependable Results: We prioritize reliability and performance."
    ],
    image: pythonImage,
  },
  {
    title: "Data Analysis",
    description: "Insights through Excel, Power BI, Tableau, SQL, etc.",
    details: [
      "Diverse Expertise: Proficient in tools like Excel, Power BI, Tableau.",
      "Insightful Analysis: Providing deep insights for better decision-making.",
      "Custom Solutions: Tailored to your unique business needs.",
      "Integration Skills: Seamlessly integrate data from various sources.",
      "Interactive Visualizations: Create insightful dashboards with data."
    ],
    image: dataImage,
  },
  {
    title: "Cloud Solutions",
    description: "Azure-based cloud services.",
    details: [
      "Azure Expertise: Our team specializes in Azure solutions.",
      "Custom Architecture: We design optimal cloud architecture.",
      "End-to-End Service: From consultation to ongoing support.",
      "Security & Compliance: We ensure regulatory compliance.",
      "Cost Optimization: Maximize your ROI through cost-saving features."
    ],
    image: cloudImage,
  },
  {
    title: "Web Development",
    description: "Custom and scalable web solutions.",
    details: [
      "Custom Web Development: Building bespoke websites tailored to the client's specific business needs, including front-end and back-end development.",
      "E-commerce Development: Creating scalable online stores using platforms like Shopify, WooCommerce, Magento, or custom solutions.",
    ],
    image: webImage,
  },
  {
    title: "Mobile App Development",
    description: "Designing and developing mobile applications.",
    details: [
      "iOS/Android App Development: Designing and developing mobile apps using native technologies (Swift, Kotlin) or cross-platform frameworks (React Native, Flutter).",
      "Mobile App Maintenance & Updates: Providing ongoing support and updates to mobile apps to ensure they remain functional and up-to-date with the latest OS releases.",
    ],
    image: mobileAppImage,
  },
  {
    title: "IT Consulting & Strategy",
    description: "Expert guidance to optimize business IT infrastructure.",
    details: [
      "IT Strategy Development: Creating a roadmap for businesses to align their IT infrastructure with business goals and drive long-term success.",
      "Cloud Strategy: Helping businesses determine the best cloud strategy, including hybrid, multi-cloud, and single-cloud options, to meet their needs.",
    ],
    image: itConsultingImage,
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    description: "AI/ML solutions to drive intelligent decision-making.",
    details: [
      "AI Strategy & Consulting: Helping businesses identify opportunities for AI integration and providing a roadmap for implementation.",
    ],
    image: aiImage,
  },
];

const ServiceSection = () => {
  return (
    <div>
      <TopNav /> {/* Importing TopNav */}
      
      {/* Scrollable Section */}
      <div className="py-16 px-6 md:px-16">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10">Our Services</h2>
        
        {/* Horizontal Scrolling Container */}
        <div className="overflow-x-auto flex space-x-8 ">
          {services.map((service, index) => (
            <div key={index} className="relative bg-white rounded-lg shadow-xl p-8 min-w-[300px] max-w-[350px] border-2 border-gray-200 hover:transform  hover:scale-105 hover:shadow-2xl transition-all">
              <div className="flex justify-center mb-4">
                <img src={service.image} alt={service.title} className="w-16 h-16 object-cover rounded-full border-4 border-blue-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">{service.title}</h3>
              <p className="text-gray-600 text-center mb-4">{service.description}</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {service.details.map((detail, idx) => (
                  <li key={idx} className="text-gray-700 mb-2">{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <Footer /> {/* Rendering the Footer Component */}
    </div>
  );
};

export default ServiceSection;
