import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import useSwr from 'swr';
// import Link from 'next/link'
import { Button } from 'antd';
import styles from '@/styles/Demo.module.scss';
import { withTranslation, Link } from 'i18n';
import { fetcher } from 'utils';

function Demo({ t }) {
  const [count, setCount] = useState(0);
  const { data, error } = useSwr('/api/users', fetcher);

  if (error) return <div>Failed to load users</div>;
  if (!data) return <div>Loading...</div>;

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

      <main>
        <h3>用户列表</h3>
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              <Link href="/user/[id]" as={`/user/${user.id}`}>
                <a>{`User ${user.id}`}</a>
              </Link>
            </li>
          ))}
        </ul>
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
