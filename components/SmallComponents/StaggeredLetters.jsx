import { motion } from 'framer-motion';

function StaggeredLetters({ word }) {
  const letters = {
    before: { opacity: 0, y: 50 },
    after: { opacity: 1, y: 0 },
  };

  return (
    <>
      {word.split('').map((char, i) => (
        <motion.span key={`${char}-${i}`} variants={letters}>
          {char}
        </motion.span>
      ))}
    </>
  );
}

export default StaggeredLetters;
