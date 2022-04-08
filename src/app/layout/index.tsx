import { ROUTES } from 'shared/config';
import { Header } from 'widgets/header';

import styles from './layout.module.scss';

export const Layout: React.FC = (props) => {
  const { children } = props;

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <Header logoLink={ROUTES.root} />

        <main>{children}</main>
      </div>
    </div>
  );
};
