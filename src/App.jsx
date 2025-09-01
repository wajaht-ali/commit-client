/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import PageNotFound from "./components/pages/PageNotFound.jsx";
import Home from "./components/pages/Home.jsx";
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
