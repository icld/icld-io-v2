import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/dist/client/router';
import { Fragment, useRef, useState } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import { useModalStore, useMessageFormStore } from '../../lib/zustand/store';

import MessageForm from './MessageForm';

export default function UserModal() {
  const router = useRouter();
  const { modalOpen, setModalOpen } = useModalStore();
  const { user, error, isLoading } = useUser();
  const { messageSent, setMessageSent, messageOpen, setMessageOpen } =
    useMessageFormStore();

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root
      show={modalOpen}
      as={Fragment}
      className='fixed inset-0 z-50 m-auto overflow-y-auto'
    >
      <Dialog
        as='div'
        className=''
        initialFocus={cancelButtonRef}
        onClose={() => setModalOpen(false)}
      >
        <div className='flex items-center justify-center h-full px-4 pt-4 pb-20 m-auto text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block w-full px-4 pt-5 pb-4 m-auto overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
              <div>
                {/* User Image */}
                <div className=''>
                  <div className='flex items-center justify-center w-20 h-20 mx-auto overflow-hidden rounded-full group '>
                    <Image
                      src={user?.picture}
                      alt='The profile image of the current user'
                      width={50}
                      height={50}
                      objectFit='cover'
                      className=' group-hover:opacity-0'
                    ></Image>
                  </div>
                </div>

                <div className='mt-1 text-center sm:mt-5 font-another'>
                  <Dialog.Title
                    as='h3'
                    className='text-2xl font-medium leading-6 text-gray-900'
                  >
                    {messageSent ? 'Nice Work,' : 'Welcome'}
                  </Dialog.Title>
                  <div className='mt-1'>
                    <p className='text-4xl font-bold text-gray-800'>
                      {user?.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Form */}
              <MessageForm />

              {/* LOGOUT BUTTON */}
              <div className='flex justify-center mt-5 sm:mt-6 sm:gap-3 '>
                <button
                  type='button'
                  className={`px-6 py-2 mt-2 text-lg text-white bg-gray-800 border-0 rounded font-another focus:outline-none hover:bg-gray-600 ${
                    messageOpen && 'hidden'
                  }`}
                  onClick={async () => {
                    await router.push('/api/auth/logout');
                    setModalOpen(false);
                  }}
                >
                  Log {user?.nickname} out
                </button>
              </div>

              <button
                type='button'
                className='fixed top-4 font-5xl '
                onClick={() => setModalOpen(false)}
                ref={cancelButtonRef}
              >
                X
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
