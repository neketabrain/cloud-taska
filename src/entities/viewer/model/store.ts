import { createStore } from 'effector';

import { Viewer } from 'shared/api';

import { signOutFx } from './effects';
import { setViewer, resetViewer } from './events';

interface ViewerStore {
  isAuthorized: boolean;
  viewer?: Viewer;
}

const initialState: ViewerStore = {
  isAuthorized: false,
};

export const $viewer = createStore<ViewerStore>(initialState)
  .on(setViewer, (_, viewer) => ({ isAuthorized: true, viewer }))
  .on(signOutFx.doneData, () => initialState)
  .reset(resetViewer);
