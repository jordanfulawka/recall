import { useState } from 'react';
import { login as apiLogin } from '../lib/api';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { login } = useAuth();

  async function handleLogin(e: React.FormEvent) {
    setLoading(true);
    e.preventDefault();
    try {
      const { token } = await apiLogin(username, password);
      login(token);
      navigate('/dashboard');
    } catch (err) {
      setError('Could not log you in');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>submit</button>
      </form>
      {error != null && <p>{error}</p>}
    </div>
  );
}

export default Login;
