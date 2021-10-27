import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

//Use this to store additional state for the user before they visit the Identity Provider to login.
const getLoginState = (req, loginOptions) => {
  // console.log(loginOptions.authorizationParams.scope); // access scope
  return {}; // custom state value must be an object
};

export default handleAuth({
  async login(req, res) {
    try {
      // Pass custom parameters to login
      await handleLogin(req, res, {
        getLoginState,
        returnTo: '/blog',
      });
    } catch (error) {
      // Add your own custom error handling

      res.status(error.status || 400).end(error.message);
    }
  },
});
