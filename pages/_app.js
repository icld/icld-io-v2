import Layout from '../components/Layout';
import Header from '../components/Header';

// import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    // <AnimatePresence exitBeforeEnter initial={false}>
    <Component {...pageProps} />
    // </AnimatePresence>
  );
}

export default MyApp;
