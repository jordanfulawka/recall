import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../contexts/AuthProvider';

function ProtectedRoute() {
  const { token, loading } = useAuth();

  if (loading) return null;

  if (!token) return <Navigate to='/login' replace />;

  return <Outlet />;
}

export default ProtectedRoute;
