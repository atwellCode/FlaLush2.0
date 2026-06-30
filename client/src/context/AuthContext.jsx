// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// ─── Provider Component ──────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(true);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount (e.g., from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('flulush_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('flulush_user');
      }
    }
    setLoading(false);
  }, []);

  // ─── Login ──────────────────────────────────────────────────
  const login = (userData) => {
    const userObj = {
      id: userData.id || Date.now(),
      name: userData.name || 'User',
      email: userData.email,
      avatar: userData.avatar || null,
      joined: new Date().toISOString(),
    };
    setUser(userObj);
    localStorage.setItem('flulush_user', JSON.stringify(userObj));
    return userObj;
  };

  // ─── Logout ─────────────────────────────────────────────────
  const logout = () => {
    setUser(null);
    localStorage.removeItem('flulush_user');
  };

  // ─── Update User ────────────────────────────────────────────
  const updateUser = (updatedData) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem('flulush_user', JSON.stringify(updatedUser));
      return updatedUser;
    }
    return null;
  };

  // ─── Check if user is authenticated ────────────────────────
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ─── Custom Hook ─────────────────────────────────────────────
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;