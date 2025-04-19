import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// @mui/material components
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import Icon from '@mui/material/Icon';
import Popper from '@mui/material/Popper';
import { styled } from '@mui/material/styles';

// core components
import Button from '@/components/CustomButtons/Button.js';

// styled components
import {
  StyledDropdown,
  StyledDropdownItem,
  StyledDivider,
  StyledButtonIcon,
  StyledCaret,
  StyledDropdownHeader,
} from '@/styles/jss/material-kit-react/components/customDropdownStyle.js';

// Create styled components
const StyledMenuList = styled(MenuList)({
  padding: '0',
});

const StyledPaper = styled(Paper)({
  ...StyledDropdown,
});

const StyledPopper = styled(Popper)(({ theme }) => ({
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
  '&.closed': {
    pointerEvents: 'none',
  },
}));

export default function CustomDropdown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    if (anchorEl && anchorEl.contains(event.target)) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = (param) => {
    setAnchorEl(null);
    if (props && props.onClick) {
      props.onClick(param);
    }
  };
  const handleCloseAway = (event) => {
    if (anchorEl.contains(event.target)) {
      return;
    }
    setAnchorEl(null);
  };

  const {
    buttonText,
    buttonIcon,
    dropdownList,
    buttonProps,
    dropup,
    dropdownHeader,
    caret,
    hoverColor,
    left,
    rtlActive,
  } = props;

  const caretClasses = classNames({
    [StyledCaret]: true,
    active: Boolean(anchorEl),
    rtl: rtlActive,
  });

  const dropdownItemClasses = classNames({
    [`${hoverColor}Hover`]: true,
    rtl: rtlActive,
  });

  let icon = null;
  switch (typeof buttonIcon) {
    case 'object':
      icon = <StyledButtonIcon as={props.buttonIcon} />;
      break;
    case 'string':
      icon = <StyledButtonIcon as={Icon}>{props.buttonIcon}</StyledButtonIcon>;
      break;
    default:
      icon = null;
      break;
  }

  return (
    <div>
      <div>
        <Button
          aria-label="Notifications"
          aria-owns={anchorEl ? 'menu-list' : null}
          aria-haspopup="true"
          {...buttonProps}
          onClick={handleClick}
        >
          {icon}
          {buttonText !== undefined ? buttonText : null}
          {caret ? <StyledCaret className={caretClasses} active={Boolean(anchorEl)} /> : null}
        </Button>
      </div>
      <StyledPopper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transition
        disablePortal
        placement={dropup ? (left ? 'top-start' : 'top') : left ? 'bottom-start' : 'bottom'}
        className={!anchorEl ? 'closed' : ''}
      >
        {() => (
          <Grow
            in={Boolean(anchorEl)}
            id="menu-list"
            style={dropup ? { transformOrigin: '0 100% 0' } : { transformOrigin: '0 0 0' }}
          >
            <StyledPaper>
              <ClickAwayListener onClickAway={handleCloseAway}>
                <StyledMenuList role="menu">
                  {dropdownHeader !== undefined ? (
                    <StyledDropdownHeader onClick={() => handleClose(dropdownHeader)}>
                      {dropdownHeader}
                    </StyledDropdownHeader>
                  ) : null}
                  {dropdownList.map((prop, key) => {
                    if (prop.divider) {
                      return <StyledDivider key={key} onClick={() => handleClose('divider')} />;
                    }
                    return (
                      <StyledDropdownItem
                        key={key}
                        onClick={() => handleClose(prop)}
                        className={dropdownItemClasses}
                      >
                        {prop}
                      </StyledDropdownItem>
                    );
                  })}
                </StyledMenuList>
              </ClickAwayListener>
            </StyledPaper>
          </Grow>
        )}
      </StyledPopper>
    </div>
  );
}

CustomDropdown.propTypes = {
  hoverColor: PropTypes.oneOf(['black', 'primary', 'info', 'success', 'warning', 'danger', 'rose']),
  buttonText: PropTypes.node,
  buttonIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  dropdownList: PropTypes.array,
  buttonProps: PropTypes.object,
  dropup: PropTypes.bool,
  dropdownHeader: PropTypes.node,
  rtlActive: PropTypes.bool,
  caret: PropTypes.bool,
  left: PropTypes.bool,
  // function that retuns the selected item
  onClick: PropTypes.func,
};
