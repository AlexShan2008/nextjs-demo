import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Button } from 'antd';
import styles from '../../styles/Demo.module.scss';
import { withTranslation, Link } from '../../i18n';

function Demo({ t }) {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.root}>
      <Head>
        <title>Next.js Demo</title>
      </Head>

      <main>
        <Link href="/">
          <a>
            <Button type="link">{t('back-to-home')}</Button>
          </a>
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

Demo.getInitialProps = async () => ({
  namespacesRequired: ['demo'],
});

Demo.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('demo')(Demo);
