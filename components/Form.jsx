import { useState } from 'react';
import styles from '../styles/Form.module.css';
import { useRouter } from 'next/router';

export default function MyForm() {
  const router = useRouter();

  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isMessage, setIsMessage] = useState(false);

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
      <form
        className=''
        onSubmit={() => handleSubmit()}
        name='contact'
        method='POST'
        netlify-data='true'
        action='/success'
      >
        <input type='hidden' name='form-name' value='contact' />
        <div className=''>
          <label hidden htmlFor='yourname'>
            Your Name:
          </label>{' '}
          <br />
          <input
            className=''
            placeholder='what is your name?'
            type='text'
            name='name'
            id='name'
          />
          {/* <input type='text' name='name' id='yourname' /> */}
        </div>
        <div className=''>
          <label hidden htmlFor='youremail'>
            Your Email:
          </label>{' '}
          <br />
          <input
            placeholder='what is your email?'
            className=''
            type='email'
            name='email'
            id='youremail'
          />
        </div>
        <div className=''>
          <label hidden htmlFor='yourmessage'>
            Message:
          </label>{' '}
          <br />
          <textarea
            placeholder='what can I help you make?'
            className=''
            name='message'
            id='yourmessage'
          ></textarea>
        </div>
        <div className=''>
          <button className='' type='submit'>
            Send it off!
          </button>
        </div>
      </form>
    </div>
  );
}
