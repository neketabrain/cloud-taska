import { createEvent } from 'effector';

import { Viewer } from 'shared/api';

export const setViewer = createEvent<Viewer>();
export const resetViewer = createEvent();
