import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Image from 'next/image';
import styles from '../../styles/About.module.css';
import Footer from '../../components/Footer';

export default function About() {
  return (
    <section>
      <h1>About</h1>
      <h2>and resume</h2>
    </section>
  );
}

About.getLayout = function getLayout(page) {
  return (
    <Layout title='icld | about' description='icld.io about page'>
      <Header />
      {page}
      <Footer />
    </Layout>
  );
};
