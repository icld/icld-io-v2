import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import styles from '../../styles/Blog.module.css';
import imageUrlBuilder from '@sanity/image-url';
import { useRouter } from 'next/router';
import Footer from '../../components/Footer';

export default function Blog({ posts }) {
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
            mainImage: imageBuilder.image(p.mainImage).width(500).height(250),
          };
        })
      );
    } else {
      setMappedPosts([]);
    }
  }, [posts]);

  console.log(posts);
  return (
    <section>
      <div className={styles.main}>
        <h1>My Blog</h1>

        <h3>Recent Posts:</h3>
        {mappedPosts.length ? (
          mappedPosts.map((p, index) => (
            <div
              key={index}
              className={styles.post}
              onClick={() => router.push(`/blog/${p.slug.current}`)}
            >
              <h3>{p.title}</h3>
              <img
                alt='main image'
                className={styles.mainImage}
                src={p.mainImage}
              />
            </div>
          ))
        ) : (
          <>No Posts Yet</>
        )}
      </div>
    </section>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent('*[_type == "post"]');
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
