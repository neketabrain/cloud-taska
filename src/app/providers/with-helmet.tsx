import { HelmetProvider } from 'react-helmet-async';

export function withHelmet(Component: React.ComponentType) {
  return () => (
    <HelmetProvider>
      <Component />
    </HelmetProvider>
  );
}
