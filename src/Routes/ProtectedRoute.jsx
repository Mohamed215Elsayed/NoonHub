import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../Hook/auth/protected-route-hook';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  const { loading } = useSelector((state) => state.auth);

  if (loading) return null;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  // التأكد من مطابقة الدور الفعلي (admin أو user)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
