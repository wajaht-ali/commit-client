/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router-dom"
import EditorPage from "./components/pages/Commit/Commit.jsx";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/pages/Home.jsx"
import './App.css'

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/editor/:roomId" element={<EditorPage />} />
      </Routes>
    </>
  );
}

export default App
