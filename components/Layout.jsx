import Head from 'next/head';

export default function Layout({ title, description, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main
        className=''

        // className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'
      >
        {children}
      </main>
    </>
  );
}
