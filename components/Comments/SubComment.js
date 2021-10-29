import moment from 'moment';
import Image from 'next/image';

function SubComment({ comment, length, index }) {
  return (
    <div>
      <li className='relative flex flex-row w-full'>
        <div className='relative pb-8'>
          {/* Remove the vertical line if comment is last in array */}
          {length === index + 1 ? null : (
            <span
              className='absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200'
              aria-hidden='true'
            />
          )}

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
                  <h3 className='font-medium text-gray-900'>{comment?.name}</h3>
                </div>
                <p className='mt-0.5  text-xs  text-gray-400'>
                  Commented {moment(comment.publishedAt).fromNow()}
                </p>
              </div>
              <div className='mt-2 text-sm text-gray-700'>
                <p>{comment?.subComment}</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}

export default SubComment;
