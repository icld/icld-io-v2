import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import imageUrlBuilder from '@sanity/image-url';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../../components/Footer';
import urlFor from '../../lib/sanity/urlFor';
import { motion, useCycle } from 'framer-motion';

export default function Blog({ posts }) {
  const [mappedPosts, setMappedPosts] = useState([]);
  const [current, pos] = useCycle('before', 'after');

  const router = useRouter();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='z-20 w-full h-full px-4 py-8 m-auto mt-24 mb-16 sm:mt-16 sm:px-6 lg:px-8'>
        <h1 className='text-4xl leading-8 tracking-tight text-center text-gray-900 lg:text-6xl lg: font-another'>
          <span className='text-yellow-300'>icld.io</span> Very Interesting Blog
        </h1>
        <div className='w-11/12 p-2 py-8 m-auto lg:py-16 lg:w-3/5'>
          {posts.map((p, index) => (
            <motion.div
              initial={{ x: `${index % 2 == 0 ? '-30%' : '30%'}` }}
              animate={{
                x: '0%',
                transition: {
                  type: 'spring',
                  duration: 0.5,
                  // delay: `${index * 0.25}`,
                },
              }}
              whileHover={{
                scale: 1.05,
                transition: { type: 'spring', duration: 1 },
              }}
              whileTap={{
                scale: 1.05,
                transition: { type: 'spring', duration: 1 },
              }}
              key={`post-${index}`}
              className='relative flex flex-col w-full mb-12 overflow-hidden rounded-md cursor-pointer '
              onClick={() => router.push(`/blog/${p.slug}`)}
            >
              <div className='mb-1 text-2xl font-another'>{p.title}</div>
              <Image
                alt='main image'
                className=''
                src={urlFor(p.mainImage).url()}
                width={700}
                height={300}
                objectFit='cover'
              />
              <div className='flex flex-row justify-between text-sm md:text-xl font-another'>
                <p> {p?.authName}</p> <div> {p?.publishedAt}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent(`*[_type == "post" ]{_id,
    title,
    publishedAt,
    description,
    "authName": author->name,
    "authImg": author->image,
    "slug": slug.current,
    "categories":   category[]->{title, slug},
    mainImage,
    body,}`);
  const url = `https://jwuejy9w.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());

  if (!result.result || !result.result.length) {
    return {
      props: {
        posts: [],
      },
    };
  } else {
    return {
      props: {
        posts: result.result,
      },
    };
  }
};

Blog.getLayout = function getLayout(page) {
  return (
    <Layout title='icld.io' description='icld.io'>
      <Header />
      {page}
      <Footer />
    </Layout>
  );
};
