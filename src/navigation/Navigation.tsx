import React, { FC, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { useLoginNavigate } from './useLoginNavigate';
import { SpinLoading } from './SpinLoading';
import { getWithSuspense } from './getWithSuspense';
import { PageSkeleton } from './PageSkeleton';

const getWithPageSuspense = getWithSuspense(<PageSkeleton />);
const getWithSpinSuspense = getWithSuspense(<SpinLoading />);

const homeScreen = getWithPageSuspense(lazy(() => import('../screens/Home')));
const profileScreen = getWithPageSuspense(lazy(() => import('../screens/ProfileScreen')));
const authScreen = getWithSpinSuspense(lazy(() => import('../screens/AuthScreen')));
const notFoundScreen = getWithSpinSuspense(lazy(() => import('../screens/NotFound')));

export const Navigation: FC = () => {
  useLoginNavigate();

  return (
    <Routes>
      <Route index element={homeScreen} />
      <Route path="auth/*" element={authScreen}>
        <Route path=":mode" element={authScreen} />
      </Route>
      <Route path="profile" element={<ProtectedRoute>{profileScreen}</ProtectedRoute>} />
      <Route path="*" element={notFoundScreen} />
    </Routes>
  );
};
