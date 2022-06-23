import clsx from 'clsx';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export interface TextSwitchItem<T> {
  label: React.ReactNode;
  value: T;
  asLink?: boolean;
}

interface TextSwitchProps<T> {
  name: string;
  value: T;
  onChange: (value: T) => void;
  items: TextSwitchItem<T>[];
  className?: string;
}

export const TextSwitch = <T,>(props: TextSwitchProps<T>) => {
  const { name, items, value, onChange, className } = props;

  function handleChange(selectedValue: T) {
    onChange(selectedValue);
  }

  return (
    <div className={clsx(styles.switch, className)}>
      {items.map((item, idx) => {
        const isChecked = item.value === value;
        const isLast = idx >= items.length - 1;

        return (
          <Fragment key={`${item.value}`}>
            {item.asLink && (
              <Link to={item.value} className={styles.item}>
                {item.label}
              </Link>
            )}

            {!item.asLink && (
              <label className={clsx(styles.item, isChecked && styles.item_active)}>
                <input
                  type="radio"
                  name={name}
                  value={`${item.value}`}
                  checked={isChecked}
                  onChange={() => handleChange(item.value)}
                  className={styles.input}
                />
                {item.label}
              </label>
            )}

            {!isLast && <span className={styles.separator}>{' / '}</span>}
          </Fragment>
        );
      })}
    </div>
  );
};
