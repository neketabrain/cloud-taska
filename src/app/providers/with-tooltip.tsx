import { TooltipContainer } from 'shared/ui';

export function withTooltip(Component: React.ComponentType) {
  return () => (
    <>
      <TooltipContainer />
      <Component />
    </>
  );
}
