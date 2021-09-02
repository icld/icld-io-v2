import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Image from 'next/image';
// import styles from '../../styles/About.module.css';
import Footer from '../../components/Footer';
import About from '../../components/About';

export default function AboutPage() {
  return (
    <section>
      <About />
    </section>
  );
}

AboutPage.getLayout = function getLayout(page) {
  return (
    <Layout title='icld | about' description='icld.io about page'>
      <Header />
      {page}
      <Footer />
    </Layout>
  );
};
