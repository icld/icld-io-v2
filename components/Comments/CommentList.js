import { useState } from 'react';
import Image from 'next/image';
import { client } from '../../lib/sanity/client';

function CommentList({ comments }) {
  // const [updatedComments, setUpdatedComments]= useState()
  // console.log(comments);
  return (
    <div className='relative '>
      <h4 className='font-another'>Comments:</h4>
      <ul className='relative flex flex-col items-center justify-center w-full mt-2 '>
        {comments.map((comment) => (
          <li
            key={comment?.id}
            className='flex flex-col w-full p-2 border border-dashed'
          >
            <div className='flex flex-row items-center justify-between'>
              <div className='relative w-8 h-8 overflow-hidden rounded-full'>
                {comment.photoUrl && (
                  <Image
                    src={comment?.photoUrl}
                    alt='user image'
                    layout='fill'
                    objectFit='cover'
                  />
                )}
              </div>
              <h2>{comment?.name}</h2>
            </div>
            <p> {comment?.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
