import { Route, Routes, Navigate } from 'react-router-dom';

import { ROUTES } from 'shared/config';

import { HomePage } from './home';

const Pages: React.VFC = () => {
  return (
    <Routes>
      <Route path={ROUTES.root} element={<HomePage />} />
      <Route path="*" element={<Navigate to={ROUTES.root} />} />
    </Routes>
  );
};

export { Pages };
