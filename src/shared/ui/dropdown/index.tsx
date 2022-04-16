import clsx from 'clsx';
import { useState } from 'react';

import { ArrowIcon } from 'shared/assets/icons';
import { useClickOutside } from 'shared/lib';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';

interface DropdownElementArgs {
  open: VoidFunction;
  close: VoidFunction;
  toggle: VoidFunction;
}

interface DropdownProps {
  element?: (args: DropdownElementArgs) => React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const { element, children, className, contentClassName } = props;

  const [isOpen, setOpen] = useState(false);

  function openDropdown() {
    setOpen(true);
  }

  function closeDropdown() {
    setOpen(false);
  }

  function toggleDropdown() {
    setOpen((prev) => !prev);
  }

  const ref = useClickOutside<HTMLDivElement>(closeDropdown);

  return (
    <div className={clsx(styles.container, className)} ref={ref}>
      {element && element({ open: openDropdown, close: closeDropdown, toggle: toggleDropdown })}

      {!element && (
        <Button onClick={toggleDropdown} className={styles.button}>
          <ArrowIcon />
        </Button>
      )}

      {isOpen && <div className={clsx(styles.dropdown, contentClassName)}>{children}</div>}
    </div>
  );
};
