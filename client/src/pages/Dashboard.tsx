import { NavLink, Outlet } from 'react-router';

const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
  `text-lg transition ${
    isActive
      ? 'font-medium text-alabaster'
      : 'text-lavender hover:text-alabaster'
  }`;

const statStyles = 'text-sm text-lavender';

function Dashboard() {
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
        <div className='flex gap-4'>
          <span className={statStyles}>6 due</span>
          <span className={statStyles}>8 tracked</span>
          <span className={statStyles}>12d streak</span>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
