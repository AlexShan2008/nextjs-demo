// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @mui/material components
import { styled } from '@mui/material/styles';

import styles from '@/styles/jss/material-kit-react/components/typographyStyle.js';

const StyledSmall = styled('small')(({ _theme }) => ({
  ...styles.defaultFontStyle,
  ...styles.smallText,
}));

export default function Small(props) {
  const { children } = props;
  return <StyledSmall>{children}</StyledSmall>;
}

Small.propTypes = {
  children: PropTypes.node,
};
