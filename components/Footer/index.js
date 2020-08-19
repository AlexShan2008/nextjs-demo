import PropTypes from 'prop-types';
import { withTranslation } from '../../i18n';
import styles from '../../styles/Home.module.css';

const Footer = ({ t }) => (
  <footer className={styles.footer}>
    <p>{t('description')}</p>
  </footer>
);

Footer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('footer')(Footer);
