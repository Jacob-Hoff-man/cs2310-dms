import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import Head from 'next/head';
import NavBar from '../../comps/NavBar';
import Footer from '../../comps/Footer';
import theme from '../../styles/theme';

import navBarLogo from '../../../../public/assets/images/logo.png';
import metaData from '../../../../public/assets/datas/globalMetaData.json';
import questions from '../../../../public/assets/datas/qaQuestionData.json';
import getPagesRecord from '../../../helpers/questions/getPagesRecord';

type Props = {
    children: ReactNode;
}

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const name = `${new Date().getFullYear()} ${metaData.footerTitle}`;
const pages = getPagesRecord(questions);

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Head>
        <title>{metaData.headerTitle}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstarts an elegant, consisten, and simple baseline to build upon */}
        <CssBaseline />
        <header><NavBar title={metaData.navBarTitle} pages={pages} logo={navBarLogo} /></header>
        {children}
        <Footer name={name} pages={pages} />
      </ThemeProvider>
    </>
  );
}
