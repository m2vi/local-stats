import '@styles/globals.css';
import 'nprogress/nprogress.css';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import nProgress from 'nprogress';
import Head from 'next/head';
import Full from '@components/Full';

Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Local Stats</title>
      </Head>
      <Full className='px-120 h-screen w-full max-w-screen-2xl'>
        <Component {...pageProps} />
      </Full>
    </>
  );
};

export default MyApp;
