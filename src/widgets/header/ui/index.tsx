import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';

import { viewerModel } from 'entities/viewer';
import { Auth } from 'features/auth';
import { Logo } from 'shared/ui';

import styles from './styles.module.scss';

interface HeaderLinkItem {
  url: string;
  label: string;
}

interface HeaderProps {
  logoLink: string;
  links?: HeaderLinkItem[];
}

export const Header: React.VFC<HeaderProps> = (props) => {
  const { logoLink, links } = props;
  const viewer = viewerModel.useViewer();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to={logoLink}>
          <Logo />
        </Link>

        {!!links?.length && (
          <ul className={styles.list} role="menu">
            {links.map((link) => (
              <li role="menuitem" key={link.url}>
                <NavLink to={link.url} className={({ isActive }) => clsx(styles.link, isActive && styles.link_active)}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {!!viewer && <Auth.SignOut />}
    </header>
  );
};
