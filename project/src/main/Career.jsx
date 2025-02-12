import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';  
import TopNav from "../Components/topnav";
import careerVideo from '../assets/bgvideo2.mp4'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
let slider;
import Footer from "../components/footer";

const API_URL = "http://127.0.0.1:8000/list-jobs/"; 

const Career = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: { "Accept": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch job listings");
        }

        const data = await response.json();
        setJobListings(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-100 w-full mt-16 text-white min-h-screen">
      <TopNav />

       {/* Video Section */}
       <div className="relative w-full h-[500px] md:h-[800px]">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src={careerVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4 md:px-6">
          <h4 className="text-xl md:text-3xl font-semibold text-blue-300 drop-shadow-lg animate-fadeIn">Work at Jazar Tech</h4> 
          <h1 className="text-4xl md:text-7xl font-bold drop-shadow-lg animate-fadeIn mt-4">Join our team where innovation meets impact.</h1>
          <p className="text-base md:text-lg mt-6 text-white-200 max-w-2xl mx-auto animate-slideUp px-4">
            At Jazar Tech, we empower visionaries, problem-solvers, and pioneers to shape the future of technology. Whether you're a developer pushing the boundaries of AI, a strategist driving digital transformation, or a creative mind redefining user experiences—we have a place for you.
          </p>
        </div>
      </div>
      
      {/* Job Listings Section */}
      <div className="w-full px-4 md:px-16 py-12 md:py-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 shadow-lg">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-8 md:mb-14 bg-gradient-to-r from-black via-gray-700 to-black text-transparent bg-clip-text">
          EXPLORE OUR CURRENT JOB OPENINGS 
        </h2>
        <br></br>
        {loading && <p className="text-center text-gray-500">Loading jobs...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-14">
          {jobListings.map((job, index) => (
            <div
              key={index}
              className="bg-white p-4 md:p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all border border-gray-300 hover:border-blue-500 transform hover:scale-105"
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{job.title}</h3>
              <p className="text-gray-600 text-sm mb-3">📍 {job.location}</p>
              <p className="text-gray-700 text-sm mb-4">{job.description}</p>

              <h4 className="text-base md:text-lg font-semibold text-gray-900">Eligibility:</h4>
              <p className="text-sm text-gray-700 mb-2">{job.eligibility}</p>

              <h4 className="text-base md:text-lg font-semibold text-gray-900">Role Overview:</h4>
              <p className="text-sm text-gray-700 mb-2">{job.roleOverview}</p>

              <h4 className="text-base md:text-lg font-semibold text-gray-900">Preferred Qualifications:</h4>
              <p className="text-sm text-gray-700 mb-2">{job.preferred}</p>

              <p className="text-gray-500 text-sm mb-4">📅 Posted on: {new Date(job.created_at).toLocaleDateString()}</p>

              <Link to={`/apply/${job.id}`}>
                <button className="mt-4 w-full bg-black hover:bg-gray-800 transition text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold shadow-md hover:shadow-lg">
                  Apply Now
                </button>
              </Link>
            </div>
          ))}
        </div>
        <br></br>
        <br></br>

      {/* Life at Jazar Tech Section */}
      <div className="w-full px-4 md:px-16 py-12 md:py-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 shadow-lg">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-8 md:mb-14 bg-gradient-to-r from-black via-purple-500 to-black text-transparent bg-clip-text">
          Explore the community and Life at <br className="hidden md:block"></br> JAZAR TECH SOLUTIONS
        </h1>
        <p className="text-base md:text-lg text-gray-800 text-center max-w-4xl mx-auto mb-6 md:mb-8 px-4">
          At Jazar Tech Solutions, we cultivate an environment of innovation, collaboration, and growth. Our team is driven by a shared passion for technology and excellence, creating impactful solutions for the future.
        </p>
        <p className="text-base md:text-lg text-gray-800 text-center max-w-4xl mx-auto mb-6 md:mb-8 px-4">
          From dynamic project collaborations to continuous learning opportunities, we ensure that every individual has the resources and support needed to excel. Join us and be part of a workplace where your ideas and skills are valued.
        </p>
      </div>
      </div>

    {/* How You Can Make a Difference Section */}
    <div className="w-full px-4 md:px-16 py-12 md:py-20 bg-white text-black text-center">
      <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-black via-purple-500 to-black text-transparent bg-clip-text mb-8 md:mb-14">
        HOW YOU CAN MAKE A DIFFERENCE AT JAZAR TECH
      </h2>

      <div className="relative max-w-6xl mx-auto">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 md:p-3 rounded-full shadow-lg hover:bg-gray-900 transition-all"
          onClick={() => slider?.slickPrev()}
        >
          &#10094;
        </button>

        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 md:p-3 rounded-full shadow-lg hover:bg-gray-900 transition-all"
          onClick={() => slider?.slickNext()}
        >
          &#10095;
        </button>

        <Slider
          {...sliderSettings}
          ref={(sliderRef) => (slider = sliderRef)}
          className="max-w-6xl mx-auto"
        >
          {[
            {
              title: "Innovate with Cutting-Edge Technology",
              description:
                "Work on groundbreaking projects in a meaningful environment using the latest technologies like AI, blockchain, and cloud computing.",
              image: "https://cdn.elearningindustry.com/wp-content/uploads/2024/04/Shutterstock_1315649687.jpg",
            },
            {
              title: "Lead Transformative Projects",
              description:
                "Take ownership of high-impact projects and lead teams to deliver solutions and services that shape industries.",
              image: "https://media.licdn.com/dms/image/v2/D4D12AQFEULWT_xftuQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1690271096820?e=2147483647&v=beta&t=4xSzpGEzu3CXHV4BR6IjJtHB0WTQKe1jFKE4j4lo_GQ",
            },
            {
              title: "Collaborate with Global Teams",
              description:
                "Join a diverse, global team and collaborate with experts from around the world to solve complex challenges.",
              image: "https://images.squarespace-cdn.com/content/v1/56b295f91bbee05e086dbc6f/d024342c-afaf-4c8a-845e-55f4528e4d4e/Collaboration.jpeg",
            },
            {
              title: "Grow Your Career with Us",
              description:
                "Access continuous learning opportunities, mentorship, and career development programs to grow professionally.",
              image: "https://www.chailease.com.my/wp-content/uploads/career_hero_mb.jpg",
            },
            {
              title: "Make a Significant Social Impact",
              description:
                "Contribute to projects that drive positive change in communities, create revolutionary decisions and promote sustainability.",
              image: "https://trak.in/wp-content/uploads/2016/02/Social-Impact.jpg",
            },
          ].map((opportunity, index) => (
            <div key={index} className="p-4 md:p-6">
              <div className="rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:border-4 hover:border-purple-500">
                <img
                  src={opportunity.image}
                  alt={opportunity.title}
                  className="w-full h-48 md:h-64 object-cover"
                />
                <div className="p-4 md:p-6 bg-gray-100">
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
                    {opportunity.title}
                  </h3>
                  <p className="text-gray-700 text-base md:text-lg">
                    {opportunity.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Our Values Section */}
      <div className="w-full px-4 md:px-16 py-12 md:py-20 bg-gray-50 text-black">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-8 md:mb-14 bg-gradient-to-r from-black via-purple-500 to-black text-transparent bg-clip-text">
          OUR VALUES ARE PART OF EVERYTHING WE BUILD
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
          {["Innovation", "Collaboration", "Sustainability", "Integrity"].map((value, index) => (
            <div key={index} className="bg-white p-6 md:p-10 rounded-lg shadow-lg hover:shadow-2xl transition-all border border-gray-200 hover:border-blue-500">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 md:mb-6">{value}</h3>
              <p className="text-gray-700 text-base md:text-lg">
                {value === "Innovation" && "We believe in pushing boundaries and creating solutions that redefine what's possible. Innovation is at the heart of everything we do. By embracing emerging technologies and fostering a culture of creativity, we continuously challenge the status quo. Our goal is to develop transformative solutions that make a lasting impact on industries and communities."}
                {value === "Collaboration" && "Our strength lies in our diverse team. We work together to solve complex challenges and deliver exceptional results. Through open communication, mutual respect, and collective problem-solving, we harness the power of teamwork. By bringing together different perspectives and expertise, we drive meaningful innovation and long-term success."}
                {value === "Sustainability" && "We are committed to building a better future by integrating sustainable practices into our projects and operations. From reducing our carbon footprint to implementing eco-friendly solutions, we prioritize sustainability at every level. Our approach ensures that we create responsible and lasting technological advancements for future generations."}
                {value === "Integrity" && "We uphold the highest standards of ethics and transparency in all our interactions, ensuring trust and reliability. Honesty, accountability, and fairness are the core pillars of our work culture. By maintaining integrity in everything we do, we build strong relationships with our employees, clients, and partners, fostering long-term trust and credibility."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

     {/* Inclusion and Diversity Section */}
     <div className="w-full px-4 md:px-16 py-8 md:py-16 bg-white text-gray-900 relative">
        <p className="text-left text-base md:text-lg max-w-4xl mx-auto px-4">
           At jazar tech, we believe that diversity is our greatest strength. we celebrate our differences in backgrounds, experiences, and perspectives, knowing that they drive innovation and creativity. to build products and solutions that serve everyone, we are committed to including everyone. we treat all applicants fairly and equally and are dedicated to providing reasonable accommodations throughout the hiring process.
        </p>
        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute right-8 bottom-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all"
        >
          Go to Top
        </button>
      </div>

        {/* Include the Footer */}
        <Footer />  {/* Footer is now part of the BlogDisplay page */}

  </div>

  );
};

export default Career;


