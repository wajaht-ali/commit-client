/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import PageNotFound from "./components/pages/PageNotFound.jsx";
import Home from "./components/pages/Home.jsx";
import './App.css'
import Profile from './components/Profile/Profile';
import Login from './components/pages/login.jsx';
import SignUp from './components/pages/SignUp.jsx';
import Commit from './components/pages/Commit/Commit.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Not Found */}
        <Route path="*" element={<PageNotFound />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/commit" element={<Commit />} />
      </Routes>
    </>
  )
}

export default App
