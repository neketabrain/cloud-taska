import { createEffect } from 'effector';

import { viewerApi } from 'shared/api';

export const signOutFx = createEffect(() => {
  return viewerApi.signOut();
});
