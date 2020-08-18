import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Button } from 'antd';
import styles from '../../styles/Demo.module.css';
import { withTranslation, Link } from '../../i18n';

function Demo({ t }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Head>
        <title>Next.js Demo</title>
      </Head>

      <main className={styles.root}>
        <Link href="/">
          <a>
            <Button>{t('back-to-home')}</Button>
          </a>
        </Link>

        <div className={styles.content}>
          <p>You clicked {count} times</p>

          <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
      </main>
    </div>
  );
}

Demo.getInitialProps = async () => ({
  namespacesRequired: ['demo'],
});

Demo.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('demo')(Demo);
