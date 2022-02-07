import Full from '@components/Full';
import { AppProps } from 'next/app';
import Head from 'next/head';

const _app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Local Stats</title>
      </Head>
      <Full className='h-screen w-screen flex items-center justify-center'>
        <Full className='px-120 h-screen w-full max-w-screen-2xl'>
          <Component {...pageProps} />
        </Full>
      </Full>
    </>
  );
};

export default _app;
