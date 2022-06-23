import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { taskModel } from 'entities/task';
import { viewerModel } from 'entities/viewer';
import { Pages } from 'pages';
import { getLocale } from 'shared/lib';
import { Loader } from 'shared/ui';

import 'shared/lib/i18n';

import { Layout } from './layout';
import { withProviders } from './providers';

import './styles.scss';

const Main: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const isInitialized = viewerModel.useCheckViewerAuthStatus();
  const isViewerAuthorized = viewerModel.useViewerAuthorized();

  useEffect(() => {
    if (isViewerAuthorized) {
      taskModel.effects.getTasksFx().then(() => {
        setLoading(false);
      });
    }
  }, [isViewerAuthorized]);

  if (isLoading || !isInitialized) {
    return <Loader />;
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
