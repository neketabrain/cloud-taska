import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './styles.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hasError?: boolean;
  inputClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, className, inputClassName, hasError, slot, children, ...rest } = props;

  return (
    <label className={clsx(styles.container, className)}>
      <span className={styles.label}>{label}</span>
      <input className={clsx(styles.input, hasError && styles.input_error, inputClassName)} ref={ref} {...rest} />
      {children}
    </label>
  );
});
