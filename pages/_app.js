import Layout from '../components/Layout';
import Header from '../components/Header';

// import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
