// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @mui/material components
import { styled } from '@mui/material/styles';

import styles from '@/styles/jss/material-kit-react/components/typographyStyle.js';

const StyledDiv = styled('div')(({ _theme }) => ({
  ...styles.defaultFontStyle,
  ...styles.warningText,
}));

export default function Warning(props) {
  const { children } = props;
  return <StyledDiv>{children}</StyledDiv>;
}

Warning.propTypes = {
  children: PropTypes.node,
};
