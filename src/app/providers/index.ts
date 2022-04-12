import { withRouter } from './with-router';
import { withTooltip } from './with-tooltip';

export function withProviders(component: React.ComponentType) {
  return withTooltip(withRouter(component));
}
