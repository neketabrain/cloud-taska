import { BrowserRouter } from 'react-router-dom';

function withRouter(Component: React.ComponentType) {
  return () => (
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  );
}

export { withRouter };
