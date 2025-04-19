import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

function Error({ statusCode }) {
  const { t } = useTranslation('common');

  return <p>{statusCode ? t('error-with-status', { statusCode }) : t('error-without-status')}</p>;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

Error.propTypes = {
  statusCode: PropTypes.number,
};

export default Error;
