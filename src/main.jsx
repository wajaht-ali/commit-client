import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { SocketProvider } from './context/SocketContext.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
      <Router>
        <App />
      </Router>
    </SocketProvider>
    <Toaster />
  </StrictMode>,
)
