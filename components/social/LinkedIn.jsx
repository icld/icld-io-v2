import { FiLinkedin } from 'react-icons/fi';
import styles from './Social.module.css';

export default function () {
  return (
    <>
      <a
        target='_blank'
        rel='noreferrer'
        href='https://www.linkedin.com/in/ian-lyles-a9972668/'
      >
        <FiLinkedin className={styles.socialIcons} />
      </a>
    </>
  );
}
