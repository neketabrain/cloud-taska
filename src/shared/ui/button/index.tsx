import clsx from 'clsx';
import { Link, LinkProps } from 'react-router-dom';

import styles from './styles.module.scss';

enum ButtonVariants {
  primary = 'primary',
  transparent = 'transparent',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: `${ButtonVariants}`;
}

interface LinkButtonProps extends LinkProps {
  variant?: `${ButtonVariants}`;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, children, variant = 'primary', ...rest } = props;

  return (
    <button className={clsx(styles.button, styles[`button_${variant}`], className)} {...rest}>
      {children}
    </button>
  );
};

export const LinkButton: React.FC<LinkButtonProps> = (props) => {
  const { className, children, variant = 'primary', ...rest } = props;

  return (
    <Link className={clsx(styles.button, styles[`button_${variant}`], className)} {...rest}>
      {children}
    </Link>
  );
};
