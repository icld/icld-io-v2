import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Form from '../../components/Form';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Contact</h1>
      <Form />
    </motion.section>
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
