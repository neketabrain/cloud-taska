import { Route, Routes, Navigate } from 'react-router-dom';

import { ROUTES } from 'shared/config';

const Pages: React.VFC = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={ROUTES.root} />} />
    </Routes>
  );
};

export { Pages };
