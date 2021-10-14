import { useState } from 'react';
import { supabase } from '../../lib/supabase/supabaseClient';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');

  //   const handleLogin = async () => {
  //     try {
  //       setLoading(true);
  //       const { user, session, error } = await supabase.auth.signIn(
  //         {
  //           provider: 'github',
  //         },
  //         { redirectTo: 'https://localhost:3000/auth' }
  //       );
  //       console.log(user);
  //       setUser(user);
  //       if (error) throw error;
  //     } catch (error) {
  //       alert(error.error_description || error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  async function signInWithGithub() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'github',
    });
    setUser(user);
    setSession(session);
  }

  return (
    <div className='flex row flex-center'>
      <div className='col-6 form-widget'>
        <h1 className='header'>Supabase + Next.js</h1>
        <p className='description'>Sign in via github</p>

        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              signInWithGithub();
            }}
            className=''
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Sign in'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
