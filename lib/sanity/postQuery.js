import groq from 'groq';

export const postQuery = groq`
*[_type == "post"&& slug.current == $slug][0]{
    _id,
    title,
    publishedAt,
    description,
body[]{
    ..., 
    asset->{
      ...,
      "_key": _id
    }},
   
    "authName": author->name,
    "authImg": author->image,
    "slug": slug.current,
    "categories":   category[]->{title, slug},
mainImage,
    "comments": *[_type=='comment' && references(^._id)]{
   comment,
   email, 
   name,
   photoUrl
 }
    
  }
`;
