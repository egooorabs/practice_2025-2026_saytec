import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { ROUTES } from '../shared/constants/routes';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return children;
};