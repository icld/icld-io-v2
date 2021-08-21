import { FiInstagram } from 'react-icons/fi';
import styles from './Social.module.css';

export default function () {
  return (
    <>
      <a
        target='_blank'
        rel='noreferrer'
        href='https://www.instagram.com/ll_ic_ll/?hl=en'
      >
        <FiInstagram className={styles.socialIcons} />
      </a>
    </>
  );
}
