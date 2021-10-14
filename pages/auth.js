import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/supabaseClient';
import Auth from '../components/Auth/Auth';
import Account from '../components/Auth/Account';
export default function Home() {
  const [session, setSession] = useState(null);

  console.log(session);
  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className='container' style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}
