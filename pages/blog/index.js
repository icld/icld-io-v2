import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import imageUrlBuilder from '@sanity/image-url';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
            mainImage: imageBuilder.image(p.mainImage).width(900).height(400),
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
      <div className='relative w-full px-4 py-8 mx-auto lg:py-16 max-w-7xl sm:px-6 lg:px-8'>
        <h1 className='text-4xl leading-8 tracking-tight text-center text-gray-900 lg:text-6xl lg: font-another'>
          <span className='text-yellow-500'>icld.io</span> Very Interesting Blog
        </h1>
        <div className='flex flex-col items-center justify-center w-full p-2 py-8 lg:py-16 '>
          {mappedPosts.length ? (
            mappedPosts.map((p, index) => (
              <div
                key={index}
                className='flex flex-col w-full mb-12 cursor-pointer lg:w-3/5'
                onClick={() => router.push(`/blog/${p.slug}`)}
              >
                <div className='mb-1 text-2xl font-another'>{p.title}</div>
                <img alt='main image' className='' src={p.mainImage} />
                <div className='flex flex-row justify-between text-sm md:text-xl font-another'>
                  <p> {p?.authName}</p> <div> {p?.publishedAt}</div>
                </div>
              </div>
            ))
          ) : (
            <>No Posts Yet</>
          )}
        </div>
      </div>
    </section>
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
