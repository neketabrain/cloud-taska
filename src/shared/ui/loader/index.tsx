import { ReactComponent as LoaderImage } from 'shared/assets/images/loader.svg';

import styles from './styles.module.scss';

interface LoaderProps {}

export const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.loaderContainer}>
        <div className={styles.loaderElement} />
        <LoaderImage className={styles.loaderIcon} />
      </div>
    </div>
  );
};
