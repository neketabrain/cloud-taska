import { createStore } from 'effector';

import { Viewer } from 'shared/api';

import { signOutFx } from './effects';
import { setViewer, resetViewer } from './events';

export const $viewer = createStore<Viewer | null>(null)
  .on(setViewer, (_, viewer) => viewer)
  .on(signOutFx.done, () => null)
  .reset(resetViewer);
