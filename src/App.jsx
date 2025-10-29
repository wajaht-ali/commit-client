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

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />
      </Routes>
    </>
  );
}

export default App
