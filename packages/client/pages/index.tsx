import React from 'react';
import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { Layout } from '@Components';

import styles from '@Styles/Home.module.scss';

type HomeComponent = NextPage & { getLayout(page: ReactElement): ReactElement };

const Home: HomeComponent = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home | Maya BoilerPlate</title>
      </Head>
      <div className={styles.header}>Hello!</div>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;
