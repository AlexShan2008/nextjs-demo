// nodejs library to set properties for components
import PropTypes from 'prop-types';
import React from 'react';
// @mui/material components
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const PREFIX = 'GridItem';

const classes = {
  grid: `${PREFIX}-grid`,
};

const StyledGrid = styled(Grid)(({ _theme }) => ({
  [`&.${classes.grid}`]: {
    position: 'relative',
    width: '100%',
    minHeight: '1px',
    paddingRight: '15px',
    paddingLeft: '15px',
    flexBasis: 'auto',
  },
}));

export default function GridItem(props) {
  const { children, className, ...rest } = props;
  return (
    <StyledGrid item className={`${classes.grid} ${className || ''}`} {...rest}>
      {children}
    </StyledGrid>
  );
}

GridItem.propTypes = {
  children: PropTypes.node,
};
