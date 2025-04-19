// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @mui/material components
import { styled } from '@mui/material/styles';

import styles from '@/styles/jss/material-kit-react/components/badgeStyle.js';

const StyledSpan = styled('span')(({ _theme }) => ({
  ...styles.badge,
  '&.primary': styles.primary,
  '&.warning': styles.warning,
  '&.danger': styles.danger,
  '&.success': styles.success,
  '&.info': styles.info,
  '&.rose': styles.rose,
  '&.gray': styles.gray,
}));

export default function Badge(props) {
  const { color, children } = props;
  return <StyledSpan className={color}>{children}</StyledSpan>;
}

Badge.defaultProps = {
  color: 'gray',
};

Badge.propTypes = {
  color: PropTypes.oneOf(['primary', 'warning', 'danger', 'success', 'info', 'rose', 'gray']),
  children: PropTypes.node,
};
