import { FiTwitter } from 'react-icons/fi';
import styles from './Social.module.css';

export default function () {
  return (
    <>
      <a target='_blank' rel='noreferrer' href='https://twitter.com/IanLyles'>
        <FiTwitter className={styles.socialIcons} />
      </a>
    </>
  );
}
