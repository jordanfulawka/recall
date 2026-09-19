import { useState } from 'react';
import { login as apiLogin, register as apiRegister } from '../lib/api';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router';

function Login() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { login } = useAuth();

  const isLogin = mode === 'login';

  function toggleMode() {
    setMode(isLogin ? 'register' : 'login');
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    setLoading(true);
    e.preventDefault();
    try {
      const { token } = isLogin
        ? await apiLogin(username, password)
        : await apiRegister(username, password);
      login(token);
      navigate('/all');
    } catch (err) {
      setError(
        isLogin ? 'Could not log you in' : 'Could not create your account',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-ink'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-sm space-y-4 rounded-lg border border-dusk/40 bg-prussian p-8 shadow-sm'
      >
        <h1 className='text-xl font-semibold text-alabaster'>
          {isLogin ? 'Log in' : 'Create an account'}
        </h1>

        <div className='space-y-1'>
          <label
            htmlFor='username'
            className='block text-sm font-medium text-lavender'
          >
            Username
          </label>
          <input
            id='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full rounded-md border border-dusk bg-ink px-3 py-2 text-sm text-alabaster outline-none focus:border-lavender'
          />
        </div>

        <div className='space-y-1'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-lavender'
          >
            Password
          </label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full rounded-md border border-dusk bg-ink px-3 py-2 text-sm text-alabaster outline-none focus:border-lavender'
          />
        </div>

        {error != null && <p className='text-sm text-red-400'>{error}</p>}

        <button
          type='submit'
          disabled={loading}
          className='w-full rounded-md bg-alabaster px-3 py-2 text-sm font-medium text-ink transition hover:bg-lavender disabled:opacity-50'
        >
          {loading
            ? isLogin
              ? 'Logging in...'
              : 'Creating account...'
            : isLogin
              ? 'Log in'
              : 'Create account'}
        </button>

        <p className='text-center text-sm text-lavender'>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type='button'
            onClick={toggleMode}
            className='font-medium text-alabaster underline-offset-2 hover:underline'
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
