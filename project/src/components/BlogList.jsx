import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogList = () => {
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
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl text-blue-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-gray-50">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Latest Blog Posts
      </h2>

      {/* Blog Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">
            No blog posts available at the moment.
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-blue-600">{blog.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{blog.content.substring(0, 150)}...</p>
              <div className="mt-4 flex justify-between items-center">
                {blog.image && <img src={blog.image} alt={blog.title} className="w-16 h-16 object-cover rounded-md" />}
                <span className="text-xs text-gray-400">{new Date(blog.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* "More coming ahead" message */}
      {blogs.length === 0 && (
        <div className="text-center mt-6 text-blue-600 font-semibold">
          More blog posts coming ahead! Stay tuned.
        </div>
      )}
    </div>
  );
};

export default BlogList;
