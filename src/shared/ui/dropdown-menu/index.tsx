import clsx from 'clsx';
import React, { useContext, Children } from 'react';
import { useTranslation } from 'react-i18next';

import { DotsIcon } from 'shared/assets/icons';
import { Dropdown, DropdownProps, Button } from 'shared/ui';

import styles from './styles.module.scss';

interface DropdownMenuProps extends DropdownProps {
  items: React.ReactNode[];
  buttonClassName?: string;
}

export const DropdownMenu: React.VFC<DropdownMenuProps> & { Item: typeof DropdownMenuItem } = (props) => {
  const { items, buttonClassName, ...rest } = props;

  const { t } = useTranslation('actions');

  return (
    <Dropdown
      contentClassName={styles.dropdownContent}
      element={({ toggle }) => (
        <Button
          variant="transparent"
          onClick={toggle}
          className={clsx(styles.dropdownButton, buttonClassName)}
          aria-label={t('openMenu')}
        >
          <DotsIcon />
        </Button>
      )}
      {...rest}
    >
      {Children.map(items, (item) => item)}
    </Dropdown>
  );
};

interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  danger?: boolean;
}

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = (props) => {
  const { children, danger, active, onClick, ...rest } = props;

  const { close } = useContext(Dropdown.context);

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (onClick) {
      onClick(event);
    }

    close();
  }

  return (
    <Button
      className={clsx(styles.dropdownMenuItem, {
        [styles.dropdownMenuItem_danger]: danger,
        [styles.dropdownMenuItem_active]: active,
      })}
      variant="transparent"
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Button>
  );
};

DropdownMenu.Item = DropdownMenuItem;
