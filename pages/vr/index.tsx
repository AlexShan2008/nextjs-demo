import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from '@/styles/VR.module.scss';

// Dynamically import the VR component with no SSR
const VRScene = dynamic(() => import('../../components/VRScene/VRScene'), {
  ssr: false,
});

function VR(): JSX.Element {
  return (
    <div className={styles.root}>
      <Head>
        <title>Next.js VR</title>
      </Head>
      <VRScene />
    </div>
  );
}

export default VR;
