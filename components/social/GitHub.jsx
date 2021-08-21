// import { Github } from '@icons-pack/react-simple-icons';
import { FiGithub } from 'react-icons/fi';
import styles from './Social.module.css';

export default function () {
  return (
    <>
      <a target='_blank' rel='noreferrer' href='https://github.com/icld'>
        <FiGithub className={styles.socialIcons} />
      </a>
    </>
  );
}
