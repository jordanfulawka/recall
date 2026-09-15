import { NavLink, Outlet } from 'react-router';

function Dashboard() {
  return (
    <div>
      <div className='flex justify-between'>
        <div className='border flex gap-3'>
          <h1>recall</h1>
          <NavLink to='/dashboard/due'>due</NavLink>
          <NavLink to='/dashboard/all'>all</NavLink>
          <NavLink to='/dashboard/add'>add</NavLink>
        </div>
        <div className='border flex gap-3'>
          <h2>6 due</h2>
          <h2>8 tracked</h2>
          <h2>12d streak</h2>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
