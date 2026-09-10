import { useState } from 'react';
import { createContext } from 'vm';

const AuthContext = createContext();

function decodeToken(token: string) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return {
    id: payload.id,
    username: payload.username,
  };
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState('');

  function login(token: string) {}
  return <AuthContext.Provider></AuthContext.Provider>;
}
