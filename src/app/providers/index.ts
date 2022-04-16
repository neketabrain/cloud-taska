import { withRouter } from './with-router';

export function withProviders(component: React.ComponentType) {
  return withRouter(component);
}
