import { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.username === username && u.password === password);
    
    if (user) {
      setUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const register = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some((u: User) => u.username === username)) {
      return false;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      username,
      password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}