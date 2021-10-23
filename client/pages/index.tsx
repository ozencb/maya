import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '../styles/Home.module.css';

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

export default Home;
