import clsx from 'clsx';
import SimpleBar, { Props as SimpleBarProps } from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import styles from './styles.module.scss';

export const Scrollbar: React.FC<SimpleBarProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <SimpleBar className={clsx(styles.scrollbar, className)} {...rest}>
      {children}
    </SimpleBar>
  );
};
