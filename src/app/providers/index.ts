import { withHelmet } from './with-helmet';
import { withRouter } from './with-router';

export function withProviders(component: React.ComponentType) {
  return withHelmet(withRouter(component));
}
