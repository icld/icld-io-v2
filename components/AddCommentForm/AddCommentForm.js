import { useForm } from 'react-hook-form';
import { Fragment, useState } from 'react';

export default function AddCommentForm({ _id }) {
  const [formData, setFormData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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
          </li>
        </ul>
      </>
    );
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full max-w-lg'
      disabled
    >
      <input {...register('_id')} type='hidden' name='_id' value={_id} />
      <label className='block mb-5'>
        <span className='text-gray-700'>Name</span>
        <input
          name='name'
          {...register('name', { required: true })}
          className='block w-full mt-1 form-input'
          placeholder='John Appleseed'
        />
      </label>
      <label className='block mb-5'>
        <span className='text-gray-700'>Email</span>
        <input
          name='email'
          type='email'
          {...register('email', { required: true })}
          className='block w-full mt-1 form-input'
          placeholder='your@email.com'
        />
      </label>
      <label className='block mb-5'>
        <span className='text-gray-700'>Comment</span>
        <textarea
          {...register('comment', { required: true })}
          name='comment'
          className='block w-full mt-1 form-textarea'
          rows='8'
          placeholder='Enter some long form content.'
        ></textarea>
      </label>
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      <input
        type='submit'
        className='px-4 py-2 font-bold text-white bg-purple-500 rounded shadow hover:bg-purple-400 focus:shadow-outline focus:outline-none'
      />
    </form>
  );
}
