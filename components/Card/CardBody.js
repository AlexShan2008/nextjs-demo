// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @mui/material components
import { styled } from '@mui/material/styles';

import styles from '@/styles/jss/material-kit-react/components/cardBodyStyle.js';

const StyledDiv = styled('div')(({ _theme }) => ({
  ...styles.cardBody,
  '&.background': styles.cardBodyBackground,
  '&.plain': styles.cardBodyPlain,
}));

export default function CardBody(props) {
  const { className, children, background, plain, ...rest } = props;
  const cardBodyClasses = classNames({
    background: background,
    plain: plain,
  });

  return (
    <StyledDiv className={classNames(cardBodyClasses, className)} {...rest}>
      {children}
    </StyledDiv>
  );
}

CardBody.propTypes = {
  className: PropTypes.string,
  background: PropTypes.bool,
  plain: PropTypes.bool,
  children: PropTypes.node,
};
