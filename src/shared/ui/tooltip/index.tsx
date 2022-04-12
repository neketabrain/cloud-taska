import { useEffect } from 'react';
import ReactTooltip from 'react-tooltip'; // FIXME Обновить версию библиотеки (не скрываются тултипы)

import styles from './styles.module.scss';

interface TooltipProps extends React.HTMLAttributes<HTMLElement> {
  tip?: string;
  as?: React.ElementType;
}

const TOOLTIP_ID = 'tooltip';

export const TooltipContainer: React.FC = (props) => {
  const { children } = props;

  return (
    <ReactTooltip id={TOOLTIP_ID} className={styles.tooltip} effect="solid">
      {children}
    </ReactTooltip>
  );
};

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const { children, tip, as: Tag = 'div', ...rest } = props;

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <Tag data-tip={tip} data-for={TOOLTIP_ID} {...rest}>
      {children}
    </Tag>
  );
};
