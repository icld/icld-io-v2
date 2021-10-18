import Layout from '../components/Layout';
import Header from '../components/Header';

// import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { AnimatePresence } from 'framer-motion';
import Avatar from '../components/Auth/Avatar';
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <UserProvider>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Component {...pageProps} />
      </AnimatePresence>
    </UserProvider>
  );
}

export default MyApp;
