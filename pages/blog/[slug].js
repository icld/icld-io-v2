import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import styles from '../../styles/Post.module.css';
import Footer from '../../components/Footer';

export default function Post({ title, body, image }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const imageBuilder = imageUrlBuilder({
      projectId: 'jwuejy9w',
      dataset: 'production',
    });

    setImageUrl(imageBuilder.image(image));
  }, [image]);

  return (
    <section>
      <div className={styles.main}>
        <h1>{title}</h1>
        {imageUrl && (
          <img alt='blog' className={styles.mainImage} src={imageUrl} />
        )}
        <div className={styles.body}>
          <BlockContent blocks={body}></BlockContent>{' '}
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;
  console.log(pageSlug);

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
