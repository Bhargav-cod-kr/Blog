import { StrictMode } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout, Login } from './components';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import AllPosts from './pages/AllPosts.jsx';
import AddPost from './pages/AddPost.jsx';
import EditPost from './pages/EditPost.jsx';
import Post from './pages/Post.jsx';

// ✅ App-wide route configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Root layout with header, footer, and <Outlet />
    children: [
      { path: '/', element: <Home /> },

      // Public routes
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },

      // Protected routes (require authentication)
      {
        path: '/all-posts',
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },

      // Public route for viewing a single post
      { path: '/post/:slug', element: <Post /> },
    ],
  },
]);

// ✅ Application entry point — Redux + Router integrated
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
