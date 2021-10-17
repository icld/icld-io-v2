import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useModalStore } from '../../lib/zustand/store';
import UserModal from './UserModal';
export default function Avatar() {
  const { user, error, isLoading } = useUser();
  const { modalOpen, setModalOpen } = useModalStore();
  // console.log(user);
  return (
    <div className='absolute z-50 flex-shrink-0 block p-4 text-yellow-300 group font-another'>
      {user ? (
        <button
          className='flex items-center'
          onClick={() => setModalOpen(true)}
        >
          <div>
            {user && (
              <img
                className='inline-block rounded-full h-9 w-9'
                src={user?.picture}
                alt=''
              />
            )}
          </div>
          <div className='ml-3'>
            <p className='text-sm font-medium group-hover:text-gray-200'>
              {user?.nickname}
            </p>
            <p className='text-xs font-medium group-hover:text-gray-200'>
              {isLoading ? 'loading' : error ? 'error' : !user && 'Log in'}
            </p>
          </div>
        </button>
      ) : (
        <a
          href={user ? null : '/api/auth/login'}
          onClick={() => user && setOpenModal(true)}
          className=''
        >
          Login
        </a>
      )}
      <UserModal />
    </div>
  );
}
