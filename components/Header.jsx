import { useState, useEffect } from 'react';
import Link from 'next/link';
import router, { useRouter } from 'next/router';

import styles from '../styles/Header.module.css';

const Header = (props) => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState(false);
  const [chngCol, setChngCol] = useState(false);

  const closeHandle = (e) => {
    activeMenu ? setActiveMenu(false) : setActiveMenu(true);
  };

  //remove dropdown menu when window is larger size
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        setActiveMenu(false);
      }
    });
  });

  const changeColor = () => {
    setChngCol(!chngCol);
  };

  return (
    <>
      <header>
        <nav>
          <div
            style={{
              display: 'flex',
              paddingTop: '10px',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link href='/'>
              <a>ICLD</a>
            </Link>
            {/* upper Nav */}
            <div>
              {navItems.map((item, i) =>
                item.name === 'lx' ? (
                  <a target='_blank' rel='noreferrer' href={item.toHref}>
                    {item.name}
                  </a>
                ) : (
                  <Link href={item.toHref}>
                    <a>{item.name}</a>
                  </Link>
                )
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Header;

const navItems = [
  { name: 'portfolio', toHref: '/portfolio' },
  { name: 'about', toHref: '/about' },
  { name: 'lx', toHref: 'https://www.icldesign.com' },
  { name: 'contact', toHref: '/contact' },
  { name: 'blog', toHref: '/blog' },
];
