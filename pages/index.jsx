import { useRef, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Image from 'next/image';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import About from '../components/About';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import VisibilitySensor from 'react-visibility-sensor';
import { useStore } from '../lib/zustand/store';

export default function Home() {
  const router = useRouter();
  const aboutRef = useRef(null);
  const heroRef = useRef(null);
  const { aboutIsVisible, setAboutIsVisible } = useStore();

  // useEffect(() => {
  //   // setAboutIsVisible(false);
  //   return () => {
  //     aboutIsVisible;
  //   };
  // }, []);

  const scrollToRef = (ref) => {
    window.scrollTo({
      top: (0, ref.current.offsetTop),
      behavior: 'smooth',
    });
  };

  return (
    <div className='' ref={heroRef}>
      <Hero />

      {/* About Section */}
      <VisibilitySensor
        partialVisibility={true}
        minTopValue={250}
        onChange={(isVisible) =>
          isVisible ? setAboutIsVisible(true) : setAboutIsVisible(false)
        }
      >
        <div className='relative' ref={aboutRef}>
          <About />
        </div>
      </VisibilitySensor>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout title='icld.io' description='icld.io'>
      <Header />
      {page}
      <Footer />
    </Layout>
  );
};
