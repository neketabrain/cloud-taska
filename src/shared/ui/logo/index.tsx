import clsx from 'clsx';

import { LogoIcon } from 'shared/assets/icons';

import styles from './styles.module.scss';

interface LogoProps {
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const Logo: React.VFC<LogoProps> = (props) => {
  const { className, as: Wrapper = 'h1' } = props;

  return (
    <div className={clsx(styles.logo, className)}>
      <LogoIcon className={styles.icon} />
      <Wrapper className={styles.title}>Taska</Wrapper>
    </div>
  );
};
