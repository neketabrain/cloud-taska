import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './styles.module.scss';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hasError?: boolean;
  textareaClassName?: string;
}

export const Textarea: React.FC<TextareaProps> = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { label, className, textareaClassName, hasError, ...rest } = props;

  return (
    <label className={clsx(styles.container, className)}>
      <span className={styles.label}>{label}</span>
      <textarea
        className={clsx(styles.textarea, hasError && styles.textarea_error, textareaClassName)}
        ref={ref}
        {...rest}
      />
    </label>
  );
});
