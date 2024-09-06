import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const UnauthenticatedRoute: React.FC = () => {
  const { user } = useUser();

  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default UnauthenticatedRoute;
