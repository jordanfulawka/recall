import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../lib/types';

interface AuthContextProps {
  token: string | null;
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

function decodeToken(token: string) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.id,
      username: payload.username,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.get('token');
    if (stored) {
      setToken(stored);
      setUser(decodeToken(stored));
    }
    setLoading(false);
  }, []);

  function login(token: string) {
    localStorage.setItem('token', token);
    setToken(token);
    setUser(decodeToken(token));
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{ token, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth can only be used within AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
