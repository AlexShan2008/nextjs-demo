// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @mui/material components
import { styled } from '@mui/material/styles';

import styles from '@/styles/jss/material-kit-react/components/cardHeaderStyle.js';

const StyledDiv = styled('div')(({ _theme }) => ({
  ...styles.cardHeader,
  '&.plain': styles.cardHeaderPlain,
  '&.color': styles.cardHeaderColor,
}));

export default function CardHeader(props) {
  const { className, children, color, plain, ...rest } = props;
  const cardHeaderClasses = classNames({
    plain: plain,
    color: color,
  });

  return (
    <StyledDiv className={classNames(cardHeaderClasses, className)} {...rest}>
      {children}
    </StyledDiv>
  );
}

CardHeader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(['warning', 'success', 'danger', 'info', 'primary']),
  plain: PropTypes.bool,
  children: PropTypes.node,
};
