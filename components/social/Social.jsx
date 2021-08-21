import Instagram from './Instagram';
import Twitter from './Twitter';
import GitHub from './GitHub';
import Email from './Email';
import LinkedIn from './LinkedIn';

import styles from '../../styles/Social.module.css';

export default function () {
  return (
    <div className=''>
      <GitHub />
      <Instagram />
      <Twitter />
      <LinkedIn />
      <Email />
    </div>
  );
}
