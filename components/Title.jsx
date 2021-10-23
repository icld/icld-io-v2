import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useStore } from '../lib/zustand/store';

const transitions = {
  type: 'bounce',
  stiffness: 50,
  damping: 50,
  duration: 1,
  delay: 0,
  ease: 'easeOut',
};

function Title() {
  //   const [isHome, setIsHome] = useState(false);
  const router = useRouter();

  return (
    <div className=''>
      <Link href='/' passHref>
        <a
          className='flex flex-row items-center justify-center text-xl '
          key='123'
        >
          {/* Main title */}
          <div
            className={`absolute z-10  left-2 transition-transform duration-500 ${
              router.pathname == '/' ? 'top-36 ' : '  top-2 left-6 '
            } `}
          >
            <motion.div
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
              className={` flex flex-col text-yellow-300 transition-colors sm:flex-row hover:text-yellow-200 ease-linear text-6xl md:text-7xl font-another   ${
                router.pathname == '/' && 'text-shadow-lg'
              }`}
            >
              <motion.div
                initial={{ y: '50%' }}
                animate={{ y: '0%' }}
                transition={transitions}
                whileHover={{ opacity: [1, 0.7, 1] }}
              >
                Ian
              </motion.div>{' '}
              <motion.div
                initial={{ y: '500%' }}
                animate={{ y: '0%' }}
                transition={transitions}
                whileHover={{ opacity: [1, 0.7, 1] }}
              >
                Cameron
              </motion.div>{' '}
              <motion.div
                initial={{ y: '700%' }}
                animate={{ y: '0%' }}
                transition={transitions}
                whileHover={{ opacity: [1, 0.7, 1] }}
              >
                Lyles
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
              className={`text-2xl text-yellow-100 font-another text-shadow-lg 

             ${router.pathname != '/' ? 'hidden' : 'block'}
             `}
            >
              JavaScript Developer
            </motion.div>
          </div>
          {/* <GiForearm className='text-3xl text-gray-50 text-shadow-lg' />
            <div className='ml-3 text-gray-50'>ICLD</div> */}
        </a>
      </Link>
    </div>
  );
}

export default Title;
