/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router-dom"
import './App.css'
import PageNotFound from "./components/pages/PageNotFound.jsx";
import Home from "./components/pages/Home.jsx";
import Profile from './components/Profile/Profile.jsx';
import Login from './components/pages/Login.jsx';
import SignUp from './components/pages/SignUp.jsx';
import EditorPage from "./components/pages/Commit/Commit.jsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/editor/:roomId" element={<EditorPage />} />

        <Route path="/editor" element={<Home />} />

        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  )
}

export default App
