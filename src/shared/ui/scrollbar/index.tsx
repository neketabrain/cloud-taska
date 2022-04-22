import clsx from 'clsx';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import styles from './styles.module.scss';

interface ScrollbarProps extends SimpleBar.Props {
  variant?: 'dark' | 'light';
}

export const Scrollbar: React.FC<ScrollbarProps> = (props) => {
  const { variant = 'dark', children, className, ...rest } = props;

  return (
    <SimpleBar className={clsx(styles.scrollbar, styles[`scrollbar_${variant}`], className)} {...rest}>
      {children}
    </SimpleBar>
  );
};
