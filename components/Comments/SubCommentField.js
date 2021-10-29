import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegThumbsUp } from 'react-icons/fa';

import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0';

function SubCommentField({ _id, length }) {
  const [inFocus, setInFocus] = useState(false);
  const [formData, setFormData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { user, error, loading } = useUser();
  const buttonRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    let response;
    setFormData(data);
    try {
      response = await fetch('/api/addSubComment', {
        method: 'POST',
        body: JSON.stringify(data),
        type: 'application/json',
      });
      if (response.status == 200) {
        reset();
        console.log('Success');
      }
      setIsSubmitting(false);
      setHasSubmitted(true);
      setInFocus(false);
    } catch (err) {
      setFormData(err);
    }
  };

  return (
    <div className='relative w-full'>
      <div className='relative pb-8'>
        {length >= 1 && (
          <span
            className='absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200'
            aria-hidden='true'
          />
        )}
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
              <input
                {...register('_id')}
                type='hidden'
                name='_id'
                value={_id}
              />
              <label className='block mb-5 ' htmlFor='name'>
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
                <input
                  name='email'
                  id='email'
                  type='hidden'
                  {...register('email', { required: true })}
                  className='block w-full mt-1 '
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
                htmlFor='message'
                onFocus={() => setInFocus(true)}
                onBlur={() => setInFocus(false)}
                className='w-full '
              >
                <textarea
                  {...register('subComment', {
                    required: true,
                    minLength: {
                      value: 10,
                      message: 'Say a little more, please ',
                    },
                  })}
                  name='subComment'
                  id='subComment'
                  className={`w-full h-12 p-2 mx-auto transition-all duration-200 border resize-none ${
                    inFocus && 'h-24'
                  } `}
                  disabled={user ? false : true}
                  placeholder={
                    user ? 'Join the discussion' : 'Login to leave a comment'
                  }
                />
                {errors?.comment?.message ? (
                  <span className='text-red-500 font-another'>
                    {errors.comment.message}{' '}
                  </span>
                ) : (
                  <button
                    ref={buttonRef}
                    className={` ${
                      !user && 'hidden'
                    }  flex flex-row items-center px-4 py-1 text-white bg-green-500 rounded hover:bg-green-700'
                  type='submit'`}
                  >
                    submit
                    <FaRegThumbsUp className='ml-2' />
                  </button>
                )}
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubCommentField;
