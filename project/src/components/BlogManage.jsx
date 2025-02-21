import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar"; // Import Sidebar component

const BlogManage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", image: null });
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Handle Delete Blog
  const handleDelete = async (blogId) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://127.0.0.1:8000/delete-blog/${blogId}/`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      setBlogs(blogs.filter((blog) => blog.id !== blogId));
      alert("Blog deleted successfully!");
    } catch (err) {
      alert("Failed to delete the blog. Please try again.");
    }
  };

  // Handle Edit Blog (Set Data to Form)
  const handleEdit = (blog) => {
    setEditingBlog(blog.id);
    setFormData({
      title: blog.title,
      content: blog.content,
      image: null, // Keep the existing image unless a new one is uploaded
    });
    setIsModalOpen(true);
  };

  // Handle Form Change
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle Update Blog
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      await axios.put(`http://127.0.0.1:8000/update-blog/${editingBlog}/`, formDataToSend, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Blog updated successfully!");
      window.location.reload();
    } catch (err) {
      alert("Failed to update the blog. Please try again.");
    }
  };

  // Loading and error states
  const renderContent = () => {
    if (loading) {
      return <div className="text-center text-gray-600">Loading...</div>;
    }

    if (error) {
      return <div className="text-center text-red-500">{error}</div>;
    }

    return (
      <>
        <h1 className="text-4xl font-bold text-center mb-8">Manage Blogs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white p-6 rounded-lg shadow-lg">
              <img src={`http://127.0.0.1:8000${blog.image}`} alt={blog.title} className="w-full h-48 object-cover mb-4 rounded" />
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {renderContent()}

        {/* Edit Blog Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-700 hover:text-black"
              >
                X
              </button>
              <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder="Title" />
              <textarea name="content" value={formData.content} onChange={handleChange} className="w-full p-2 border rounded mb-4 min-h-32" placeholder="Content"></textarea>
              <input type="file" name="image" onChange={handleChange} className="w-full p-2 border rounded mb-4" />
              <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Update Blog</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManage;