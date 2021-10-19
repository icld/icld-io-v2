import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import moment from 'moment';

import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0';
import { Input } from 'postcss';

function CommentField() {
  const [inFocus, setInFocus] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { user, error, loading } = useUser();

  async function onSubmit(values) {
    console.log(values);
    let config = {
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/addComment`,
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
    <div className='relative w-full'>
      <div className='relative pb-8'>
        <span
          className='absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200'
          aria-hidden='true'
        />
        <div className='relative flex items-start w-full space-x-3'>
          <div className='relative'>
            <div className='flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-400 rounded-full ring-8 ring-white'>
              <Image
                src={user?.picture || '/rainbow-flag-3921.png'}
                height={40}
                width={40}
                alt='user image'
              />
            </div>
          </div>

          <div className='relative w-full'>
            <div>
              <div className='text-sm'>
                <h1 className='font-medium text-gray-900 '>{user?.name}</h1>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='relative mt-2 text-sm text-gray-700'
            >
              <label className='block mb-5 sr-only' htmlFor='name'>
                <span className='text-gray-700'>Name</span>
                <input
                  type='hidden'
                  name='name'
                  id='name'
                  {...register('name', { required: true })}
                  className='block w-full mt-1 form-input'
                  value={user?.name}
                />
              </label>
              <label className='block mb-5 sr-only' htmlFor='email'>
                <span className='text-gray-700'>Email</span>
                <input
                  name='email'
                  id='email'
                  type='hidden'
                  {...register('email', { required: true })}
                  className='block w-full mt-1 form-input'
                  value={user?.email ? user.email : 'no email provided'}
                />
              </label>
              <input
                {...register('photoUrl')}
                name='photoUrl'
                id='photoUrl'
                type='hidden'
                value={`${user?.picture}`}
                className='sr-only'
              />
              <label
                onFocus={() => setInFocus(true)}
                onBlur={() => setInFocus(false)}
                className='w-full '
              >
                <textarea
                  {...register('comment', {
                    required: true,
                    minLength: {
                      value: 10,
                      message: 'Say a little please ',
                    },
                  })}
                  name='comment'
                  id='comment'
                  className={`w-full h-12 p-2 mx-auto transition-all duration-200 border resize-none ${
                    inFocus && 'h-24'
                  } `}
                  disabled={user ? false : true}
                  placeholder={
                    user ? 'Join the discussion' : 'Login to leave a comment'
                  }
                />
                <button hidden={user ? false : true} type='submit'>
                  submit
                </button>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentField;
