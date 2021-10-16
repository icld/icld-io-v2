import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '@auth0/nextjs-auth0';
import axios from 'axios';

function MessageForm() {
  const { user, error, isLoading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  async function onSubmitForm(values) {
    console.log(values);

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
      console.log(response);
      if (response.status == 200) {
        reset();
        console.log('Success');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <form
        method='POST'
        onSubmit={handleSubmit(onSubmitForm)}
        name='hello'
        // action='/'
        className='flex flex-col items-center justify-center w-full'
      >
        <input
          {...register('email')}
          type='type'
          name='email'
          value={user?.email}
        />
        <input
          type='type'
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
          className='px-6 py-2 mt-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600'
        >
          Send it off!
        </button>
      </form>
    </div>
  );
}

export default MessageForm;
