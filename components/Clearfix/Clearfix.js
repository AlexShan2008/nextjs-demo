// @mui/material components
import { styled } from '@mui/material/styles';

import styles from '@/styles/jss/material-kit-react/components/clearfixStyle.js';

const StyledDiv = styled('div')(({ _theme }) => ({
  ...styles.clearfix,
}));

export default function Clearfix() {
  return <StyledDiv />;
}

Clearfix.propTypes = {};
