import React, { useState, useEffect } from "react";
import axios from "axios";
import TopNav from "../components/Topnav";
import Footer from "../components/footer"; // Import the Footer component

const BlogDisplay = () => {
  const [blogs, setBlogs] = useState([]);
  const [expandedBlogs, setExpandedBlogs] = useState({}); // Track expanded blogs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/list-blogs/");
        setBlogs(response.data);
      } catch (err) {
        setError("Error fetching blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Toggle blog expansion
  const toggleExpand = (index) => {
    setExpandedBlogs((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the specific blog's expanded state
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <div className="text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <div className="text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <TopNav />
      
      {/* Page Header */}
      <div className="bg-gradient-to-b from-gray-900 to-black text-center py-24 px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Welcome to Our Blog
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Stay updated with the latest insights, research, and trends in
          technology, development, and more.
        </p>
      </div>

      {/* Blog List */}
      <div className="p-6 sm:p-8 max-w-6xl mx-auto">
        {blogs.map((blog, index) => {
          const isExpanded = expandedBlogs[index]; // Check if blog is expanded
          const isLongText = blog.content.split(" ").length > 100; // Check if text is long

          return (
            <div
              key={index}
              className="group relative flex flex-col md:flex-row gap-6 border border-gray-800 rounded-lg p-6 mb-12 transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-xl bg-gradient-to-b from-gray-900 to-black"
            >
              {/* Blog Image (Mobile First Approach) */}
              {blog.image && (
                <div className="w-full md:w-1/3">
                  <img
                    src={`http://127.0.0.1:8000${blog.image}`}
                    alt={blog.title}
                    className="rounded-lg shadow-lg object-cover w-full max-h-[250px] sm:max-h-[300px] md:max-h-[350px] mb-4 md:mb-0"
                  />
                </div>
              )}

              {/* Blog Content */}
              <div className="w-full md:w-2/3">
                {/* Blog Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                  {blog.title}
                </h2>

                {/* Blog Date */}
                <p className="text-sm text-blue-400 text-left">
                  {new Date(blog.date).toLocaleDateString()}
                </p>

                {/* Blog Description */}
                <p
                  className={`text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed transition-all duration-300 ${
                    isExpanded ? "line-clamp-none" : "line-clamp-10"
                  }`}
                >
                  {blog.content}
                </p>

                {/* Read More Link (Only Shows if Text is Long) */}
                {isLongText && (
                  <button
                    onClick={() => toggleExpand(index)}
                    className="mt-2 text-blue-400 hover:underline text-sm md:text-base"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Footer /> {/* Footer */}
    </div>
  );
};

export default BlogDisplay;
