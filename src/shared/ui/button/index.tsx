import clsx from 'clsx';

import styles from './styles.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'transparent';
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, children, variant = 'primary', ...rest } = props;

  return (
    <button className={clsx(styles.button, styles[`button_${variant}`], className)} {...rest}>
      {children}
    </button>
  );
};
