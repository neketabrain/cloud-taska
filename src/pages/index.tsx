import { Route, Routes, Navigate } from 'react-router-dom';

import { ROUTES } from 'shared/config';

import { HomePage } from './home';
import { PrivateRoute, GuestRoute } from './routes';
import { SignInPage } from './signIn';
import { TasksPage } from './tasks';

export const Pages: React.FC = () => {
  return (
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
  );
};
