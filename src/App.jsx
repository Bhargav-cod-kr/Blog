import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Validate user session on initial load and sync with Redux store
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData })); // Authenticated → persist session
        else dispatch(logout()); // No active session → clear state
      })
      .finally(() => setLoading(false)); // End initial loading phase
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet /> {/* Nested route content rendered here */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
