import { Route, Routes, Navigate } from 'react-router-dom';

import { ROUTES } from 'shared/config';

import { HomePage } from './home';

export const Pages: React.VFC = () => {
  return (
    <Routes>
      <Route path={ROUTES.root} element={<HomePage />} />
      <Route path="*" element={<Navigate to={ROUTES.root} />} />
    </Routes>
  );
};
