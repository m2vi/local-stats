import Full from '@components/Full';
import { AppProps } from 'next/app';
import Head from 'next/head';

const _app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Local Stats</title>
      </Head>
      <Full className='h-screen w-screen overflow-y-auto '>
        <div className='px-120 h-full w-full max-w-screen-2xl my-6'>
          <Component {...pageProps} />
        </div>
      </Full>
    </>
  );
};

export default _app;
