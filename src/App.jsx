/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router-dom"
import EditorPage from "./components/pages/Commit/Commit.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/Login.jsx";
import Signup from "./components/pages/Signup.jsx";
import Profile from "./components/Profile/Profile.jsx";
import ResetPassword from "./components/pages/ResetPassword.jsx";
import './App.css';
import AboutUs from "./components/pages/About.jsx";
import NotFoundPage from "./components/Layout/NotFound.jsx";
import FeaturesPage from "./components/pages/Features.jsx";
import ContactUsPage from "./components/pages/Contact.jsx";

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
        <Route path="/profile" element={<Profile />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App
