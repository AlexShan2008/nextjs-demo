import { styled } from '@mui/material/styles';
import {
  defaultFont,
  primaryColor,
  primaryBoxShadow,
  infoColor,
  infoBoxShadow,
  successColor,
  successBoxShadow,
  warningColor,
  warningBoxShadow,
  dangerColor,
  dangerBoxShadow,
  roseColor,
  roseBoxShadow,
} from '@/styles/jss/material-kit-react.js';

// Base dropdown styles
export const StyledDropdown = styled('div')({
  borderRadius: '3px',
  border: '0',
  boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
  top: '100%',
  zIndex: '1000',
  minWidth: '160px',
  padding: '5px 0',
  margin: '2px 0 0',
  fontSize: '14px',
  textAlign: 'left',
  listStyle: 'none',
  backgroundColor: '#fff',
  backgroundClip: 'padding-box',
});

// Popper styles
export const StyledPopper = styled('div')(({ theme }) => ({
  zIndex: '1200',
  [theme.breakpoints.down('sm')]: {
    zIndex: '1640',
    position: 'static',
    float: 'none',
    width: 'auto',
    marginTop: '0',
    backgroundColor: 'transparent',
    border: '0',
    boxShadow: 'none',
    color: 'black',
  },
}));

// Dropdown item styles
export const StyledDropdownItem = styled('div')({
  ...defaultFont,
  fontSize: '13px',
  padding: '10px 20px',
  margin: '0 5px',
  borderRadius: '2px',
  position: 'relative',
  transition: 'all 150ms linear',
  display: 'block',
  clear: 'both',
  fontWeight: '400',
  height: 'fit-content',
  color: '#333',
  whiteSpace: 'nowrap',
  minHeight: 'unset',
  '&.blackHover:hover': {
    boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(33, 33, 33, 0.4)',
    backgroundColor: '#212121',
    color: '#fff',
  },
  '&.primaryHover:hover': {
    backgroundColor: primaryColor,
    color: '#FFFFFF',
    ...primaryBoxShadow,
  },
  '&.infoHover:hover': {
    backgroundColor: infoColor,
    color: '#FFFFFF',
    ...infoBoxShadow,
  },
  '&.successHover:hover': {
    backgroundColor: successColor,
    color: '#FFFFFF',
    ...successBoxShadow,
  },
  '&.warningHover:hover': {
    backgroundColor: warningColor,
    color: '#FFFFFF',
    ...warningBoxShadow,
  },
  '&.dangerHover:hover': {
    backgroundColor: dangerColor,
    color: '#FFFFFF',
    ...dangerBoxShadow,
  },
  '&.roseHover:hover': {
    backgroundColor: roseColor,
    color: '#FFFFFF',
    ...roseBoxShadow,
  },
  '&.rtl': {
    textAlign: 'right',
  },
});

// Divider styles
export const StyledDivider = styled('div')({
  margin: '5px 0',
  backgroundColor: 'rgba(0, 0, 0, 0.12)',
  height: '1px',
  overflow: 'hidden',
});

// Button icon styles
export const StyledButtonIcon = styled('span')({
  width: '20px',
  height: '20px',
});

// Caret styles
export const StyledCaret = styled('span')(({ active }) => ({
  transition: 'all 150ms ease-in',
  display: 'inline-block',
  width: '0',
  height: '0',
  marginLeft: '4px',
  verticalAlign: 'middle',
  borderTop: '4px solid',
  borderRight: '4px solid transparent',
  borderLeft: '4px solid transparent',
  transform: active ? 'rotate(180deg)' : 'none',
  '&.rtl': {
    marginRight: '4px',
  },
}));

// Header styles
export const StyledDropdownHeader = styled('div')({
  display: 'block',
  padding: '0.1875rem 1.25rem',
  fontSize: '0.75rem',
  lineHeight: '1.428571',
  color: '#777',
  whiteSpace: 'nowrap',
  fontWeight: 'inherit',
  marginTop: '10px',
  minHeight: 'unset',
  '&:hover,&:focus': {
    backgroundColor: 'transparent',
    cursor: 'auto',
  },
});
