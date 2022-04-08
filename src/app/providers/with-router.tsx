import { BrowserRouter } from 'react-router-dom';

export function withRouter(Component: React.ComponentType) {
  return () => (
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  );
}
