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
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <form
        onSubmit={handleLogin}
        className='w-full max-w-sm space-y-4 rounded-lg border border-gray-200 bg-white p-8 shadow-sm'
      >
        <h1 className='text-xl font-semibold text-gray-900'>Log in</h1>

        <div className='space-y-1'>
          <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
            Username
          </label>
          <input
            id='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none'
          />
        </div>

        <div className='space-y-1'>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none'
          />
        </div>

        {error != null && <p className='text-sm text-red-600'>{error}</p>}

        <button
          type='submit'
          disabled={loading}
          className='w-full rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50'
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </div>
  );
}

export default Login;
