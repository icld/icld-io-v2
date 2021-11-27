import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import Link from 'next/router';
import { client } from '../../lib/sanity/client';
import Image from 'next/image';
import BlockContent from '@sanity/block-content-to-react';
import Footer from '../../components/Footer';
import { projectQuery } from '../../lib/sanity/projectQuery';
import urlFor from '../../lib/sanity/urlFor';
import { motion } from 'framer-motion';

export default function PortfolioPost({ project }) {
  const {
    title,
    publishedAt,
    description,
    body,
    slug,
    technology,
    mainImage,
    mainImage2,
    images,
    url,
    github,
  } = project;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='z-20 w-full h-full px-4 py-8 m-auto mt-24 mb-16 sm:mt-16 sm:px-6 lg:px-8'
    >
      <div className='relative bg-white '>
        <div className='relative px-4 pt-12 pb-16 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2 '>
          <div className='relative hidden w-full lg:h-full lg:block '>
            {mainImage2 && (
              <Image
                src={`${urlFor(mainImage2).width(600).height(1080)}`}
                alt='Main image for page'
                quality={80}
                layout='fill'
                priority={true}
                // placeholder='blur'
                objectFit='cover'
              />
            )}
          </div>

          <div className='lg:col-start-2 lg:pl-8'>
            <div className='mx-auto text-base max-w-prose lg:max-w-lg lg:ml-auto lg:mr-0'>
              <div className='flex flex-row justify-between lg:block'>
                <div className='flex flex-col'>
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
                        {tech.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <ul className='space-y-4'>
                <li>
                  <a
                    className='px-3 py-1 transition-all duration-200 ease-linear border hover:bg-gray-900 hover:text-white '
                    href={url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    Live Site
                  </a>
                </li>
                <li className='mt-1'>
                  <a
                    className='px-3 py-1 transition-all duration-200 ease-linear border hover:bg-gray-900 hover:text-white'
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
                {images &&
                  images.map((item) => {
                    return (
                      <div className='relative w-full h-72' key={item._key}>
                        <Image
                          src={`${urlFor(item).width(500).height(400)}`}
                          alt='Other image for page'
                          quality={70}
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

export async function getServerSideProps({ params }) {
  let slug;
  const project = await client.fetch(projectQuery, { slug: params.slug });
  return {
    props: {
      project,
    },
  };
}

PortfolioPost.getLayout = function getLayout(page) {
  return (
    <Layout title='icld.io' description='icld.io'>
      <Header />
      {page}
      <Footer />
    </Layout>
  );
};
