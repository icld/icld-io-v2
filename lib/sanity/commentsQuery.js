import groq from 'groq';

export const commentsQuery = groq`
*[_type=='comment' && references($id)][] | order(publishedAt desc){
   comment,
   email, 
   name,
   photoUrl,
   publishedAt,
   _id
  }
`;
