import { motion } from 'framer-motion';
import { BsChevronDoubleDown } from 'react-icons/bs';
import { useStore } from '../../lib/zustand/store';
import { scrollToRef } from '../../utils/scrollToRef';

const chevronVariants = {
  pointingUp: {
    x: '0%',
    transition: { x: { duration: 0.5 } },
  },
  hover: {
    scale: 1.1,
    transition: { y: { stiffness: 1000, velocity: -100, duration: 0.5 } },
    y: 0,
    x: 0,
  },

  click: {
    scale: 0.9,
    transition: { y: { stiffness: 1000, velocity: -100 } },
  },

  bounce: {
    y: {
      value: ['10%', '-10%'],
      transition: {
        type: 'spring',
        stiffness: 50,
        yoyo: Infinity,
        duration: 1,
        damping: 10,
        repeatDelay: 0,
        ease: 'easeOut',
      },
    },
    x: {
      value: '0',
      transition: {
        duration: 0.5,
      },
    },
  },
};

function BouncingDownArrow({ up, down }) {
  const { aboutIsVisible, setAboutIsVisible } = useStore();

  return (
    <motion.div
      variants={chevronVariants}
      whileHover='hover'
      whileTap='click'
      initial={{ scale: 1 }}
      animate={aboutIsVisible ? 'pointingUp' : 'bounce'}
      className={`fixed   z-50 text-5xl mx-auto    bottom-14    ${
        aboutIsVisible ? ' right-4' : ''
      } `}
    >
      <BsChevronDoubleDown
        className={`text-yellow-300 ${aboutIsVisible && 'rotate-180'} `}
        onClick={
          aboutIsVisible ? () => scrollToRef(up) : () => scrollToRef(down)
        }
      />
    </motion.div>
  );
}

export default BouncingDownArrow;
