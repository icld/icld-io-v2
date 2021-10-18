import { useState, useEffect, Fragment, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { useUser } from '@auth0/nextjs-auth0';
import { useCommentStore } from '../../lib/zustand/store';
import { client, getClient } from '../../lib/sanity/client';
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
  console.log(user);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const params = { id: _id };
  const query = `*[_type=='comment' && references($id)]{
   comment,
   email, 
   name,
   photoUrl,
   publishedAt
  }`;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='relative w-full px-4 py-8 mx-auto lg:py-16 max-w-7xl sm:px-6 lg:px-8'
    >
      <div className='relative flex flex-col items-center w-full m-auto'>
        <h1 className='text-3xl prose font-another place-self-start'>
          {title}
        </h1>
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
        <div className='prose'>
          <BlockContent blocks={body}></BlockContent>
        </div>
      </div>
      <div className='relative flex flex-col w-full'>
        <CommentList commentss={comments} _id={_id} />
        {!commentFormOpen && (
          <button
            onClick={
              user
                ? () => setCommentFormOpen(true)
                : () => router.push('/api/auth/login')
            }
            className='p-2 pl-5 pr-5 text-lg text-gray-100 bg-blue-500 border-blue-300 rounded-lg focus:border-4'
          >
            Add a comment
          </button>
        )}
        <Transition.Root
          appear
          show={commentFormOpen}
          as={Fragment}
          onClose={() => setCommentFormOpen(false)}
        >
          <Dialog className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
              <Transition.Child
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Dialog.Overlay className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
              </Transition.Child>
              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className='hidden sm:inline-block sm:align-middle sm:h-screen'
                aria-hidden='true'
              >
                &#8203;
              </span>
              <Transition.Child
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <div>
                  <AddCommentForm _id={_id} />
                </div>
                <button
                  type='button'
                  className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                  onClick={() => setFormOpen(false)}
                  ref={ref}
                >
                  Cancel
                </button>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        {/* {user && commentFormOpen && <AddCommentForm _id={id} />} */}
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

// export async function getStaticPaths() {
//   const paths = await client.fetch(
//     groq`*[_type == "post" && defined(slug.current)][].slug.current`
//   );

//   return {
//     paths: paths.map((slug) => ({ params: { slug } })),
//     fallback: true,
//   };
// }

// export const getServerSideProps = async (pageContext) => {
//   const pageSlug = pageContext.query.slug;
//   // console.log(pageSlug);

//   if (!pageSlug) {
//     return {
//       notFound: true,
//     };
//   }

//   const query = encodeURIComponent(
//     `*[ _type == "post" && slug.current == "${pageSlug}" ]`
//   );

//   const url = `https://jwuejy9w.api.sanity.io/v1/data/query/production?query=${query}`;

//   const result = await fetch(url).then((res) => res.json());
//   const post = result.result[0];

//   //   console.log(post);

//   if (!post) {
//     return {
//       notFound: true,
//     };
//   } else {
//     return {
//       props: {
//         id: post._id,
//         body: post.body,
//         title: post.title,
//         image: post.mainImage,
//         author: post.author,
//       },
//     };
//   }
// };

Post.getLayout = function getLayout(page) {
  return (
    <Layout title='icld.io' description='icld.io'>
      <Header />
      {page}
      <Footer />
    </Layout>
  );
};
