import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/dist/client/router';
import { Fragment, useRef, useState } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import { useModalStore } from '../../lib/zustand/store';

export default function UserModal() {
  const router = useRouter();
  const { modalOpen, setModalOpen } = useModalStore();
  const { user, error, isLoading } = useUser();

  const cancelButtonRef = useRef(null);

  const [canSubmit, setCanSubmit] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setCanSubmit(true);
  };

  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={() => setModalOpen(false)}
      >
        <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
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
            <div className='inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
              <div>
                <div className='flex items-center justify-center w-20 h-20 mx-auto overflow-hidden bg-yellow-300 rounded-full'>
                  <Image
                    src={user?.picture}
                    alt='The profile image of the current user'
                    width={50}
                    height={50}
                  ></Image>
                </div>
                <div className='mt-3 text-center sm:mt-5'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Welcome
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-800'>{user?.name}</p>
                  </div>
                </div>
              </div>

              {/* Message Form */}
              <div className='flex flex-col items-center justify-center w-full'>
                <form
                  method='POST'
                  netlify-data='true'
                  netlify-honeypot='secret-field'
                  // onSubmit={() => handleSubmit()}
                  name='hello'
                  action='/'
                  className='flex flex-col items-center justify-center w-full'
                >
                  <input type='hidden' name='form-hello' value='hello' />
                  {/* <input type='hidden' name='email' value={user?.email} />
                  <input type='hidden' name='name' value={user?.name} /> */}
                  <textarea
                    id='message'
                    name='message'
                    placeholder='Say Hi! I will get right back to you!'
                    className='w-full h-32 px-3 py-1 mt-4 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                  />
                  <button
                    type='submit'
                    className='px-6 py-2 mt-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600'
                  >
                    Send it off!
                  </button>
                </form>
              </div>

              <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                <button
                  type='button'
                  className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                  onClick={async () => {
                    await router.push('/api/auth/logout');
                    setModalOpen(false);
                  }}
                >
                  Logout
                </button>
                <button
                  type='button'
                  className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                  onClick={() => setModalOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
