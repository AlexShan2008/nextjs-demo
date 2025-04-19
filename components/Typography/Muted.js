// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @mui/material components
import { styled } from '@mui/material/styles';

import styles from '@/styles/jss/material-kit-react/components/typographyStyle.js';

const StyledDiv = styled('div')(({ _theme }) => ({
  ...styles.defaultFontStyle,
  ...styles.mutedText,
}));

export default function Muted(props) {
  const { children } = props;
  return <StyledDiv>{children}</StyledDiv>;
}

Muted.propTypes = {
  children: PropTypes.node,
};
