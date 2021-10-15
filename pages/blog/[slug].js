import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import AddCommentForm from '../../components/AddCommentForm/AddCommentForm';

import { useUser } from '@auth0/nextjs-auth0';

export default function Post({ title, body, image, id }) {
  const [imageUrl, setImageUrl] = useState('');
  // console.log(id);

  useEffect(() => {
    const imageBuilder = imageUrlBuilder({
      projectId: 'jwuejy9w',
      dataset: 'production',
    });

    setImageUrl(imageBuilder.image(image));
  }, [image]);

  const { user, error, isLoading } = useUser();

  console.log(user);
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className=''>
        <h1>{title}</h1>
        {imageUrl && <img alt='blog' className='' src={imageUrl} />}
        <div className=''>
          <BlockContent blocks={body}></BlockContent>{' '}
        </div>
      </div>
      {user ? (
        <>
          {' '}
          <h2>{user.name}</h2>
          <a href='/api/auth/logout'>Logout</a>{' '}
        </>
      ) : (
        <a href='/api/auth/login'>Login</a>
      )}

      <AddCommentForm _id={id} />
    </motion.section>
  );
}

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;
  // console.log(pageSlug);

  if (!pageSlug) {
    return {
      notFound: true,
    };
  }

  const query = encodeURIComponent(
    `*[ _type == "post" && slug.current == "${pageSlug}" ]`
  );

  const url = `https://jwuejy9w.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then((res) => res.json());
  const post = result.result[0];

  //   console.log(post);

  if (!post) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        id: post._id,
        body: post.body,
        title: post.title,
        image: post.mainImage,
        author: post.author,
      },
    };
  }
};

Post.getLayout = function getLayout(page) {
  return (
    <Layout title='icld.io' description='icld.io'>
      <Header />
      {page}
      <Footer />
    </Layout>
  );
};
