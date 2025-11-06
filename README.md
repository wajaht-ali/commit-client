# Commit - A Real-Time Collaborative Code Editor

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/wajaht-ali/commit-client?style=social)](https://github.com/wajaht-ali/commit-client)
[![Forks](https://img.shields.io/github/forks/wajaht-ali/commit-client?style=social)](https://github.com/wajaht-ali/commit-client)

### [**Live Website**](https://www.codecommit.site/) · [**Report a Bug**](https://github.com/wajaht-ali/commit-client/issues) · [**Request a Feature**](https://github.com/wajaht-ali/commit-client/issues)

## About The Project

**Commit** is a real-time, browser-based collaborative coding environment designed for seamless peer programming.

The name "Commit" is short for **Commitment**. It's built on the philosophy that when two developers enter a shared session, they are making a commitment to focus, collaborate, and solve the problem at hand together. It’s a tool designed to facilitate that dedicated partnership, removing friction and enabling breakthroughs.

This platform provides a shared workspace where developers can write, edit, and review code simultaneously, making it an ideal tool for pair programming, technical interviews, and collaborative learning.

---

## ✨ Key Features

- **🚀 Real-time Code Syncing:** Code updates are instantly reflected for all participants in the room, powered by Socket.IO.
- **👥 Multi-User Collaboration:** Invite your peer to a unique room and start coding together instantly.
- **🎨 Modern UI/UX:** A sleek, intuitive interface built with React and Tailwind CSS, featuring smooth animations powered by Framer Motion.
- **🔐 Secure Authentication:** Firebase-powered authentication for user management, including Google & GitHub providers.
- **💡 Simple & Frictionless:** No complex setup required. Just create a room, share the ID, and start coding.

---

## 🛠️ Tech Stack

This project is a full-stack application. This repository contains the **client-side** code.

### Frontend

| Technology           | Description                                                      |
| :------------------- | :--------------------------------------------------------------- |
| **React**            | A JavaScript library for building user interfaces.               |
| **React Router v6**  | For client-side routing and navigation.                          |
| **Tailwind CSS**     | A utility-first CSS framework for rapid UI development.          |
| **Framer Motion**    | A production-ready motion library for creating fluid animations. |
| **Socket.IO Client** | Enables real-time, bidirectional event-based communication.      |
| **Monaco Editor**    | An in-browser code editor.                                       |
| **Firebase**         | For user authentication (Email/Password, Google, GitHub).        |
| **Axios**            | For making HTTP requests to the backend server.                  |

### Backend

The server-side code for this project is located in a separate repository.

- **[commit-server](https://github.com/wajaht-ali/commit-server)**: Built with Node.js, Express, Socket.IO, and Mongoose.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/wajaht-ali/commit-client.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd commit-client
    ```
3.  **Install NPM packages:**
    ```bash
    npm install
    ```
4.  **Set up environment variables:**

    - Create a `.env` file in the root of the project.
    - Copy the contents of `.env.example` into your new `.env` file.
    - Fill in the required Firebase configuration values. You can get these from your Firebase project console.

    ```env
    # Firebase Configuration
    VITE_API_KEY="your_firebase_api_key"
    VITE_AUTH_DOMAIN="your_firebase_auth_domain"
    VITE_PROJECT_ID="your_firebase_project_id"
    VITE_STORAGE_BUCKET="your_firebase_storage_bucket"
    VITE_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
    VITE_APP_ID="your_firebase_app_id"

    # Backend Server URL
    VITE_API_URL="http://localhost:8080" # Or your deployed server URL
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

> **Note:** Remember to also set up and run the [**commit-server**](https://github.com/wajaht-ali/commit-server) for full application functionality.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Wajahat Ali**

- **GitHub:** [@wajaht-ali](https://github.com/wajaht-ali)
- **LinkedIn:** [Wajahat Ali](https://www.linkedin.com/in/wajhat-ali/)

**Hammad Ali**

- **GitHub:** [@hammad-swe](https://github.com/hammad-swe)
- **LinkedIn:** [Hammad Ali](https://www.linkedin.com/in/hammad-ali-ba2824211/)

---

## 🙏 Acknowledgements

- [MonacoEditor](https://codemirror.net/)
- [Socket.IO](https://socket.io/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
