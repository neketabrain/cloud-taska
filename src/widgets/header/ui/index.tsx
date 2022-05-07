import { Link } from 'react-router-dom';

import { viewerModel } from 'entities/viewer';
import { Auth } from 'features/auth';
import { Logo } from 'shared/ui';

import styles from './styles.module.scss';

interface HeaderProps {
  logoLink: string;
}

export const Header: React.VFC<HeaderProps> = (props) => {
  const { logoLink } = props;
  const viewer = viewerModel.useViewer();

  return (
    <header className={styles.header}>
      <Link to={logoLink}>
        <Logo />
      </Link>

      {!!viewer && <Auth.SignOut />}
    </header>
  );
};
