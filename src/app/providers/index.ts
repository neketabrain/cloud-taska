import { withRouter } from './with-router';

function withProviders(component: React.ComponentType) {
  return withRouter(component);
}

export { withProviders };
