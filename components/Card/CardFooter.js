// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @mui/material components
import { styled } from '@mui/material/styles';

import styles from '@/styles/jss/material-kit-react/components/cardFooterStyle.js';

const StyledDiv = styled('div')(({ _theme }) => ({
  ...styles.cardFooter,
}));

export default function CardFooter(props) {
  const { className, children, ...rest } = props;

  return (
    <StyledDiv className={classNames(className)} {...rest}>
      {children}
    </StyledDiv>
  );
}

CardFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
