import clsx from 'clsx';
import { Fragment } from 'react';

import styles from './styles.module.scss';

export interface TextSwitchItem<T> {
  label: React.ReactNode;
  value: T;
}

interface TextSwitchProps<T> {
  name: string;
  value: T;
  onChange: (value: T) => void;
  items: TextSwitchItem<T>[];
}

export const TextSwitch = <T,>(props: TextSwitchProps<T>) => {
  const { name, items, value, onChange } = props;

  function handleChange(selectedValue: T) {
    onChange(selectedValue);
  }

  return (
    <div className={styles.switch}>
      {items.map((item, idx) => {
        const isChecked = item.value === value;
        const isLast = idx >= items.length - 1;

        return (
          <Fragment key={`${item.value}`}>
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

            {!isLast && <p className={styles.separator}>{' / '}</p>}
          </Fragment>
        );
      })}
    </div>
  );
};
