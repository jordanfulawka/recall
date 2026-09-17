import { NavLink, Outlet } from 'react-router';

const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition ${
    isActive
      ? 'font-medium text-neutral-900'
      : 'text-neutral-500 hover:text-neutral-900'
  }`;

const statStyles = 'text-sm text-neutral-500';

function Dashboard() {
  return (
    <div>
      <div className='flex items-center justify-between border-b border-neutral-200 px-4 py-3'>
        <div className='flex items-center gap-6'>
          <h1 className='text-sm font-semibold tracking-wide text-neutral-900'>
            recall
          </h1>
          <nav className='flex gap-4'>
            <NavLink to='/dashboard/due' className={navLinkStyles}>
              due
            </NavLink>
            <NavLink to='/dashboard/all' className={navLinkStyles}>
              all
            </NavLink>
            <NavLink to='/dashboard/add' className={navLinkStyles}>
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
