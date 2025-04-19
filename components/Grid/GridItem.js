// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @mui/material components
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const StyledGrid = styled(Grid)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  minHeight: '1px',
  paddingRight: '15px',
  paddingLeft: '15px',
  flexBasis: 'auto',
}));

export default function GridItem(props) {
  const { children, ...rest } = props;
  return (
    <StyledGrid item {...rest}>
      {children}
    </StyledGrid>
  );
}

GridItem.propTypes = {
  children: PropTypes.node,
};
