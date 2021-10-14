import { useState } from 'react';
import { useRouter } from 'next/router';

export default function MyForm() {
  const router = useRouter();

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
    <div className=''>
      <section className='relative text-gray-600 body-font'>
        <form
          className=''
          onSubmit={() => handleSubmit()}
          name='contact'
          method='POST'
          netlify-data='true'
          action='/'
        >
          <input type='hidden' name='form-name' value='contact' />

          <div className='absolute inset-0 bg-gray-300'>
            <iframe
              width='100%'
              height='100%'
              frameBorder='0'
              marginHeight='0'
              marginWidth='0'
              title='map'
              scrolling='no'
              src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d22452.694011252974!2d-122.75203167980088!3d45.58985654568146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1634010778305!5m2!1sen!2sus'
              style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.4)' }}
            ></iframe>
          </div>
          <div className='container flex px-5 py-24 mx-auto'>
            <div className='relative z-10 flex flex-col w-full p-8 mt-10 bg-white rounded-lg shadow-md lg:w-1/3 md:w-1/2 md:ml-auto md:mt-0'>
              <h2 className='mb-1 text-lg font-medium text-gray-900 title-font'>
                Say hey!
              </h2>
              <p className='mb-5 leading-relaxed text-gray-600'>
                Send me a note and tell me about an idea you want to build!
              </p>

              <div className='relative mb-4'>
                <label
                  htmlFor='email'
                  className='text-sm leading-7 text-gray-600'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                />
              </div>
              <div className='relative mb-4'>
                <label
                  htmlFor='message'
                  className='text-sm leading-7 text-gray-600'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  className='w-full h-32 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                ></textarea>
              </div>
              <button
                type='submit'
                className='px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600'
              >
                Send it off!
              </button>
              <p className='mt-3 text-xs text-gray-500'>
                Your information is safe. I will only use it to reply back .
              </p>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
