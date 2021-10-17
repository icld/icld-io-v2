const sanityClient = require('@sanity/client');

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  dataset: 'production',
  apiVersion: '2021-08-29',
  token: process.env.NEXT_SANITY_W_TOKEN,
  //   token: 'sanity-auth-token', // or leave commented out to be anonymous user
  useCdn: false, // `false` if you want to ensure fresh data
});
