import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';

import { Viewer, viewerApi } from 'shared/api';

import { setViewer } from './events';
import { $viewer } from './store';

export function useViewer(): Viewer | undefined {
  return useStore($viewer).viewer;
}

export function useViewerAuthorized(): boolean {
  return useStore($viewer).isAuthorized;
}

export function useViewerAuthStatus(): boolean {
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
