import { viewerApi } from 'shared/api';
import { Button } from 'shared/ui';

const SignInPage: React.FC = () => {
  // TODO: feature
  function signIn() {
    viewerApi.signInWithGoogle();
  }

  return <Button onClick={signIn}>Войти через Google</Button>;
};

export default SignInPage;
