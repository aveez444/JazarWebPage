import React, { useState } from "react";
import Sidebar from "./sidebar";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("date", date);

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/create-blog/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        setMessage("Blog posted successfully!");
        setTitle("");
        setContent("");
        setImage(null);
        setDate("");
      } else {
        setMessage("Failed to post blog. Please try again.");
      }
    } catch (error) {
      console.error("Error posting blog:", error);
      setMessage("Error connecting to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-4xl mx-auto mb-12">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">Create Blog Post</h2>

          {/* Message Alert */}
          {message && (
            <div
              className={`p-4 mb-4 rounded ${
                message.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          {/* Blog Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <button
                type="submit"
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 mt-4 sm:mt-0"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Blog"}
              </button>
            </div>

            {/* Blog Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Blog Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Blog Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Blog Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Blog Content (Description) */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2">Blog Description</label>
              <div className="quill-container" style={{ minHeight: "300px" }}>
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  placeholder="Write your blog content here..."
                  theme="snow"
                  style={{ height: "250px" }}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'link'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['clean']
                    ]
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;