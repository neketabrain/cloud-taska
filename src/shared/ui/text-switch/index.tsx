import clsx from 'clsx';
import { Fragment } from 'react';

import styles from './styles.module.scss';

interface TextSwitchItem {
  label: React.ReactNode;
  value: string;
}

interface TextSwitchProps {
  name: string;
  value: TextSwitchItem['value'];
  onChange: (value: TextSwitchItem['value']) => void;
  items: TextSwitchItem[];
}

const TextSwitch: React.VFC<TextSwitchProps> = (props) => {
  const { name, items, value, onChange } = props;

  function handleChange(selectedValue: TextSwitchItem['value']) {
    onChange(selectedValue);
  }

  return (
    <div className={styles.switch}>
      {items.map((item, idx) => {
        const isChecked = item.value === value;
        const isLast = idx >= items.length - 1;

        return (
          <Fragment key={item.value}>
            <label className={clsx(styles.item, isChecked && styles.item_active)}>
              <input
                type="radio"
                name={name}
                value={item.value}
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

export { TextSwitch };
export type { TextSwitchItem };
