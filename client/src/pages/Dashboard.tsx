import { useEffect, useState } from 'react';
import { NavLink, Outlet, useMatch, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthProvider';
import { getStats } from '../lib/api';

const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
  `text-lg transition ${
    isActive
      ? 'font-medium text-alabaster'
      : 'text-lavender hover:text-alabaster'
  }`;

const statStyles = 'text-sm text-lavender';

function Dashboard() {
  const match = useMatch('/');
  const navigate = useNavigate();
  const [trackedProblems, setTrackedProblems] = useState<number | null>(null);
  const [dueProblems, setDueProblems] = useState<number | null>(null);

  const { token, user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  useEffect(() => {
    if (match) navigate('/all');
  }, [match]);

  useEffect(() => {
    async function fetchStats() {
      try {
        if (!token) return;
        const { stats } = await getStats(token);
        setTrackedProblems(stats.tracked_problems);
        setDueProblems(stats.due_problems);
      } catch (err) {
        console.error(err);
      }
    }
    fetchStats();
  }, [token]);

  return (
    <div>
      <div className='flex items-center justify-between border-b border-dusk/40 px-4 py-3'>
        <div className='flex items-center gap-6'>
          <h1 className='text-xl font-semibold tracking-wide text-lavender'>
            recall
          </h1>
          <nav className='flex gap-4'>
            <NavLink to='/due' className={navLinkStyles}>
              due
            </NavLink>
            <NavLink to='/all' className={navLinkStyles}>
              all
            </NavLink>
            <NavLink to='/add' className={navLinkStyles}>
              add
            </NavLink>
          </nav>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex gap-4'>
            <span className={statStyles}>{dueProblems} due</span>
            <span className={statStyles}>{trackedProblems} tracked</span>
            {/* <span className={statStyles}>12d streak</span> */}
          </div>
          <div className='flex items-center gap-3 border-l border-dusk/40 pl-4'>
            {user && (
              <span className='text-sm font-medium text-alabaster'>
                {user.username}
              </span>
            )}
            <button
              onClick={handleLogout}
              className='rounded-md border border-dusk/40 px-2 py-1 text-sm text-lavender transition hover:border-dusk hover:text-alabaster'
            >
              logout
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
