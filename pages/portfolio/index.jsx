import Layout from '../../components/Layout';
import Header from '../../components/Header';

export default function Portfolio() {
  return (
    <section>
      <h1>Portfolio</h1>
    </section>
  );
}

Portfolio.getLayout = function getLayout(page) {
  return (
    <Layout title='icld | portfolio' description='icld.io portfolio page'>
      <Header />
      {page}
    </Layout>
  );
};
