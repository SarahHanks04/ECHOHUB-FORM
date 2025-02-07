import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import HeroPage from "./pages/HeroPage";
import Navbar from "./components/HeroNavbar/Navbar";
import AdminComplaintView from "./views/Admin/AdminComplaintView";
import AdminFeedbackView from "./views/Admin/AdminFeedbackView";
import FeedbackUserView from "./views/Users/FeedbackUserView";
import ComplaintUserView from "./views/Users/ComplaintUserView";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<HeroPage />} />
        {/* User Routes */}
        <Route path="form/feedback/:formId" element={<FeedbackUserView />} />
        <Route path="form/complaint/:formId" element={<ComplaintUserView />} />
        <Route path="*" element={<PageNotFound />} />
        {/* Admin Routes */}
        {/* <Route path="/admin/feedback/:formId" element={<AdminFeedbackView />} /> */}
        {/* <Route
          path="/admin/complaint/:formId"
          element={<AdminComplaintView />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
