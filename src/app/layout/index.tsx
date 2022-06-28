import { useTranslation } from 'react-i18next';

import { ROUTES } from 'shared/config';
import { Header } from 'widgets/header';

import styles from './layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props;
  const { t } = useTranslation('nav');

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <Header
          logoLink={ROUTES.root}
          settingsLink={ROUTES.settings}
          links={[
            { label: t('home'), link: ROUTES.root },
            { label: t('allTasks'), link: ROUTES.tasks },
            { label: t('activity'), link: ROUTES.activity },
          ]}
        />

        <main>{children}</main>
      </div>
    </div>
  );
};
