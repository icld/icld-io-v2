import Head from 'next/head';
import styles from '../styles/Layout.module.css';

export default function Layout({ title, description, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>{children}</main>
    </>
  );
}
