import groq from 'groq';

export const commentsQuery = groq`
*[_type=='comment' && references($id)][] | order(publishedAt desc){
   comment,
   email, 
   name,
   photoUrl,
   publishedAt,
   _id,
  "subComment": *[_type=='subComment' && references(^._id)] {
   subComment,
   email, 
   name,
   photoUrl
 }
  }
`;
