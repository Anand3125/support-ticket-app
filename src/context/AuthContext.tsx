// ===============================
// MOCK LOGIN INSTRUCTIONS
//
// Use the following credentials to log in:
//
// ADMIN:
//   Username: admin
//   Password: (anything)
//   Role: ADMIN (redirects to /admin)
//
// AGENT:
//   Username: agent
//   Password: (anything)
//   Role: AGENT (redirects to /)
//
// CUSTOMER:
//   Username: any other value (e.g., alice, bob, user1)
//   Password: (anything)
//   Role: CUSTOMER (redirects to /)
// ===============================

import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'CUSTOMER' | 'AGENT' | 'ADMIN';

interface AuthState {
  user: string | null;
  token: string | null;
  role: UserRole | null;
}

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulate API login
const mockLoginApi = async (username: string, password: string): Promise<{ token: string; role: UserRole; user: string }> => {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 500));
  // Assign role based on username for demo
  if (username === 'admin') return { token: 'mock-jwt-admin', role: 'ADMIN', user: 'admin' };
  if (username === 'agent') return { token: 'mock-jwt-agent', role: 'AGENT', user: 'agent' };
  return { token: 'mock-jwt-customer', role: 'CUSTOMER', user: username };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({ user: null, token: null, role: null });

  const login = async (username: string, password: string) => {
    const { token, role, user } = await mockLoginApi(username, password);
    setState({ user, token, role });
  };

  const logout = () => {
    setState({ user: null, token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}; 