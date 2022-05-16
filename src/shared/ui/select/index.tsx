import React, { useMemo, useState } from 'react';

import { ChevronIcon, SearchIcon } from 'shared/assets/icons';
import { DropdownMenu, Input } from 'shared/ui';

import styles from './styles.module.scss';

export interface SelectItem<T> {
  value: T;
  label: string;
}

interface SelectProps<T> {
  items: SelectItem<T>[];
  onChange: (value: T) => void;
  label: string;
  value?: T;
  placeholder?: string;
  hasError?: boolean;
  className?: string;
  inputClassName?: string;
}

export const Select = <T = string,>(props: SelectProps<T>) => {
  const { items, value, onChange, className, placeholder, ...rest } = props;

  const [search, setSearch] = useState(value ? `${value}` : '');
  const [isDirty, setDirty] = useState(false);

  const selectedItem = useMemo(() => items.find((item) => item.value === value), [items, value]);
  const filteredItems = useMemo(() => {
    if (isDirty && search) {
      return items.filter((item) => {
        return item.label.toLowerCase().includes(search.toLowerCase());
      });
    }

    return items;
  }, [items, search, isDirty]);

  function onClose() {
    setSearch('');
    setDirty(false);
  }

  function handleChangeSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    setDirty(true);
  }

  function handleClickItem(item: SelectItem<T>) {
    onChange(item.value);
    setSearch('');
  }

  return (
    <DropdownMenu
      className={className}
      contentClassName={styles.dropdown}
      onClose={onClose}
      element={({ isOpen, toggle }) => (
        <Input
          value={isOpen ? search : selectedItem?.label ?? ''}
          placeholder={isOpen ? selectedItem?.label ?? placeholder : placeholder}
          onClick={toggle}
          onChange={handleChangeSearch}
          {...rest}
        >
          {isOpen ? <SearchIcon className={styles.searchIcon} /> : <ChevronIcon className={styles.chevronIcon} />}
        </Input>
      )}
      items={filteredItems.map((item) => (
        <DropdownMenu.Item
          key={`${item.value}`}
          onClick={() => handleClickItem(item)}
          active={item.value === selectedItem?.value}
        >
          {item.label}
        </DropdownMenu.Item>
      ))}
      {...rest}
    />
  );
};
