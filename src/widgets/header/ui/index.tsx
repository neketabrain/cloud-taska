import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

import { ViewerMiniProfile, viewerModel } from 'entities/viewer';
import { Auth } from 'features/auth';
import { SettingsIcon } from 'shared/assets/icons';
import { DropdownMenu, Logo } from 'shared/ui';

import styles from './styles.module.scss';

interface HeaderLinkItem {
  url: string;
  label: string;
}

interface HeaderProps {
  logoLink: string;
  settingsLink: string;
  links?: HeaderLinkItem[];
}

export const Header: React.FC<HeaderProps> = (props) => {
  const { logoLink, settingsLink, links } = props;
  const viewer = viewerModel.useViewer();

  const { t } = useTranslation('common');

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to={logoLink}>
          <Logo />
        </Link>

        {!!viewer && !!links?.length && (
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

      {!!viewer && (
        <ViewerMiniProfile
          viewer={viewer}
          actions={[
            <DropdownMenu.LinkItem to={settingsLink}>
              <SettingsIcon />
              {t('settings')}
            </DropdownMenu.LinkItem>,
            <Auth.SignOut />,
          ]}
        />
      )}
    </header>
  );
};
