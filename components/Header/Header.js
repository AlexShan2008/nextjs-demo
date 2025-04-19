import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Hidden from '@mui/material/Hidden';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/icons-material/Menu';
import Link from 'next/link';
import styles from '@/styles/jss/material-kit-react/components/headerStyle.js';

const StyledAppBar = styled(AppBar)(({ _theme }) => ({
  ...styles.appBar,
  '&.primary': styles.primary,
  '&.info': styles.info,
  '&.success': styles.success,
  '&.warning': styles.warning,
  '&.danger': styles.danger,
  '&.transparent': styles.transparent,
  '&.white': styles.white,
  '&.rose': styles.rose,
  '&.dark': styles.dark,
  '&.absolute': styles.absolute,
  '&.fixed': styles.fixed,
}));

const StyledToolbar = styled(Toolbar)(({ _theme }) => ({
  ...styles.container,
}));

const StyledButton = styled('div')(({ _theme }) => ({
  ...styles.title,
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
}));

const StyledFlex = styled('div')(({ _theme }) => ({
  ...styles.flex,
}));

const StyledDrawer = styled(Drawer)(({ _theme }) => ({
  '& .MuiDrawer-paper': styles.drawerPaper,
}));

const StyledResponsive = styled('div')(({ _theme }) => ({
  ...styles.appResponsive,
}));

export default function Header({
  color = 'white',
  rightLinks,
  leftLinks,
  brand,
  fixed,
  absolute,
  changeColorOnScroll,
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    if (changeColorOnScroll) {
      window.addEventListener('scroll', headerColorChange);
    }
    return function cleanup() {
      if (changeColorOnScroll) {
        window.removeEventListener('scroll', headerColorChange);
      }
    };
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const headerColorChange = () => {
    if (!headerRef.current) return;

    const windowsScrollTop = window.pageYOffset;
    const header = headerRef.current;

    if (windowsScrollTop > changeColorOnScroll.height) {
      header.classList.remove(color);
      header.classList.add(changeColorOnScroll.color);
    } else {
      header.classList.add(color);
      header.classList.remove(changeColorOnScroll.color);
    }
  };

  const appBarClasses = classNames({
    [color]: color,
    absolute: absolute,
    fixed: fixed,
  });

  const brandComponent = (
    <Link href="/" passHref legacyBehavior>
      <StyledButton>{brand}</StyledButton>
    </Link>
  );

  return (
    <StyledAppBar className={appBarClasses} ref={headerRef}>
      <StyledToolbar>
        {leftLinks !== undefined ? brandComponent : null}
        <StyledFlex>
          {leftLinks !== undefined ? <Hidden smDown>{leftLinks}</Hidden> : brandComponent}
        </StyledFlex>
        <Hidden smDown>{rightLinks}</Hidden>
        <Hidden mdUp>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle}>
            <Menu />
          </IconButton>
        </Hidden>
      </StyledToolbar>
      <Hidden mdUp>
        <StyledDrawer
          variant="temporary"
          anchor={'right'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          <StyledResponsive>
            {leftLinks}
            {rightLinks}
          </StyledResponsive>
        </StyledDrawer>
      </Hidden>
    </StyledAppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'transparent',
    'white',
    'rose',
    'dark',
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      'primary',
      'info',
      'success',
      'warning',
      'danger',
      'transparent',
      'white',
      'rose',
      'dark',
    ]).isRequired,
  }),
};
