import React, { useState, useEffect } from "react";
import axios from "axios";
import TopNav from "../Components/topnav";
import Footer from "../components/footer"; // Import the Footer component

const BlogDisplay = () => {
  const [blogs, setBlogs] = useState([]);
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
      <div className="bg-gradient-to-b from-gray-900 to-black text-center py-24 px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Welcome to Our Blog
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Stay updated with the latest insights, research, and trends in
          technology, development, and more.
        </p>
      </div>

      <div className="p-8 max-w-6xl mx-auto">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="group relative flex flex-col md:flex-row gap-8 border border-gray-800 rounded-lg p-6 mb-16 transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-2xl bg-gradient-to-b from-gray-900 to-black"
          >
            {/* Date on the Left */}
            <div className="w-full md:w-1/6 flex justify-start md:justify-center items-start">
              <p className="text-lg font-bold text-blue-400">
                {new Date(blog.date).toLocaleDateString()}
              </p>
            </div>

            {/* Blog Content */}
            <div className="w-full md:w-5/6">
              {/* Blog Title */}
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {blog.title}
              </h2>

              {/* Blog Image */}
              {blog.image && (
                <img
                  src={`http://127.0.0.1:8000${blog.image}`}
                  alt={blog.title}
                  className="rounded-lg shadow-lg object-cover w-full h-auto mb-6"
                />
              )}

              {/* Blog Description */}
              <p className="text-gray-400 text-xl leading-relaxed">
                {blog.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Include the Footer */}
      <Footer />  {/* Footer is now part of the BlogDisplay page */}

    </div>
  );
};

export default BlogDisplay;
