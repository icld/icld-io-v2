import 'tailwindcss/tailwind.css';
import { AnimatePresence } from 'framer-motion';
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
