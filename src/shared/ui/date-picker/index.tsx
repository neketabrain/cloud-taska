import clsx from 'clsx';
import ru from 'date-fns/locale/ru';
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { getLocale } from 'shared/lib';

import { Input } from '../input';

import styles from './styles.module.scss';

registerLocale('ru', ru);
registerLocale('ru-RU', ru);

interface DatePickerProps extends Omit<ReactDatePickerProps, 'placeholderText'> {
  label: string;
  placeholder?: string;
  hasError?: boolean;
  inputClassName?: string;
}

export const DatePicker: React.VFC<DatePickerProps> = (props) => {
  const { label, placeholder, hasError, className, inputClassName, ...rest } = props;

  const locale = getLocale();

  return (
    <div className={clsx(styles.datePicker, className)}>
      <ReactDatePicker
        placeholderText={placeholder}
        customInput={<Input label={label} hasError={hasError} inputClassName={inputClassName} />}
        locale={locale}
        {...rest}
      />
    </div>
  );
};