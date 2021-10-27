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
      <motion.div
        // variants={messageOpen}
        // initial={{ scaleY: scaleY, display: 'hidden' }}
        // animate={{ scaleY: scaleY }}
        className='flex flex-col items-center justify-center w-full'
      >
        {messageSent ? (
          <h1 className='mt-4 text-3xl text-center text-gray-800 font-another'>
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
              {...register('message', {
                required: { value: true, message: 'Please enter a message' },
                minLength: {
                  value: 20,
                  message: 'Please say a little more...',
                },
              })}
              id='message'
              name='message'
              placeholder='Say Hi! I will get right back to you!'
              className='w-full h-32 px-3 py-1 mt-4 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            />
            {errors.message && (
              <span className='p-2 text-2xl text-red-500 font-another'>
                {errors.message.message}
              </span>
            )}
            <button
              {...register('submit')}
              type='submit'
              className='px-6 py-2 mt-2 text-lg text-white duration-200 bg-gray-600 border-0 rounded outline-none resize-none font-another focus:outline-none hover:bg-gray-500 hover:scale-110 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
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
