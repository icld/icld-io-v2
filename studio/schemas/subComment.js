export default {
  name: 'subComment',
  type: 'document',
  title: 'Sub Comment',
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'email',
      type: 'string',
    },
    {
      name: 'subComment',
      type: 'text',
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'comment',
      type: 'reference',
      to: [{ type: 'comment' }],
    },

    {
      name: 'photoUrl',
      title: 'Photo Url',
      type: 'text',
    },
  ],
  preview: {
    select: {
      name: 'name',
      subComment: 'comment',
      comment: 'comment.title',
    },
    prepare({ name, comment, subComment }) {
      return {
        title: `${name} on ${comment}`,
        subtitle: subComment,
      };
    },
  },
};
