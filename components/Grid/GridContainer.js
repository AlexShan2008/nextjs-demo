// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @mui/material components
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const StyledGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
  margin: '0 auto',
  padding: `${theme.spacing(1)} !important`,
  '&::before, &::after': {
    display: 'table',
    content: '" "',
  },
  '&::after': {
    clear: 'both',
  },
}));

export default function GridContainer(props) {
  const { children, ...rest } = props;
  return (
    <StyledGrid container {...rest}>
      {children}
    </StyledGrid>
  );
}

GridContainer.propTypes = {
  children: PropTypes.node,
};
