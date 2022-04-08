import { Pages } from 'pages';

import { Layout } from './layout';
import { withProviders } from './providers';
import './styles.scss';

const Main: React.VFC = () => {
  return (
    <Layout>
      <Pages />
    </Layout>
  );
};

export const App = withProviders(Main);
