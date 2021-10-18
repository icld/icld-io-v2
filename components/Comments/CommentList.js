import { useState, useEffect } from 'react';

import Avatar from '../Auth/Avatar';

import Comment from './Comment';
import Divider from '../SmallComponents/Divider';
import { client } from '../../lib/sanity/client';
import { commentsQuery } from '../../lib/sanity/commentsQuery';

function CommentList({ _id, commentss }) {
  const [comments, setComments] = useState();
  console.log(comments);
  // setComments(commentss);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const params = { id: _id };
    setComments(await client.fetch(commentsQuery, params));

    const subscription = client
      .listen(commentsQuery, params)
      .subscribe((update) => {
        console.log(update.result.comments);
        setComments((items) =>
          [
            ...items.filter((item) => item._id !== update.result._id),
            update.result,
          ].sort((a, b) => (a._publishedAt > b._publishedAt ? 1 : -1))
        );
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className='flow-root w-4/5 mx-auto'>
      <div className='flex flex-row items-end justify-between p-2'>
        <h4 className='font-another '> {comments?.length} Comments</h4>
        <Avatar />
      </div>
      <Divider />
      {/* Comments List */}
      <ul role='list' className='w-full -mb-8 divide-y divide-gray-200'>
        {comments &&
          comments.map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))}
      </ul>
    </div>
  );
}

export default CommentList;
