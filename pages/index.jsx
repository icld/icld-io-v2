import { useRef, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Image from 'next/image';
import Footer from '../components/Footer';
import Avatar from '../components/Auth/Avatar';
import Hero from '../components/Hero';
import About from '../components/About';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import VisibilitySensor from 'react-visibility-sensor';
import { useStore } from '../lib/zustand/store';
import BouncingDownArrow from '../components/SmallComponents/BouncingDownArrow';

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

  return (
    <div className='flex flex-col items-center' ref={heroRef}>
      <Hero />
      <div className='absolute z-50 top-2 left-2'>
        <Avatar />
      </div>
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
      <BouncingDownArrow up={heroRef} down={aboutRef} />
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
