import { useState, useEffect } from 'react';

import Avatar from '../Auth/Avatar';

import Comment from './Comment';
import CommentField from './CommentField';
import Divider from '../SmallComponents/Divider';
import { client } from '../../lib/sanity/client';
import { commentsQuery } from '../../lib/sanity/commentsQuery';

function CommentList({ _id, commentss }) {
  const [comments, setComments] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const params = { id: _id };
    setComments(await client.fetch(commentsQuery, params));
    // setLength(comments?.length || 0);
    const subscription = client
      .listen(commentsQuery, params)
      .subscribe((update) => {
        const comment = update.result;
        setComments((item) =>
          [
            ...item.filter((item) => item._id !== update.result._id),
            comment,
          ].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
        );
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [_id]);

  return (
    <div className='flow-root w-4/5 mx-auto'>
      <div className='flex flex-row items-end justify-between p-2'>
        <h4 className='font-another '> {comments?.length} Comments</h4>
        <Avatar />
      </div>
      <Divider />
      <CommentField _id={_id} length={comments?.length} />

      {/* Comments List */}
      <ul role='list' className='w-full -mb-8 divide-y divide-gray-200'>
        {comments &&
          comments.map((item, i) => {
            return (
              <div key={item._id}>
                <Comment
                  comment={item}
                  length={comments?.length}
                  index={i}
                  parentCommentId={item._id}
                  _id={_id}
                />
              </div>
            );
          })}
      </ul>
    </div>
  );
}

export default CommentList;
