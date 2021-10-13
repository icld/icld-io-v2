import Head from 'next/head';
import { motion } from 'framer-motion';

export default function Layout({ title, description, children }) {
  // const variants = {
  //   hidden: { opacity: 0, x: 200, y: 0 },
  //   enter: { opacity: 1, x: 0, y: 0 },
  //   exit: { opacity: 0, x: 0, y: -100 },
  // };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div
      // className='relative top-0 w-11/12 h-screen m-auto bg-gray-50'
      >
        <main
          className=''
          // className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'
        >
          {children}
        </main>
      </div>
    </>
  );
}
