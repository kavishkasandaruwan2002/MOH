import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('moh_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('moh_jwt_token') || null);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    try {
      localStorage.setItem('moh_user', JSON.stringify(userData));
      localStorage.setItem('moh_jwt_token', jwtToken);
    } catch (e) {
      console.warn("Could not save auth state to localStorage:", e);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('moh_user');
    localStorage.removeItem('moh_jwt_token');
  };

  const switchRole = (newRole) => {
    let mockUser = null;
    switch (newRole) {
      case 'ADMIN':
        mockUser = {
          id: 'usr-admin',
          name: 'Admin Officer',
          email: 'admin@moh.gov.lk',
          role: 'ADMIN',
          nic: '198012345678',
          phone: '+94 11 269 0000',
          division: 'Colombo Central'
        };
        break;
      case 'STAFF':
        mockUser = {
          id: 'usr-doctor',
          name: 'Dr. K. L. Perera',
          email: 'doctor@moh.gov.lk',
          role: 'STAFF',
          nic: '197899887766',
          phone: '+94 77 123 4567',
          division: 'Colombo Central'
        };
        break;
      case 'PHI':
        mockUser = {
          id: 'usr-phi',
          name: 'PHI - Nimal Bandara',
          email: 'phi@moh.gov.lk',
          role: 'PHI',
          nic: '198544332211',
          phone: '+94 71 888 9900',
          division: 'Colombo Central'
        };
        break;
      case 'CITIZEN':
        mockUser = {
          id: 'usr-citizen',
          name: 'Sunethra Ranasinghe',
          email: 'citizen@example.com',
          role: 'CITIZEN',
          nic: '199056781234',
          phone: '+94 77 999 8877',
          division: 'Colombo Central'
        };
        break;
      default:
        mockUser = null;
        break;
    }
    if (mockUser) {
      login(mockUser, 'demo-jwt-token');
    } else {
      logout();
    }
  };

  const updateProfile = (updatedData) => {
    setUser(prevUser => {
      const newUserData = { ...prevUser, ...updatedData };
      try {
        localStorage.setItem('moh_user', JSON.stringify(newUserData));
      } catch (e) {
        console.warn("Could not save updated profile to localStorage:", e);
      }
      return newUserData;
    });

    if (user && (user.id || user._id)) {
      const userId = user.id || user._id;
      fetch(`/api/auth/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      }).catch(() => {});
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, switchRole, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

