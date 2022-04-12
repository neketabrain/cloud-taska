import clsx from 'clsx';

import { hasValue } from 'shared/lib';
import { Tooltip } from 'shared/ui';

import styles from './styles.module.scss';

export interface BarChartItem {
  label: string;
  value: number; // 0 - 100
  foregroundValue?: number; // 0 - 100
  tooltip?: string;
  active?: boolean;
}

interface BarChartProps {
  data: BarChartItem[];
  className?: string;
}

export const BarChart: React.VFC<BarChartProps> = (props) => {
  const { data, className } = props;

  return (
    <div className={clsx(styles.container, className)}>
      {data.map((item) => {
        return (
          <div key={item.label} className={clsx(styles.column, item.active && styles.column_active)}>
            <Tooltip tip={item.tooltip} className={styles.barContainer}>
              {hasValue(item.foregroundValue) && (
                <div className={styles.foregroundBar} style={{ height: `${item.foregroundValue}%` }} />
              )}

              <div className={styles.bar} style={{ height: `${item.value}%` }} />
            </Tooltip>

            <p className={styles.label}>{item.label}</p>
          </div>
        );
      })}
    </div>
  );
};
