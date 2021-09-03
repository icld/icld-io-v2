import { Link } from './Link';
import { useRouter } from 'next/router';

export default function (props) {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center w-full overflow-hidden font-another group'>
      <Link
        href={`/portfolio/${props.slug}`}
        // onClick={() => router.push(`/portfolio/${props.slug}`)}
        className='flex flex-col w-full h-full overflow-hidden transition-all duration-500 transform bg-transparent border-2 border-gray-100 cursor-pointer group lg:max-w-3xl'
      >
        {' '}
        <div className='flex flex-col items-center text-3xl'>
          <h1 className='text-lg text-left text-blue-700 font md:text-xl lg:text-2xl '>
            {props.title}
          </h1>

          <img
            className='mb-2 transition-all duration-500 group-hover:scale-105'
            src={props.image}
            alt={props.title}
          />
        </div>
      </Link>
    </div>
  );
}
