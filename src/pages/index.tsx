import { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { ROUTES } from 'shared/config';

import { PrivateRoute, GuestRoute } from './routes';

const HomePage = lazy(() => import(/* webpackPrefetch: true */ './home'));
const SignInPage = lazy(() => import(/* webpackPrefetch: true */ './signIn'));
const TasksPage = lazy(() => import(/* webpackPrefetch: true */ './tasks'));

export const Pages: React.FC = () => {
  return (
    <Suspense>
      <Routes>
        <Route
          path={ROUTES.root}
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.tasks}
          element={
            <PrivateRoute>
              <TasksPage />
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.signIn}
          element={
            <GuestRoute>
              <SignInPage />
            </GuestRoute>
          }
        />

        <Route path="*" element={<Navigate to={ROUTES.root} />} />
      </Routes>
    </Suspense>
  );
};
