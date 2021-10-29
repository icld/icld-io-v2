import { client } from '../../lib/sanity/client';

export default async function createComment(req, res) {
  const { _id, name, email, subComment, photoUrl } = JSON.parse(req.body);
  try {
    await client.create({
      _type: 'subComment',
      comment: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      subComment,
      photoUrl,
      publishedAt: new Date(),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: `Couldn't submit comment`, err });
  }
  return res.status(200).json({ message: 'Comment submitted' });
}
