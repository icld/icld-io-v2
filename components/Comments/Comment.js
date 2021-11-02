import { useState, useEffect } from 'react';
import moment from 'moment';
import Image from 'next/image';
import { client } from '../../lib/sanity/client';
import SubCommentField from './SubCommentField';
import SubComment from './SubComment';
import { subCommentQuery } from '../../lib/sanity/subCommentQuery';

function Comment({ comment, length, index, parentCommentId }) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [comments, setComments] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (comment.subComment) {
      const params = { id: parentCommentId };
      setComments(await client.fetch(subCommentQuery, params));
      const subscription = client
        .listen(subCommentQuery, params)
        .subscribe((update) => {
          // console.log(update.result);
          const comment = update.result;
          setComments((item) =>
            [
              ...item.filter((item) => item._id !== update.result._id),
              comment,
            ].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
          );
        });
    }

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className='relative flex flex-row w-full '>
        <div className='relative pb-8 '>
          {/* Remove the vertical line if comment is last in array */}
          {length === index + 1 ? null : (
            <span
              className='absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200'
              aria-hidden='true'
            />
          )}

          <div className='relative flex items-start space-x-3 '>
            <div className='relative'>
              <div className='flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-400 rounded-full ring-8 ring-white'>
                <Image
                  src={comment.photoUrl || '/rainbow-flag-3921.png'}
                  height={40}
                  width={40}
                  alt='user image'
                />
              </div>
            </div>

            <div className='flex-1 w-full min-w-0 '>
              <div className=''>
                <div className='text-sm '>
                  <a href='#' className='font-medium text-gray-900'>
                    {comment?.name}
                  </a>
                </div>
                <p className='mt-0.5 text-xs text-gray-400'>
                  Commented {moment(comment.publishedAt).fromNow()}
                </p>
                <div className='mt-2 text-sm text-gray-700'>
                  <p>{comment.comment}</p>
                </div>
              </div>
              {replyOpen ? (
                <div className='flex flex-row items-center justify-center mt-4'>
                  <SubCommentField _id={parentCommentId} comment={comment} />
                  <button
                    onClick={() => setReplyOpen(false)}
                    className='text-xs text-blue-300'
                  >
                    close
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setReplyOpen(true)}
                  className='py-2 mt-1 mb-3 text-xs text-blue-400 font-another hover:scale-110'
                >
                  reply
                </button>
              )}
              {comments?.length > 0 &&
                comments.map((c, i) => (
                  <SubComment
                    comment={c}
                    key={i}
                    length={comment.subComment.length}
                    index={i}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
