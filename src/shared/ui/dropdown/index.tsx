import clsx from 'clsx';
import { createContext, useState } from 'react';

import { ArrowIcon } from 'shared/assets/icons';
import { useClickOutside } from 'shared/lib';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';

interface DropdownActions {
  open: VoidFunction;
  close: VoidFunction;
  toggle: VoidFunction;
}

interface DropdownProps {
  element?: (actions: DropdownActions) => React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const DropdownContext = createContext<DropdownActions>({ open: () => {}, close: () => {}, toggle: () => {} });

export const Dropdown: React.FC<DropdownProps> & { context: typeof DropdownContext } = (props) => {
  const { element, children, className, contentClassName } = props;

  const [isOpen, setOpen] = useState(false);

  function open() {
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  function toggle() {
    setOpen((prev) => !prev);
  }

  const ref = useClickOutside<HTMLDivElement>(close);
  const actions: DropdownActions = { open, close, toggle };

  return (
    <DropdownContext.Provider value={actions}>
      <div className={clsx(styles.container, className)} ref={ref}>
        {element && element(actions)}

        {!element && (
          <Button onClick={toggle} className={styles.button}>
            <ArrowIcon />
          </Button>
        )}

        {isOpen && <div className={clsx(styles.dropdown, contentClassName)}>{children}</div>}
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.context = DropdownContext;
