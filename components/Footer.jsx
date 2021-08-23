import { Link } from '../components/Link';
import styles from '../styles/Footer.module.css';

import { FiGithub, FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <section>
      <footer className={styles.footer}>
        <div className={styles.main}>
          <div>©2021 Ian Cameron Lyles</div>
          <div className={styles.socialsMain}>
            <FiInstagram />
            <FiGithub />
            <FiTwitter />
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
