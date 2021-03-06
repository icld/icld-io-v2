import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import { motion } from 'framer-motion';

import { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { useRouter } from 'next/router';

export default function Portfolio({ posts }) {
  const [mappedPosts, setMappedPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (posts.length) {
      const imageBuilder = imageUrlBuilder({
        projectId: 'jwuejy9w',
        dataset: 'production',
      });

      //get's the image from sanity and places it back into each post, and sets it in state
      setMappedPosts(
        posts.map((p) => {
          return {
            ...p,
            mainImage: imageBuilder.image(p.mainImage).width(700).height(350),
          };
        })
      );
    } else {
      setMappedPosts([]);
    }
  }, [posts]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='relative z-20 w-full h-full px-4 py-8 m-auto mt-24 mb-16 sm:mt-16 max-w-7xl sm:px-6 lg:px-8'
    >
      <div className=''>
        <h1 className='flex flex-col justify-center text-4xl leading-8 tracking-tight text-right text-gray-900 sm:text-5xl lg:text-6xl lg: font-another md:flex-row '>
          <div className=''>Here are some</div>
          <motion.div
            initial={{ scale: 4 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            className='mx-2 text-yellow-300 '
          >
            projects
          </motion.div>
          {`I've developed`}
        </h1>
        {/* relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 */}
        <div className='grid items-center justify-center gap-6 p-2 py-8 mx-auto lg:py-16 md:grid-cols-2 md:gap-8'>
          {posts ? (
            posts.map((p, i) => (
              <Card
                key={i}
                title={p.title}
                image={p.mainImage}
                slug={p.slug.current}
                description={p.description}
              />
            ))
          ) : (
            <>No Posts Yet</>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent(
    '*[_type == "portfolio"] | order(order asc)'
  );
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

Portfolio.getLayout = function getLayout(page) {
  return (
    <Layout title='icld | portfolio' description='icld.io portfolio page'>
      <Header />
      {page}
      <Footer />
    </Layout>
  );
};
