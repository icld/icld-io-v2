import groq from 'groq';

export const projectQuery = groq`
*[_type == "portfolio"&& slug.current == $slug][0]{
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
 
    "slug": slug.current,
    "technology":   technology[]->{title, "slug": slug.current, icon},
mainImage,
mainImage2,
images,
url,
github,

  }
`;
