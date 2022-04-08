import clsx from 'clsx';

import styles from './styles.module.scss';

export interface GraphColumn {
  label: string;
  value: number; // 0 - 100
  active?: boolean;
}

interface GraphProps {
  columns: GraphColumn[];
  className?: string;
}

export const Graph: React.VFC<GraphProps> = (props) => {
  const { columns, className } = props;

  return (
    <div className={clsx(styles.container, className)}>
      {columns.map((column) => {
        return (
          <div key={column.label} className={clsx(styles.column, column.active && styles.column_active)}>
            <div className={styles.barContainer}>
              <div className={styles.bar} style={{ height: `${column.value}%` }} />
            </div>

            <p className={styles.label}>{column.label}</p>
          </div>
        );
      })}
    </div>
  );
};
