import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { CloseIcon, MenuIcon } from 'shared/assets/icons';
import { useClickOutside } from 'shared/lib';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';

interface MobileMenuItem {
  link: string;
  label: string;
}

interface MobileMenuProps {
  items: MobileMenuItem[];
  className?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = (props) => {
  const { items, className } = props;

  const { t } = useTranslation('actions');
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);

  function open() {
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  useClickOutside(ref, close);

  return (
    <div ref={ref}>
      <Button
        variant="transparent"
        aria-label={t('openMenu')}
        className={clsx(styles.button, className)}
        onClick={open}
      >
        <MenuIcon />
      </Button>

      <div className={clsx(styles.dropdown, isOpen && styles.dropdown_open)}>
        <Button variant="transparent" aria-label={t('closeMenu')} className={styles.dropdownButton} onClick={close}>
          <CloseIcon />
        </Button>

        <nav className={styles.nav}>
          <ul role="menu">
            {items.map((item) => (
              <li role="menuitem" key={item.link} className={styles.navItem}>
                <Link to={item.link} onClick={close} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
