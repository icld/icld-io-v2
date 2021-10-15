import { useUser } from '@auth0/nextjs-auth0';

export default function Avatar() {
  const { user, error, isLoading } = useUser();
  //   console.log(user);

  return (
    <a
      href={user ? '/api/auth/logout' : '/api/auth/login'}
      className='absolute z-50 flex-shrink-0 block text-white group'
    >
      <div className='flex items-center'>
        <div>
          <img
            className='inline-block rounded-full h-9 w-9'
            src={user?.picture}
            alt=''
          />
        </div>
        <div className='ml-3'>
          <p className='text-sm font-medium group-hover:text-gray-200'>
            {user?.nickname}
          </p>
          <p className='text-xs font-medium group-hover:text-gray-200'>
            {isLoading
              ? 'loading'
              : error
              ? 'error'
              : !user
              ? 'Log in'
              : 'logout'}
          </p>
        </div>
      </div>
    </a>
  );
}
