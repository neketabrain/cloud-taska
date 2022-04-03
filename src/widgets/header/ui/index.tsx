import { Link } from 'react-router-dom';

import { Logo } from 'shared/ui';

import styles from './styles.module.scss';

interface HeaderProps {
  logoLink: string;
}

const Header: React.VFC<HeaderProps> = (props) => {
  const { logoLink } = props;

  return (
    <header className={styles.header}>
      <Link to={logoLink}>
        <Logo />
      </Link>
    </header>
  );
};

export { Header };
