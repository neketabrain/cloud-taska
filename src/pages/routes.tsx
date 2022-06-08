import { Navigate } from 'react-router-dom';

import { viewerModel } from 'entities/viewer';
import { ROUTES } from 'shared/config';

interface RouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { children } = props;
  const viewer = viewerModel.useViewer();

  if (!viewer) {
    return <Navigate to={ROUTES.signIn} replace={true} />;
  }

  return <>{children}</>;
};

export const GuestRoute: React.FC<RouteProps> = (props) => {
  const { children } = props;
  const viewer = viewerModel.useViewer();

  if (viewer) {
    return <Navigate to={ROUTES.root} replace={true} />;
  }

  return <>{children}</>;
};
