import { FiMail } from 'react-icons/fi';
import styles from './Social.module.css';

export default function () {
  return (
    <>
      <a href='mailto:info@icld.io'>
        <FiMail className={styles.socialIcons} />
      </a>
    </>
  );
}
