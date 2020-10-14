import PropTypes from 'prop-types';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { i18n, Link, withTranslation } from 'i18n';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

import Header from '@/components/Header/Header.js';
import HeaderLinks from '@/components/Header/HeaderLinks.js';
import Footer from '@/components/Footer/Footer.js';
import GridContainer from '@/components/Grid/GridContainer.js';
import GridItem from '@/components/Grid/GridItem.js';

import Parallax from '@/components/Parallax/Parallax.js';

import { Button } from 'antd';

import homeStyles from '@/styles/jss/material-kit-react/views/components.js';

const useStyles = makeStyles(homeStyles);

function Home(props): JSX.Element {
  const t = props.t;
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome to Hello Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Header title={t('h1')} /> */}

      <Header
        brand="Hello Next.js"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
        {...rest}
      />

      <Parallax image={'/static/img/bg4.jpg'}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Hello Next.js</h1>
                <h3 className={classes.subtitle}>
                  A Badass Material-UI Kit based on Material Design.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

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
