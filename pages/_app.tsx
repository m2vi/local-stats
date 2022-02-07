import '@styles/globals.css';
import 'nprogress/nprogress.css';
import 'tailwindcss/tailwind.css';
import Router from 'next/router';
import nProgress from 'nprogress';
import _app from '@components/pages/_app';

Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done());

const MyApp = _app;

export default MyApp;
