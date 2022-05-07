import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';

import { viewerApi } from 'shared/api';

import { setViewer } from './events';
import { $viewer } from './store';

export function useViewer() {
  return useStore($viewer);
}

export function useViewerAuthStatus() {
  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    viewerApi.checkAuthStatus((viewer) => {
      if (viewer) {
        setViewer(viewer);
      }

      setInitialized(true);
    });
  }, []);

  return isInitialized;
}
