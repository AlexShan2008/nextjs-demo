import PropTypes from 'prop-types';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { i18n, Link, withTranslation } from 'i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { Button } from 'antd';

function Home({ t }): JSX.Element {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title={t('h1')} />

      <main className={styles.main}>
        <section>
          <Button
            type="primary"
            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}
          >
            {t('change-locale')}
          </Button>
        </section>

        <div className={styles.grid}>
          <Link href="/demo">
            <Button type="link">{t('to-second-page')}</Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

Home.getInitialProps = async () => ({
  namespacesRequired: ['common', 'footer'],
});

Home.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Home);
