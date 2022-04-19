import clsx from 'clsx';
import React, { useContext, Children } from 'react';

import { DotsIcon } from 'shared/assets/icons';
import { Dropdown, Button } from 'shared/ui';

import styles from './styles.module.scss';

interface DropdownMenuProps {
  items: React.ReactNode[];
  className?: string;
}

export const DropdownMenu: React.VFC<DropdownMenuProps> & { Item: typeof DropdownMenuItem } = (props) => {
  const { items, className } = props;

  return (
    <Dropdown
      className={className}
      contentClassName={styles.dropdownContent}
      element={({ toggle }) => (
        <Button variant="transparent" onClick={toggle} className={styles.dropdownButton} aria-label="Открыть меню">
          <DotsIcon />
        </Button>
      )}
    >
      {Children.map(items, (item) => item)}
    </Dropdown>
  );
};

interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  danger?: boolean;
}

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = (props) => {
  const { children, danger, onClick, ...rest } = props;
  const { close } = useContext(Dropdown.context);

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (onClick) {
      onClick(event);
    }

    close();
  }

  return (
    <Button
      className={clsx(styles.dropdownMenuItem, danger && styles.dropdownMenuItem_danger)}
      variant="transparent"
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Button>
  );
};

DropdownMenu.Item = DropdownMenuItem;
