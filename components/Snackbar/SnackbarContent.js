// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @mui/material components
import { styled } from '@mui/material/styles';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
// @mui/icons-material
import Close from '@mui/icons-material/Close';

import styles from '@/styles/jss/material-kit-react/components/snackbarContentStyle.js';

const StyledSnackbarContent = styled(SnackbarContent)(({ _theme }) => ({
  ...styles.root,
  '&.info': styles.info,
  '&.success': styles.success,
  '&.warning': styles.warning,
  '&.danger': styles.danger,
  '&.primary': styles.primary,
  '& .message': styles.message,
  '& .icon': styles.icon,
  '& .iconButton': styles.iconButton,
  '& .iconMessage': styles.iconMessage,
}));

export default function Snackbar(props) {
  const { message, color, close, icon } = props;
  let action = [];
  const messageClasses = classNames({
    message: true,
    iconMessage: icon !== undefined,
  });
  if (close !== undefined) {
    action = [
      <IconButton
        className="iconButton"
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={() => props.closeNotification()}
      >
        <Close className="icon" />
      </IconButton>,
    ];
  }
  return (
    <StyledSnackbarContent
      message={
        <div>
          {icon !== undefined ? <props.icon className="icon" /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      action={action}
      className={color}
    />
  );
}

Snackbar.propTypes = {
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['info', 'success', 'warning', 'danger', 'primary']),
  close: PropTypes.bool,
  icon: PropTypes.object,
  closeNotification: PropTypes.func,
};
