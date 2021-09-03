import Link from 'next/link';
import { useRouter } from 'next/router';

export default function () {
  const router = useRouter();
  return (
    <>
      <div>
        <Link href='/about'>
          <a
            className={`text-black  
             ${
               router.pathname == '/' ? 'text-red-400' : null
               //    or could just null
             }`}
          >
            About{' '}
          </a>
        </Link>
      </div>
    </>
  );
}
