import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '../styles/Home.module.scss';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Maya</title>
        <meta name="description" content="A PERN app boilerplate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>Hello!</div>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;
