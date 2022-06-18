import clsx from 'clsx';
import React, { useContext, Children } from 'react';
import { useTranslation } from 'react-i18next';

import { DotsIcon } from 'shared/assets/icons';
import { Dropdown, DropdownProps, Button, LinkButton } from 'shared/ui';

import styles from './styles.module.scss';

interface DropdownMenuProps extends Omit<DropdownProps, 'children'> {
  items: React.ReactNode[];
  children?: React.ReactNode;
  toggleElement?: React.ReactNode;
  buttonClassName?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> & {
  Item: typeof DropdownMenuItem;
  LinkItem: typeof DropdownMenuLinkItem;
} = (props) => {
  const { items, toggleElement, buttonClassName, children, contentClassName, ...rest } = props;

  const { t } = useTranslation('actions');

  return (
    <Dropdown
      contentClassName={clsx(styles.dropdownContent, contentClassName)}
      element={({ toggle }) => (
        <Button
          variant="transparent"
          onClick={toggle}
          className={clsx(styles.dropdownButton, buttonClassName)}
          aria-label={t('openMenu')}
        >
          {toggleElement || <DotsIcon />}
        </Button>
      )}
      {...rest}
    >
      {children}
      {Children.map(items, (item) => item)}
    </Dropdown>
  );
};

interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  danger?: boolean;
}

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = (props) => {
  const { children, danger, active, onClick, className, ...rest } = props;

  const { close } = useContext(Dropdown.context);

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (onClick) {
      onClick(event);
    }

    close();
  }

  return (
    <Button
      className={clsx(styles.dropdownMenuItem, className, {
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

interface DropdownMenuLinkItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  active?: boolean;
  danger?: boolean;
}

const DropdownMenuLinkItem: React.FC<DropdownMenuLinkItemProps> = (props) => {
  const { children, danger, active, className, ...rest } = props;

  const { close } = useContext(Dropdown.context);

  return (
    <LinkButton
      className={clsx(styles.dropdownMenuItem, className, {
        [styles.dropdownMenuItem_danger]: danger,
        [styles.dropdownMenuItem_active]: active,
      })}
      variant="transparent"
      onClick={close}
      {...rest}
    >
      {children}
    </LinkButton>
  );
};

DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.LinkItem = DropdownMenuLinkItem;
