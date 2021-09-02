import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';

// import styles from '../../styles/Portfolio.module.css';

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

  console.log(posts);

  return (
    <div className='relative w-full px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <div className=''>
        <h1 className='mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
          Here are some projects that I've been working on
        </h1>
        {/* relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 */}
        <div className='flex flex-col items-center justify-center grid-cols-none p-2 py-16 mx-auto'>
          {mappedPosts.length ? (
            mappedPosts.map((p, i) => (
              <Card
                key={i}
                title={p.title}
                image={p.mainImage}
                slug={p.slug.current}
              />
              // <div
              //   key={index}
              //   className=''
              //   onClick={() => router.push(`/portfolio/${p.slug.current}`)}
              // >
              //   <h3>{p.title}</h3>
              //   <img alt='Main image' className='' src={p.mainImage} />
              // </div>
            ))
          ) : (
            <>No Posts Yet</>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent('*[_type == "portfolio"]');
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
