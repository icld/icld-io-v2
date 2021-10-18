import moment from 'moment';
import Image from 'next/image';

function Comment({ comment }) {
  return (
    <div>
      <li key={comment?.id} className='relative flex flex-row w-full'>
        <div className='relative pb-8'>
          <span
            className='absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200'
            aria-hidden='true'
          />
          <div className='relative flex items-start space-x-3'>
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

            <div className='flex-1 min-w-0'>
              <div>
                <div className='text-sm'>
                  <a href='#' className='font-medium text-gray-900'>
                    {comment?.name}
                  </a>
                </div>
                <p className='mt-0.5 text-sm text-gray-500'>
                  Commented {moment(comment.publishedAt).fromNow()}
                </p>
              </div>
              <div className='mt-2 text-sm text-gray-700'>
                <p>{comment.comment}</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Comment;
