import groq from 'groq';

export const subCommentQuery = groq`
*[_type=='subComment' && references($id)][] | order(publishedAt desc){
   subComment,
   email, 
   name,
   photoUrl,
   publishedAt,
   _id,
  
  }
`;
