import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { useCommentStore } from '../../lib/zustand/store';

export default function AddCommentForm({ _id }) {
  const router = useRouter();
  const [formData, setFormData] = useState();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { commentFormOpen, setCommentFormOpen } = useCommentStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    let response;
    setFormData(data);
    try {
      response = await fetch('/api/addComment', {
        method: 'POST',
        body: JSON.stringify(data),
        type: 'application/json',
      });
      setIsSubmitting(false);
      setHasSubmitted(true);
      setCommentFormOpen(false);
      refreshData();
    } catch (err) {
      setFormData(err);
    }
  };

  if (isSubmitting) {
    return <h3>Submitting comment…</h3>;
  }
  if (hasSubmitted) {
    return (
      <>
        <h3>Thanks for your comment!</h3>
        <ul>
          <li>
            Name: {formData.name} <br />
            Email: {formData.email} <br />
            Comment: {formData.comment}
            {/* Url:{formData.photoUrl} */}
          </li>
        </ul>
      </>
    );
  }
  return (
    <div className='inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-xl px-4 pt-2 bg-white rounded-lg'
        disabled
      >
        <input {...register('_id')} type='hidden' name='_id' value={_id} />
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
            value={user.email ? user.email : 'no email provided'}
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
        <h2 className='px-4 pt-3 pb-2 text-lg text-gray-800'>
          Add a new comment
        </h2>
        <label className='block mb-5' htmlFor='comment'>
          <span className='text-gray-700 '>Comment</span>
          <div className='w-full px-3 mt-2 mb-2 md:w-full'>
            <textarea
              {...register('comment', { required: true })}
              name='comment'
              id='comment'
              className='w-full h-20 px-3 py-2 font-medium leading-normal placeholder-gray-700 bg-gray-100 border border-gray-400 rounded resize-none focus:outline-none focus:bg-white'
              rows='8'
              placeholder='Add your comment!'
            ></textarea>
          </div>
        </label>
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        <div className='-mr-1'>
          <button
            type='submit'
            {...register('submit')}
            className='px-4 py-1 mr-1 font-medium tracking-wide text-gray-700 bg-white border border-gray-400 rounded-lg hover:bg-gray-100'
          >
            {' '}
            Submit it!
          </button>
        </div>
      </form>
    </div>
  );
}
