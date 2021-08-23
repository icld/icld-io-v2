import { useState, useEffect } from 'react';
// import Link from 'next/link';
import { Link } from '../components/Link';
import router, { useRouter } from 'next/router';

import styles from '../styles/Header.module.css';

const Header = (props) => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState(false);
  const [chngCol, setChngCol] = useState(false);

  //remove dropdown menu when window is larger size
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        setActiveMenu(false);
      }
    });
  });

  return (
    <section>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href='/'>ICLD</Link>
        {/* upper Nav */}

        <div>
          {navItems.map((item, i) =>
            item.name === 'lx' ? (
              <a target='_blank' rel='noreferrer' href={item.href}>
                {item.name}
              </a>
            ) : (
              <Link href={item.href}>{item.name}</Link>
            )
          )}
        </div>
      </nav>
    </section>
  );
};
export default Header;

const navItems = [
  { name: 'portfolio', href: '/portfolio' },
  { name: 'about', href: '/about' },
  { name: 'lx', href: 'https://www.icldesign.com' },
  { name: 'contact', href: '/contact' },
  { name: 'blog', href: '/blog' },
];
