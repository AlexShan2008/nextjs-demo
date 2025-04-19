// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @mui/material components
import { styled } from '@mui/material/styles';

import styles from '@/styles/jss/material-kit-react/components/cardStyle.js';

const StyledDiv = styled('div')(({ _theme }) => ({
  ...styles.card,
  '&.plain': styles.cardPlain,
  '&.carousel': styles.cardCarousel,
}));

export default function Card(props) {
  const { className, children, plain, carousel, ...rest } = props;
  const cardClasses = classNames({
    plain: plain,
    carousel: carousel,
  });

  return (
    <StyledDiv className={classNames(cardClasses, className)} {...rest}>
      {children}
    </StyledDiv>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  carousel: PropTypes.bool,
  children: PropTypes.node,
};
