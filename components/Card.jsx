import { Link } from './Link';
import { useRouter } from 'next/router';

export default function (props) {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center w-full '>
      <Link
        href={`/portfolio/${props.slug}`}
        // onClick={() => router.push(`/portfolio/${props.slug}`)}
        className='flex flex-col w-full h-full overflow-hidden transition-all duration-500 transform bg-transparent cursor-pointer group lg:max-w-3xl '
      >
        <div className='flex items-center justify-center p-4 '>
          <div className=''>
            <img
              className='transition-all duration-500 transform border-2 hover:shadow-2xl hover:scale-105 '
              src={props.image}
              alt={props.title}
            />
          </div>
        </div>
        <div className='flex justify-between p-6'>
          <div className='flex items-center space-x-4 transition-all duration-500 transform group-hover:text-shadow-xl group-hover:scale-105'>
            <h1 className='text-2xl font-bold text-gray-900'>{props.title}</h1>
          </div>
          <div className='flex items-center space-x-6'></div>
        </div>
      </Link>
    </div>
  );
}
