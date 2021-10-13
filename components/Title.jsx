import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useStore } from '../lib/zustand/store';

const transitions = {
  type: 'bounce',
  stiffness: 50,
  damping: 50,
  duration: 2,
  delay: 0,
  ease: 'easeOut',
};

function Title() {
  //   const [isHome, setIsHome] = useState(false);
  const router = useRouter();
  const { isTitle, setIsTitle } = useStore();

  return (
    <Link href='/'>
      <a className='flex flex-row items-center justify-center ml-1 text-xl '>
        {/* Main title */}
        <div
          className={`absolute z-10  left-2 transition-transform duration-500 ${
            router.pathname == '/' ? 'top-36' : '  top-0'
          } `}
        >
          <motion.h1
            initial={{
              x: '50%',
              scale: 1.5,
              backgroundImage: { opacity: 0 },
            }}
            animate={{
              x: '0%',
              scale: 1,
              backgroundImage: { opacity: 100 },
            }}
            transition={transitions}
            onAnimationComplete={() => setIsTitle(true)}
            className={
              'flex flex-col text-yellow-300 transition-colors sm:flex-row hover:text-yellow-100 ease-linear text-7xl font-another text-shadow-lg'
            }
          >
            <motion.div
              initial={{ y: '50%' }}
              animate={{ y: '0%' }}
              transition={transitions}
            >
              Ian {'   '}
            </motion.div>{' '}
            <motion.div
              initial={{ y: '500%' }}
              animate={{ y: '0%' }}
              transition={transitions}
            >
              Cameron
            </motion.div>{' '}
            <motion.div
              initial={{ y: '700%' }}
              animate={{ y: '0%' }}
              transition={transitions}
            >
              Lyles
            </motion.div>
          </motion.h1>
          <p
            className={`text-2xl opacity-0  duration-1000  delay-200 transition-opacity text-yellow-100 font-another text-shadow-lg  ${
              isTitle && 'opacity-100'
            }  ${router.pathname != '/' ? 'hidden' : null}`}
          >
            JavaScript Developer
          </p>
        </div>
        {/* <GiForearm className='text-3xl text-gray-50 text-shadow-lg' />
            <div className='ml-3 text-gray-50'>ICLD</div> */}
      </a>
    </Link>
  );
}

export default Title;
