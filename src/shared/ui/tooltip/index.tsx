import clsx from 'clsx';
import ReactTooltip from 'rc-tooltip';
import { TooltipProps as ReactTooltipProps } from 'rc-tooltip/lib/Tooltip';
import 'rc-tooltip/assets/bootstrap.css';

import styles from './styles.module.scss';

interface TooltipProps extends ReactTooltipProps {
  className?: string;
  placement?: 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const { children, className, overlay, ...rest } = props;

  if (!overlay) {
    return <>{children}</>;
  }

  return (
    <ReactTooltip overlayClassName={clsx(styles.tooltip, className)} overlay={overlay} {...rest}>
      {children}
    </ReactTooltip>
  );
};
