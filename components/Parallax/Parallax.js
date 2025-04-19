import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import styles from '@/styles/jss/material-kit-react/components/parallaxStyle.js';

const StyledDiv = styled('div')(({ _theme }) => ({
  ...styles.parallax,
  '&.filter': styles.filter,
  '&.small': styles.small,
}));

export default function Parallax(props) {
  const { filter, className, children, style, image, small } = props;
  const [transform, setTransform] = React.useState('translate3d(0,0px,0)');

  React.useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener('scroll', resetTransform);
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener('scroll', resetTransform);
      }
    };
  });

  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3;
    setTransform('translate3d(0,' + windowScrollTop + 'px,0)');
  };

  const parallaxClasses = classNames({
    filter: filter,
    small: small,
  });

  return (
    <StyledDiv
      className={classNames(parallaxClasses, className)}
      style={{
        ...style,
        backgroundImage: 'url(' + image + ')',
        transform: transform,
      }}
    >
      {children}
    </StyledDiv>
  );
}

Parallax.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.object,
  image: PropTypes.string,
  small: PropTypes.bool,
};
