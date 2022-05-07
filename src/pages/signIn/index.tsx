import { viewerApi } from 'shared/api';
import { Button } from 'shared/ui';

export const SignInPage: React.VFC = () => {
  // TODO: feature
  function signIn() {
    viewerApi.signInWithGoogle();
  }

  return <Button onClick={signIn}>Войти через Google</Button>;
};
