import { Navigate } from 'react-router-dom';

import { viewerModel } from 'entities/viewer';
import { ROUTES } from 'shared/config';

export const PrivateRoute: React.FC = (props) => {
  const { children } = props;
  const viewer = viewerModel.useViewer();

  if (!viewer) {
    return <Navigate to={ROUTES.signIn} replace={true} />;
  }

  return <>{children}</>;
};

export const GuestRoute: React.FC = (props) => {
  const { children } = props;
  const viewer = viewerModel.useViewer();

  if (viewer) {
    return <Navigate to={ROUTES.root} replace={true} />;
  }

  return <>{children}</>;
};
