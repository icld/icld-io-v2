import Layout from '../components/Layout';
import Header from '../components/Header';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <section style={{ height: '100vh' }}>
      <h1>welcome to icld.io </h1>
      <h2>my name is Ian Lyles </h2>
      <h2>what would you like to build?</h2>
    </section>
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
