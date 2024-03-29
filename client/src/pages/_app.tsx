import { NextHead } from '@/components/next-head';
import { store } from '@/redux/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextHead title="Dashboard" favicon="/favicon.png" />

      <Provider store={store}>
        <div className={`${inter.className}`}>
          <Component {...pageProps} />
        </div>
      </Provider>
    </>
  );
}
