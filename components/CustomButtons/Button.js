import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// @mui/material components
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledButton = styled(Button)(({ theme }) => ({
  minHeight: 'auto',
  minWidth: 'auto',
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[2],
  border: 'none',
  borderRadius: '3px',
  position: 'relative',
  padding: '12px 30px',
  margin: '.3125rem 1px',
  fontSize: '12px',
  fontWeight: 400,
  textTransform: 'uppercase',
  letterSpacing: '0',
  willChange: 'box-shadow, transform',
  transition:
    'box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  lineHeight: '1.42857143',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  touchAction: 'manipulation',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
  '&.button': {
    '&.primary': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    '&.info': {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.info.contrastText,
    },
    '&.success': {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.contrastText,
    },
    '&.warning': {
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.warning.contrastText,
    },
    '&.danger': {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
    },
    '&.rose': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
    '&.white': {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.text.primary,
    },
    '&.transparent': {
      backgroundColor: 'transparent',
      color: theme.palette.text.primary,
    },
    '&.sm': {
      padding: '8px 20px',
      fontSize: '11px',
    },
    '&.lg': {
      padding: '16px 40px',
      fontSize: '14px',
    },
    '&.round': {
      borderRadius: '30px',
    },
    '&.fullWidth': {
      width: '100%',
    },
    '&.block': {
      display: 'block',
    },
    '&.link': {
      '&,&:hover,&:focus': {
        backgroundColor: 'transparent',
        color: theme.palette.text.primary,
        boxShadow: 'none',
      },
    },
    '&.justIcon': {
      padding: '12px',
      fontSize: '20px',
      minWidth: '40px',
      minHeight: '40px',
    },
  },
}));

const RegularButton = React.forwardRef((props, ref) => {
  const {
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    ...rest
  } = props;

  const btnClasses = classNames({
    button: true,
    [size]: size,
    [color]: color,
    round: round,
    fullWidth: fullWidth,
    disabled: disabled,
    simple: simple,
    block: block,
    link: link,
    justIcon: justIcon,
    [className]: className,
  });

  return (
    <StyledButton {...rest} ref={ref} className={btnClasses}>
      {children}
    </StyledButton>
  );
});

RegularButton.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'rose',
    'white',
    'facebook',
    'twitter',
    'google',
    'github',
    'transparent',
  ]),
  size: PropTypes.oneOf(['sm', 'lg']),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default RegularButton;
