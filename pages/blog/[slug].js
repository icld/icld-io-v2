import { useState, useEffect, Fragment, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { useUser } from '@auth0/nextjs-auth0';
import { useCommentStore } from '../../lib/zustand/store';
import { client } from '../../lib/sanity/client';
import { postQuery } from '../../lib/sanity/postQuery';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import CommentList from '../../components/Comments/CommentList';
import Image from 'next/image';
import BlockContent from '@sanity/block-content-to-react';
import Footer from '../../components/Footer';
import AddCommentForm from '../../components/AddCommentForm/AddCommentForm';
import urlFor from '../../lib/sanity/urlFor';
import groq from 'groq';

export default function Post({ post }) {
  const router = useRouter();
  const ref = useRef();
  const [updatedComments, setUpdatedComments] = useState();
  const { commentFormOpen, setCommentFormOpen } = useCommentStore();
  const { title, body, mainImage, _id, comments } = post;
  const { user, error, isLoading } = useUser();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='z-20 w-full h-full px-4 py-8 m-auto mt-24 mb-16 sm:mt-16 sm:px-6 lg:px-8'
    >
      <div className='flex flex-col items-center justify-center w-8/12 mx-auto'>
        <h1 className='w-full text-3xl text-left font-another'>{title}</h1>
        {mainImage && (
          <div className='relative w-full h-52'>
            <Image
              alt='blog'
              className=''
              src={`${urlFor(mainImage).width(800).height(800)}`}
              layout='fill'
              objectFit='cover'
              quality={40}
            />
          </div>
        )}
        <div className='mt-8 prose'>
          <BlockContent blocks={body}></BlockContent>
        </div>
        <div className='w-full '>
          <CommentList commentss={comments} _id={_id} />
        </div>
      </div>
    </motion.section>
  );
}

export async function getServerSideProps({ params }) {
  let slug;
  const post = await client.fetch(postQuery, {
    slug: params.slug,
  });

  return {
    props: {
      post,
    },
  };
}

Post.getLayout = function getLayout(page) {
  return (
    <Layout title='icld.io' description='icld.io'>
      <Header />
      {page}
      <Footer />
    </Layout>
  );
};
