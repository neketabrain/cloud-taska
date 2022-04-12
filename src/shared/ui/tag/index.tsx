import clsx from 'clsx';

import styles from './styles.module.scss';

interface TagProps {
  className?: string;
  as?: React.ElementType;
}

export const Tag: React.FC<TagProps> = (props) => {
  const { className, children, as: Wrapper = 'p' } = props;

  return <Wrapper className={clsx(styles.tag, className)}>{children}</Wrapper>;
};
