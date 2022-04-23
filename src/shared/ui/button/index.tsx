import clsx from 'clsx';
import { forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import styles from './styles.module.scss';

enum ButtonVariants {
  primary = 'primary',
  secondary = 'secondary',
  transparent = 'transparent',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: `${ButtonVariants}`;
}

interface LinkButtonProps extends LinkProps {
  variant?: `${ButtonVariants}`;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, children, variant = 'primary', type = 'button', ...rest } = props;

  return (
    <button className={clsx(styles.button, styles[`button_${variant}`], className)} type={type} ref={ref} {...rest}>
      {children}
    </button>
  );
});

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>((props, ref) => {
  const { className, children, variant = 'primary', ...rest } = props;

  return (
    <Link className={clsx(styles.button, styles[`button_${variant}`], className)} ref={ref} {...rest}>
      {children}
    </Link>
  );
});
