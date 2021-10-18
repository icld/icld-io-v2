import { useState, useEffect } from 'react';
import Image from 'next/image';
import Divider from '../SmallComponents/Divider';
import { client } from '../../lib/sanity/client';
import { commentsQuery } from '../../lib/sanity/commentsQuery';

function CommentList({ _id, commentss }) {
  const [comments, setComments] = useState(commentss);
  console.log(comments);
  // setComments(commentss);

  useEffect(() => {
    const params = { id: _id };

    setComments(commentss);

    const subscription = client
      .listen(commentsQuery, params)
      .subscribe((update) => {
        console.log(update.result.comments);
        setComments(update.result.comments);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className='flow-root w-4/5 mx-auto'>
      <h4 className='font-another '> {comments?.length} Comments</h4>
      <Divider />

      <ul role='list' className='w-full -mb-8 divide-y divide-gray-200'>
        {comments.map((comment) => (
          <li key={comment?.id} className='relative flex flex-row w-full'>
            <div className='relative pb-8'>
              <span
                className='absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200'
                aria-hidden='true'
              />
              <div className='relative flex items-start space-x-3'>
                <div className='relative'>
                  {comment.photoUrl && (
                    <div className='flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-400 rounded-full ring-8 ring-white'>
                      <Image
                        src={comment?.photoUrl}
                        height={40}
                        width={40}
                        alt='user image'
                      />
                    </div>
                  )}
                </div>

                <div className='flex-1 min-w-0'>
                  <div>
                    <div className='text-sm'>
                      <a href='#' className='font-medium text-gray-900'>
                        {comment?.name}
                      </a>
                    </div>
                    <p className='mt-0.5 text-sm text-gray-500'>
                      Commented {comment?.publishedAt}
                    </p>
                  </div>
                  <div className='mt-2 text-sm text-gray-700'>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
