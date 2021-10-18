import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useModalStore } from '../../lib/zustand/store';
import UserModal from './UserModal';
export default function Avatar() {
  const { user, error, isLoading } = useUser();
  const { modalOpen, setModalOpen } = useModalStore();
  // console.log(user);
  const router = useRouter();
  return (
    <div
      className={` z-50 flex-shrink-0 block text-yellow-300 group font-another`}
    >
      {user ? (
        <button
          className='flex items-center'
          onClick={() => setModalOpen(true)}
        >
          <div>
            {user && (
              <img
                className='inline-block w-12 h-12 rounded-full'
                src={user?.picture}
                alt=''
              />
            )}
          </div>
          <div className='ml-3'>
            <p className='text-xl font-medium group-hover:text-gray-200'>
              {user?.nickname}
            </p>
            <p className='text-lg font-medium group-hover:text-gray-200'>
              {isLoading ? 'loading' : error ? 'error' : !user && 'Log in'}
            </p>
          </div>
        </button>
      ) : (
        <a
          href={user ? null : '/api/auth/login'}
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
