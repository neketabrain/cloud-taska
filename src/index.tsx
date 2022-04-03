import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

reportWebVitals();
