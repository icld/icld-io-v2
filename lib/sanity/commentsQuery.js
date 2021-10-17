import groq from 'groq';

export const commentsQuery = groq`
*[_type=='comment' && references(${id})]{
   comment,
   email, 
   name,
   photoUrl
  }
`;
