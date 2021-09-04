import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import Link from 'next/router';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import Footer from '../../components/Footer';

export default function PortfolioPost({
  title,
  body,
  image,
  siteUrl,
  technology,
  images,
  github,
  image2,
}) {
  //   console.log(imagesUrls);
  //   console.log(imageUrl);

  const [imageUrl, setImageUrl] = useState('');
  const [mappedImages, setMappedImages] = useState([]);
  const [img, setImg] = useState(images);
  const [image2Url, setImage2Url] = useState('');

  useEffect(() => {
    const imageBuilder = imageUrlBuilder({
      projectId: 'jwuejy9w',
      dataset: 'production',
    });
    setMappedImages(() =>
      img.map((image, i) => {
        return {
          image: imageBuilder.image(image),
          // .width(700).height(500),
        };
      })
    );

    setImageUrl(imageBuilder.image(image));
    setImage2Url(imageBuilder.image(image2));
  }, [image, images, img, image2]);

  useEffect(() => {
    console.log(mappedImages);
  });

  return (
    <div className='relative mx-auto max-w-7xl lg:px-8'>
      <div className='relative bg-white '>
        <div className='relative px-4 pt-12 pb-16 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2 '>
          <img
            className='hidden object-cover w-full h-56 gap-2 lg:block lg:h-full'
            src={image2Url}
            alt=''
          />
          <div className='lg:col-start-2 lg:pl-8'>
            <div className='mx-auto text-base max-w-prose lg:max-w-lg lg:ml-auto lg:mr-0'>
              <div className='flex flex-row justify-between lg:block'>
                <div className='flex flex-col'>
                  <h2 className='font-semibold leading-6 tracking-wide text-red-800 uppercase'>
                    Site
                  </h2>
                  <h3 className='mt-2 mb-4 text-4xl font-extrabold leading-8 tracking-tight text-gray-900 md:text-5xl font-another'>
                    {title}
                  </h3>
                </div>
                <div className=''>
                  <ul className='mb-4 font-bold'>
                    {technology.map((tech, i) => (
                      <li
                        className='text-right text-yellow-500 lg:text-left'
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
                    href={`${siteUrl}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {console.log(github)}
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
              {/* <img
                className='block object-cover w-full mt-6 h-28 lg:hidden'
                src={image2Url}
                alt=''
              /> */}
              <div className='grid grid-rows-2 gap-6 mt-6'>
                {mappedImages.map((image, i) => (
                  <img
                    className='object-cover w-full h-full overflow-hidden'
                    alt='portfolio'
                    src={image.image}
                    key={i}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
  console.log(pageSlug);

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

  console.log(post);

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
        url: post.siteUrl || null,
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
