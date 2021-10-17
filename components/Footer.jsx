import {
  ImInstagram,
  ImKeyboard,
  ImTwitter,
  ImGithub,
  ImLinkedin,
} from 'react-icons/im';

export default function Footer() {
  return (
    <footer className='bg-white '>
      <div className='bottom-0 px-4 py-12 mx-auto max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-8'>
        <div className='flex justify-center space-x-6 md:order-2'>
          <a href='https://github.com/icld'>
            <ImGithub className='text-2xl text-gray-400 md:text-3xl hover:text-gray-500' />
          </a>
          <a href='https://www.instagram.com/ll_ic_ll/?hl=en'>
            <ImInstagram className='text-2xl text-gray-400 md:text-3xl hover:text-gray-500' />
          </a>
          <a href='https://twitter.com/IanLyles'>
            <ImTwitter className='text-2xl text-gray-400 md:text-3xl hover:text-gray-500' />
          </a>
          <a href='https://www.linkedin.com/in/ian-lyles-a9972668/'>
            <ImLinkedin className='text-2xl text-gray-400 md:text-3xl hover:text-gray-500' />
          </a>
        </div>

        <div className='mt-8 md:mt-0 md:order-1'>
          <p className='text-xl text-center text-gray-400 md:text-2xl '>
            &copy; 2021{' '}
            <a
              href='https://icld.io'
              className='text-gray-700 hover:text-red-600'
            >
              icld.io
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
