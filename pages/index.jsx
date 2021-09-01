import Layout from '../components/Layout';
import Header from '../components/Header';
import Image from 'next/image';
import Footer from '../components/Footer';
import MainHome from '../components/MainHome';

export default function Home() {
  return (
    <section className='w-full '>
      <MainHome />
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
