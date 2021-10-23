import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import { useUser } from '@auth0/nextjs-auth0';
import { useMessageFormStore } from '../../lib/zustand/store';
import axios from 'axios';

function MessageForm() {
  const { user, error, isLoading } = useUser();
  const { messageSent, setMessageSent, messageOpen, setMessageOpen } =
    useMessageFormStore();

  const [scaleY, setScaleY] = useState(0);

  useEffect(() => {
    setMessageOpen(false);
    setMessageSent(false);
    setScaleY(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  async function onSubmitForm(values) {
    // console.log(values);

    let config = {
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/sendgrid`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: values,
    };

    try {
      const response = await axios(config);
      // console.log(response);
      if (response.status == 200) {
        reset();
        setMessageSent(true);
        // console.log('Success');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='flex flex-col '>
      {/* {messageOpen ? null : (
        <motion.button
          className='absolute self-center w-2/3 p-4 mt-4 text-lg text-white bg-yellow-400 rounded-sm font-another'
          onClick={(event) => {
            event.preventDefault();
            setScaleY(1);
            setMessageOpen(true);
          }}
        >
          Send me a message!
        </motion.button>
      )} */}
      <motion.div
        // variants={messageOpen}
        // initial={{ scaleY: scaleY, display: 'hidden' }}
        // animate={{ scaleY: scaleY }}
        className='flex flex-col items-center justify-center w-full'
      >
        {messageSent ? (
          <h1 className='mt-4 text-center'>
            {' '}
            Your message was received. I will respond shortly!
          </h1>
        ) : (
          <form
            method='POST'
            onSubmit={handleSubmit(onSubmitForm)}
            name='hello'
            // action='/'
            className='flex flex-col items-center justify-center w-full'
          >
            <input
              {...register('email')}
              type='hidden'
              name='email'
              value={user?.email}
            />
            <input
              type='hidden'
              {...register('name')}
              name='name'
              value={user?.name}
            />
            <textarea
              {...register('message')}
              id='message'
              name='message'
              placeholder='Say Hi! I will get right back to you!'
              className='w-full h-32 px-3 py-1 mt-4 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
            />
            <button
              type='submit'
              className='px-6 py-2 mt-2 text-lg text-white bg-gray-800 border-0 rounded font-another focus:outline-none hover:bg-gray-600'
            >
              Send it off!
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default MessageForm;
