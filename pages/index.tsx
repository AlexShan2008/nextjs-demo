import { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import type { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import styles from '@/styles/Home.module.css';

import Header from '@/components/Header/Header';
import HeaderLinks from '@/components/Header/HeaderLinks';
import Footer from '@/components/Footer/Footer';
import GridContainer from '@/components/Grid/GridContainer.js';
import GridItem from '@/components/Grid/GridItem.js';
import Parallax from '@/components/Parallax/Parallax.js';

const StyledContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

const StyledBrand = styled('div')(() => ({
  padding: '3rem 0',
  textAlign: 'center',
  '& h1': {
    fontSize: '4.2rem',
    fontWeight: '600',
    display: 'inline-block',
    position: 'relative',
  },
  '& h3': {
    fontSize: '1.313rem',
    maxWidth: '500px',
    margin: '10px auto 0',
  },
}));

const StyledLanguageButton = styled(Button)(() => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

const Home: NextPage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const toggleLocale = useCallback(async () => {
    // Prevent button double-click
    if (router.isFallback) return;

    const newLocale = locale === 'en' ? 'zh' : 'en';

    // First update the locale without page refresh
    await router.push({ pathname, query }, asPath, {
      locale: newLocale,
      shallow: true,
      scroll: false,
    });

    // Then update the translations in the background
    router.push({ pathname, query }, asPath, {
      locale: newLocale,
    });
  }, [locale, pathname, asPath, query, router]);

  return (
    <StyledContainer>
      <Head>
        <title>{t('welcome')}</title>
        <meta name="description" content="Welcome to Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        brand="NextJS Material Kit"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
      />

      <Parallax image="/static/img/bg4.jpg">
        <div>
          <GridContainer>
            <GridItem>
              <StyledBrand>
                <h1>{t('welcome')}</h1>
                <h3>A Badass Material-UI Kit based on Material Design.</h3>
              </StyledBrand>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <main className={styles.main}>
        <section>
          <StyledLanguageButton
            variant="contained"
            color="primary"
            onClick={toggleLocale}
            disabled={router.isFallback}
          >
            {t('change-locale')}
          </StyledLanguageButton>
        </section>

        <div className={styles.grid}>
          <Link href="/demo" passHref>
            <Button color="primary">{t('to-second-page')}</Button>
          </Link>
        </div>
      </main>

      <Footer />
    </StyledContainer>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
    // Add revalidation to ensure translations stay up to date
    revalidate: 3600, // revalidate every hour
  };
};

export default Home;
