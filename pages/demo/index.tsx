import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@mui/material';
import styles from '@/styles/Demo.module.scss';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Demo() {
  const [count, setCount] = useState(0);
  const { t } = useTranslation('common');

  return (
    <div className={styles.root}>
      <Head>
        <title>Next.js Demo</title>
      </Head>

      <main>
        <Link href="/" passHref>
          <Button variant="contained" color="primary">
            {t('back-to-home')}
          </Button>
        </Link>

        <div className={styles.content}>
          <p>You clicked {count} times</p>
          <Button onClick={() => setCount(count + 1)}>Click me</Button>
        </div>
      </main>

      <img className={styles.img} src="/static/cartoon.jpeg" alt="my image" />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};
