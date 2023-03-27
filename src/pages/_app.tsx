import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type {
  ReactElement,
  ReactNode
} from 'react';

import { Global, css } from '@emotion/react';
import Layout from '../ui/layouts/MainLayout';

export type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

export default function MyApp(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;

  /* use the layout defined at the page level, if available, if not then use default layout */
  const getLayout = Component.getLayout ?? ((page: ReactElement) => (<Layout>{page}</Layout>));

  return getLayout(
    <>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
            background-color: #fafafa;
            overflow: auto !important;
            padding-right: 0 !important;
          }
          * {
            box-sizing: border-box;
          }
        `}
      />
      <Component {...pageProps} />
    </>
  );
}
