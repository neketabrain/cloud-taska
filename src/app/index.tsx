import { Helmet } from 'react-helmet-async';

import { viewerModel } from 'entities/viewer';
import { Pages } from 'pages';
import { getLocale } from 'shared/lib';

import 'shared/lib/i18n';

import { Layout } from './layout';
import { withProviders } from './providers';

import './styles.scss';

const Main: React.VFC = () => {
  const isInitialized = viewerModel.useViewerAuthStatus();

  if (!isInitialized) {
    // TODO: loader
    return null;
  }

  return (
    <>
      <Helmet>
        <html lang={getLocale()} />
      </Helmet>

      <Layout>
        <Pages />
      </Layout>
    </>
  );
};

export const App = withProviders(Main);
