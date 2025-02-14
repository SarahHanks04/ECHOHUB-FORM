import React from "react";
import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import HeroPage from "./pages/HeroPage";
import Navbar from "./components/HeroNavbar/Navbar";
import ComplaintUserView from "./views/Users/ComplaintUserView";
import EventFeedbackUserView from "./views/Users/EventFeedbackUserView";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/feedback" />} />
        <Route path="/feedback" element={<HeroPage />} />
        {/* User Routes */}
        <Route path="form/complaint/:formId" element={<ComplaintUserView />} />
        <Route path="form/event/:formId" element={<EventFeedbackUserView />} />
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
