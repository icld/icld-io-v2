import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import Link from 'next/router';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import Footer from '../../components/Footer';
import urlFor from '../../lib/sanity/urlFor';
import { motion } from 'framer-motion';

export default function PortfolioPost({
  title,
  body,
  image,
  url,
  technology,
  images,
  github,
  image2,
}) {
  const [imageUrl, setImageUrl] = useState('');
  const [mappedImages, setMappedImages] = useState([]);
  const [img, setImg] = useState(images);
  const [image2Url, setImage2Url] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='relative mx-auto max-w-7xl lg:px-8'
    >
      <div className='relative bg-white '>
        <div className='relative px-4 pt-12 pb-16 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2 '>
          <div className='relative hidden w-full lg:h-full lg:block '>
            <Image
              src={`${urlFor(image2).url()}`}
              alt='Main image for page'
              quality={10}
              layout='fill'
              objectFit='cover'
            />
          </div>

          <div className='lg:col-start-2 lg:pl-8'>
            <div className='mx-auto text-base max-w-prose lg:max-w-lg lg:ml-auto lg:mr-0'>
              <div className='flex flex-row justify-between lg:block'>
                <div className='flex flex-col'>
                  {/* <h2 className='font-semibold leading-6 tracking-wide text-red-800 uppercase'>
                    Site
                  </h2> */}
                  <h3 className='mt-2 mb-4 text-4xl font-extrabold leading-8 tracking-tight text-gray-900 md:text-5xl font-another'>
                    {title}
                  </h3>
                </div>
                <div className=''>
                  <ul className='mb-4 font-bold'>
                    {technology.map((tech, i) => (
                      <li
                        className='text-right text-yellow-300 lg:text-left'
                        key={i}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <ul className=''>
                <li>
                  <a
                    className='p-1 border hover:bg-gray-900 hover:text-white'
                    href={url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    Live Site
                  </a>
                </li>
                <li className='mt-1'>
                  <a
                    className='p-1 border hover:bg-gray-900 hover:text-white'
                    href={github}
                    target='_blank'
                    rel='noreferrer'
                  >
                    Github Repo{' '}
                  </a>
                </li>
              </ul>

              <p className='mt-6 text-xl text-gray-500'>{}</p>
              <div className='mt-5 text-lg text-gray-800 font-dingo prose-blue '>
                <p>
                  <BlockContent blocks={body}></BlockContent>
                </p>
              </div>

              <div className='relative grid w-full grid-cols-1 gap-6 mt-6'>
                {images.map((item) => {
                  return (
                    <div className='relative w-full h-72' key={item._key}>
                      <Image
                        src={`${urlFor(item).width(500).height(400)}`}
                        alt='Other image for page'
                        // quality={30}
                        layout='fill'
                        objectFit='cover'
                      />
                    </div>

                    // <img
                    //   className='object-cover w-full h-full overflow-hidden'
                    //   alt='portfolio'
                    //   src={`${urlFor(item).url()}`}
                    // />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>

    //   <section>
    //     <container>
    //       <div className=''>
    //         <h1>{title}</h1>

    //         {imageUrl && (
    //           <a href={url} target='_blank' rel='noreferrer'>
    //             <img alt='blog' className='' src={imageUrl} />
    //           </a>
    //         )}
    //         <div>
    //           <ul>
    //             {technology.map((t, i) => (
    //               <li key={i}>{t}</li>
    //             ))}
    //           </ul>
    //         </div>
    //         <div className=''>
    //           <BlockContent blocks={body}></BlockContent>{' '}
    //         </div>
    //         <div>
    //           {mappedImages.map((image, i) => (
    //             <img alt='portfolio' src={image.image} key={i} />
    //           ))}
    //         </div>
    //       </div>
    //     </container>
    //   </section>
  );
}

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  if (!pageSlug) {
    return {
      notFound: true,
    };
  }

  const query = encodeURIComponent(
    `*[ _type == "portfolio" && slug.current == "${pageSlug}" ]`
  );

  const url = `https://jwuejy9w.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then((res) => res.json());
  const post = result.result[0];

  if (!post) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        body: post.body || null,
        title: post.title || null,
        image: post.mainImage || null,
        image2: post.mainImage2 || null,
        url: post.url || null,
        technology: post.technology || null,
        images: post.images || null,
        url: post.url || null,
        github: post.github || null,
      },
    };
  }
};

PortfolioPost.getLayout = function getLayout(page) {
  return (
    <Layout title='icld.io' description='icld.io'>
      <Header />
      {page}
      <Footer />
    </Layout>
  );
};
