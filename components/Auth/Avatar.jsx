import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useModalStore } from '../../lib/zustand/store';
import UserModal from './UserModal';
export default function Avatar() {
  const { user, error, isLoading } = useUser();
  const { modalOpen, setModalOpen } = useModalStore();
  const router = useRouter();
  return (
    <div
      className={`  flex-shrink-0  text-yellow-300 group font-another  px-4 py-2 flex items-center justify-center rounded-md bg-opacity-50       transition  duration-300 hover:scale-110 ${
        router.pathname == '/' && 'bg-gray-600 hover:bg-opacity-60 shadow-2xl '
      } `}
    >
      {user ? (
        <button
          className='flex items-center overflow-visible transition duration-500 group-hover:scale-110 '
          onClick={() => setModalOpen(true)}
        >
          <div>
            {user && (
              <Image
                className='inline-block w-8 h-8 overflow-visible rounded-full '
                src={user?.picture}
                width={32}
                height={32}
                alt='Logged in user avatar'
              />
            )}
          </div>
          <div className='ml-3'>
            <p className='overflow-visible text-xl font-medium transition-transform duration-300 group-hover:text-yellow-200 group-hover:scale-125'>
              {user?.nickname}
            </p>
            <p className='text-lg font-medium group-hover:text-gray-200'>
              {isLoading ? 'loading' : error ? 'error' : !user && 'Log in'}
            </p>
          </div>
        </button>
      ) : (
        <a
          href={user ? null : `/api/auth/login?returnTo=${router.asPath}`}
          onClick={() => user && setOpenModal(true)}
          className='text-lg'
        >
          Login
        </a>
      )}
      <UserModal />
    </div>
  );
}
