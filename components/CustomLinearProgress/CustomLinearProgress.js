// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @mui/material components
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

import styles from '@/styles/jss/material-kit-react/components/customLinearProgressStyle.js';

const StyledLinearProgress = styled(LinearProgress)(({ _theme }) => ({
  ...styles.root,
  '&.primary': styles.primary,
  '&.warning': styles.warning,
  '&.danger': styles.danger,
  '&.success': styles.success,
  '&.info': styles.info,
  '& .MuiLinearProgress-bar': {
    ...styles.bar,
  },
}));

export default function CustomLinearProgress(props) {
  const { color, ...rest } = props;
  return <StyledLinearProgress className={color} {...rest} />;
}

CustomLinearProgress.defaultProps = {
  color: 'gray',
};

CustomLinearProgress.propTypes = {
  color: PropTypes.oneOf(['primary', 'warning', 'danger', 'success', 'info']),
};
