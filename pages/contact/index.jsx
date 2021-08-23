import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Form from '../../components/Form';
import Footer from '../../components/Footer';

export default function Contact() {
  return (
    <section>
      <h1>Contact</h1>
      <Form />
    </section>
  );
}

Contact.getLayout = function getLayout(page) {
  return (
    <Layout title='icld.io' description='icld.io'>
      <Header />
      {page}
      <Footer />
    </Layout>
  );
};
