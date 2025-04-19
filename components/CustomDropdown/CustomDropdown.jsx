import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@mui/material/styles/withStyles';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import Popper from '@mui/material/Popper';

// core components
import Button from 'components/CustomButtons/Button.jsx';

import customDropdownStyle from '@/styles/jss/material-kit-react/components/customDropdownStyle.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const CustomDropdown = React.forwardRef(function CustomDropdown(props) {
  const {
    classes,
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
    noLiPadding,
  } = props;
  const [open, setOpen] = React.useState(false);
  const anchorEl = React.useRef(null);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = (param) => {
    setOpen(false);
    if (props && props.onClick) {
      props.onClick(param);
    }
  };

  const handleCloseAway = (event) => {
    if (anchorEl.current && !anchorEl.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const caretClasses = classNames({
    [classes.caret]: true,
    [classes.caretActive]: open,
    [classes.caretRTL]: rtlActive,
  });
  const dropdownItem = classNames({
    [classes.dropdownItem]: true,
    [classes[hoverColor + 'Hover']]: true,
    [classes.noLiPadding]: noLiPadding,
    [classes.dropdownItemRTL]: rtlActive,
  });
  let icon = null;
  switch (typeof buttonIcon) {
    case 'function':
      icon = <props.buttonIcon className={classes.buttonIcon} />;
      break;
    case 'object':
      if (buttonIcon.type.muiName === 'Icon') {
        icon = props.buttonIcon;
      }
      break;
    case 'string':
      icon = <Icon className={classes.buttonIcon}>{props.buttonIcon}</Icon>;
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
          aria-owns={open ? 'menu-list' : null}
          aria-haspopup="true"
          {...buttonProps}
          buttonRef={(node) => {
            anchorEl.current = node;
          }}
          onClick={handleClick}
        >
          {icon}
          {buttonText !== undefined ? buttonText : null}
          {caret ? <b className={caretClasses} /> : null}
        </Button>
      </div>
      <Popper
        open={open}
        anchorEl={anchorEl.current}
        transition
        disablePortal
        placement={dropup ? (left ? 'top-start' : 'top') : left ? 'bottom-start' : 'bottom'}
        className={classNames({
          [classes.popperClose]: !open,
          [classes.popperResponsive]: true,
        })}
      >
        {() => (
          <Transition
            in={open}
            id="menu-list"
            style={dropup ? { transformOrigin: '0 100% 0' } : { transformOrigin: '0 0 0' }}
          >
            <Paper className={classes.dropdown}>
              <ClickAwayListener onClickAway={handleCloseAway}>
                <MenuList role="menu" className={classes.menuList}>
                  {dropdownHeader !== undefined ? (
                    <MenuItem
                      onClick={() => handleClose(dropdownHeader)}
                      className={classes.dropdownHeader}
                    >
                      {dropdownHeader}
                    </MenuItem>
                  ) : null}
                  {dropdownList.map((prop, key) => {
                    if (prop.divider) {
                      return (
                        <Divider
                          key={key}
                          onClick={() => handleClose('divider')}
                          className={classes.dropdownDividerItem}
                        />
                      );
                    }
                    return (
                      <MenuItem
                        key={key}
                        onClick={() => handleClose(prop)}
                        className={dropdownItem}
                      >
                        {prop}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Transition>
        )}
      </Popper>
    </div>
  );
});

CustomDropdown.defaultProps = {
  caret: true,
  hoverColor: 'primary',
};

CustomDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
  hoverColor: PropTypes.oneOf(['black', 'primary', 'info', 'success', 'warning', 'danger', 'rose']),
  buttonText: PropTypes.node,
  buttonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
  dropdownList: PropTypes.array,
  buttonProps: PropTypes.object,
  dropup: PropTypes.bool,
  dropdownHeader: PropTypes.node,
  rtlActive: PropTypes.bool,
  caret: PropTypes.bool,
  left: PropTypes.bool,
  noLiPadding: PropTypes.bool,
  // function that retuns the selected item
  onClick: PropTypes.func,
};

export default withStyles(customDropdownStyle)(CustomDropdown);
