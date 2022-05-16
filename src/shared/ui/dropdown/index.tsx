import clsx from 'clsx';
import { createContext, CSSProperties, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ArrowIcon } from 'shared/assets/icons';
import { useClickOutside } from 'shared/lib';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';

interface DropdownActions {
  isOpen: boolean;
  open: VoidFunction;
  close: VoidFunction;
  toggle: VoidFunction;
}

export interface DropdownProps {
  placement?: 'left' | 'right';
  element?: (actions: DropdownActions) => React.ReactNode;
  className?: string;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  onClose?: VoidFunction;
}

export const DropdownContext = createContext<DropdownActions>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

export const Dropdown: React.FC<DropdownProps> & { context: typeof DropdownContext } = (props) => {
  const { placement = 'right', element, children, className, contentClassName, contentStyle, onClose } = props;

  const { t } = useTranslation('actions');
  const ref = useRef<HTMLDivElement>(null);
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

  const actions: DropdownActions = { isOpen, open, close, toggle };

  useClickOutside(ref, close);

  useEffect(() => {
    if (!isOpen && onClose) {
      onClose();
    }
  }, [isOpen, onClose]);

  return (
    <DropdownContext.Provider value={actions}>
      <div className={clsx(styles.container, className)} ref={ref}>
        {element && element(actions)}

        {!element && (
          <Button variant="transparent" onClick={toggle} className={styles.button} aria-label={t('open')}>
            <ArrowIcon />
          </Button>
        )}

        <div
          className={clsx(
            styles.dropdown,
            styles[`dropdown_${placement}`],
            isOpen && styles.dropdown_open,
            contentClassName
          )}
          style={contentStyle}
        >
          {children}
        </div>
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.context = DropdownContext;
