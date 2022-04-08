import clsx from 'clsx';
import { Link, LinkProps } from 'react-router-dom';

import styles from './styles.module.scss';

interface LinkButtonProps extends LinkProps {
  variant?: 'primary' | 'transparent';
}

export const LinkButton: React.FC<LinkButtonProps> = (props) => {
  const { className, children, variant = 'primary', ...rest } = props;

  return (
    <Link className={clsx(styles.link, styles[`link_${variant}`], className)} {...rest}>
      {children}
    </Link>
  );
};
