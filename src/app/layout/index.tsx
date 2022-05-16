import { useTranslation } from 'react-i18next';

import { ROUTES } from 'shared/config';
import { Header } from 'widgets/header';

import styles from './layout.module.scss';

export const Layout: React.FC = (props) => {
  const { children } = props;
  const { t } = useTranslation('nav');

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <Header
          logoLink={ROUTES.root}
          links={[
            { label: t('home'), url: ROUTES.root },
            { label: t('allTasks'), url: ROUTES.tasks },
          ]}
        />

        <main>{children}</main>
      </div>
    </div>
  );
};
