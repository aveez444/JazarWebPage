import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobForm from "./components/jobForm";
import Career from "./main/Career";
import BlogDisplay from "./main/blog";
import JobList from "./components/JobList";
import BlogList from "./components/BlogList";
import AdminJobManagement from "./components/jobmanage";
import BlogForm from "./components/BlogForm";
import Footer from "./components/footer";
import ContactPage from "./main/contactPage";
import FAQPage from "./main/FAQs";
import UpdateJob from "./components/UpdateJob";
import ApplyForm from "./components/ApplyForm";
import CustomerList from "./components/customerData";
import BlogManage from "./components/BlogManage";


const App = () => {
  return (
    <Router>
      

        {/* Page Content */}
        <div className="flex-1 p-6 bg-gray-100">
          <Routes>
          
            <Route path="/career"element={<Career/>} />
            <Route path="/blogs"element={<BlogDisplay/>} />
            <Route path="/inbox" element={<div>Inbox Content</div>} />
            <Route path="/calendar" element={<div>Calendar Content</div>} />
            <Route path="/jobs" element={<JobForm />} />
            <Route path="/candidates" element={<div>Candidates Content</div>} />
            <Route path="/employee" element={<div>Employee Content</div>} />
            
            <Route path="/report" element={<div>Report Content</div>} />  
            <Route path="/settings" element={<div>Settings Content</div>} />
            <Route path="/help" element={<div>Help Content</div>} />
            <Route path="/joblist" element={<JobList/>} />
            <Route path="/bloglist" element={<BlogList/>} />
            
            <Route path="/jobmanage" element={<AdminJobManagement/>} />
            <Route path="/blogstruc" element={<BlogForm/>} />
            <Route path="/footer" element={<Footer/>} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/faq" element={<FAQPage/>} />
            <Route path="/update-job/:jobId" element={<UpdateJob />} />
            <Route path="/apply/:Id" element={<ApplyForm/>} />
            <Route path="/contact-list" element={<CustomerList/>} />
            <Route path="/blog-manage" element={<BlogManage/>} />

            

          </Routes>
        </div>
      
    </Router>
  );
};

export default App;
