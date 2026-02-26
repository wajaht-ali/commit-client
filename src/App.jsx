/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router-dom"
import EditorPage from "./components/pages/Commit/Commit.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/Login.jsx";
import Signup from "./components/pages/Signup.jsx";
import Profile from "./components/Profile/Profile.jsx";
import ProfileInfo from "./components/Profile/ProfileInfo.jsx";
import Dashboard from "./components/Profile/Dashboard.jsx";
import Organization from "./components/Profile/Organization.jsx";
import ResetPassword from "./components/pages/ResetPassword.jsx";
import AboutUs from "./components/pages/About.jsx";
import NotFoundPage from "./components/Layout/NotFound.jsx";
import FeaturesPage from "./components/pages/Features.jsx";
import ContactUsPage from "./components/pages/Contact.jsx";
import './App.css';
import BugReportIcon from './components/ui/BugReportIcon.jsx';
import BugReport from './components/pages/BugReport.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
        </Route>
        <Route path="/profile" element={<Profile />}>
          <Route index element={<ProfileInfo />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="organization" element={<Organization />} />
        </Route>
        <Route path="/editor/:roomId" element={<EditorPage />} />
        <Route path="/report-bug" element={<BugReport />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
      <BugReportIcon />
    </>
  );
}

export default App
