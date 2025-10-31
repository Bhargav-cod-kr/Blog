# 🔐 React + Redux + Appwrite Authentication System

This project is a modern authentication system built using **React**, **Redux Toolkit**, and **Appwrite**.  
It handles user login, logout, and session management with persistent authentication.

---

## 🚀 Features

- User Authentication using **Appwrite**
- Global state management with **Redux Toolkit**
- Persistent session check on app load
- Conditional rendering for authenticated users
- Logout functionality with Redux state reset
- Responsive and clean UI with **TailwindCSS**
- Scalable architecture with modular file structure

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
git clone https://github.com/Bhargav-cod-kr/Blog
cd appwrite-auth-react

### 2️⃣ Install Dependencies
npm install

### 3️⃣ Setup Appwrite Project
1. Go to your Appwrite Console → Create a new **project**.  
2. Copy your **Project ID** and **API Endpoint**.  
3. Update them inside your Appwrite configuration file (`src/appwrite/auth.js`).

Example:
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('YOUR_PROJECT_ID')

### 4️⃣ Run the Application
npm run dev  
Then open **http://localhost:5173**

---

## 🧩 Folder Structure Overview

src/  
│  
├── appwrite/           → Appwrite service configurations  
├── store/              → Redux store and slices  
├── components/         → Reusable UI components  
├── pages/              → Page components (Login, Home, etc.)  
├── App.jsx             → Main app logic  
├── main.jsx            → React entry file  
└── index.css           → Tailwind and global styles  

## 🏗️ Project Structure

```
📦 src/
│
├── 📁 apppwrite/
│   ├── auth.js
│   ├── config.js
│
├── 📁 assets/
│   ├── react.svg
│
├── 📁 component/
│   ├── container/Container.jsx
│   ├── Footer/Footer.jsx
│   ├── 📁 Header/
│   │    ├── Header.jsx
│   │    ├── LogoutBtn.jsx
│   ├── post-form/PostForm.jsx
│   ├── AuthLayout.jsx
│   ├── Button.jsx
│   ├── index.js
│   ├── Input.jsx
│   ├── Login.jsx
│   ├── Logo.jsx
│   ├── PostCard.jsx
│   ├── RTE.jsx
│   ├── Select.jsx
│   ├── Signup.jsx
│
├── 📁 conf/
│   ├── conf.js
│
├── 📁 pages/
│   ├── AddPost.jsx
│   ├── AllPosts.jsx
│   ├── EditPost.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Post.jsx
│   ├── Signup.jsx
│
├── 📁 store/
│   ├── authSlice.js
│   ├── store.js
│
├── App.css
├── App.jsx
├── index.css
├── main.jsx
│
├── .env.sample
├── eslint.config.cjs
├── index.html
├── package.lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js

```

---

## 🧠 How It Works

- When the app loads, `App.jsx` checks user session via Appwrite’s `getCurrentUser()`.  
- If a session exists → user info is stored in Redux via `login()`.  
- If not → `logout()` clears the Redux state.  
- Logged-out users see “Login to read posts”; logged-in users see content dynamically.  
- The check happens automatically on refresh (persistent session).  

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **State Management:** Redux Toolkit
- **Backend-as-a-Service:** Appwrite
- **Styling:** TailwindCSS
- **Routing:** React Router

---

## 🧾 NPM Scripts

| Command | Description |
|----------|--------------|
| npm run dev | Start development server |
| npm run build | Create production build |
| npm run preview | Preview production build |

---

## 🤝 Contributing

1. Fork the repository  
2. Create your branch: `git checkout -b feature-name`  
3. Commit your changes: `git commit -m "Add feature"`  
4. Push to branch: `git push origin feature-name`  
5. Open a Pull Request  

---

## 👨‍💻 Author

**Bhargav Yadav**  
GitHub: [@Bhargav-cod-kr](https://github.com/Bhargav-cod-kr)

---

⭐ **If you found this project helpful, don’t forget to star the repo!**
