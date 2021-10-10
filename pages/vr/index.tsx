import React, { useEffect } from 'react';
import Head from 'next/head';
import start from '../../utils/vr';

import styles from '@/styles/VR.module.scss';

function VR(): JSX.Element {
  useEffect(() => {
    start();
  }, []);

  return (
    <div className={styles.root}>
      <Head>
        <title>Next.js VR</title>
      </Head>

      <div id="vrApp"></div>
    </div>
  );
}

export default VR;
