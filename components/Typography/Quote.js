// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @mui/material components
import { styled } from '@mui/material/styles';

import styles from '@/styles/jss/material-kit-react/components/typographyStyle.js';

const StyledBlockquote = styled('blockquote')(({ _theme }) => ({
  ...styles.defaultFontStyle,
  ...styles.quote,
  '& p': styles.quoteText,
  '& small': styles.quoteAuthor,
}));

export default function Quote(props) {
  const { text, author } = props;
  return (
    <StyledBlockquote>
      <p>{text}</p>
      {author && <small>{author}</small>}
    </StyledBlockquote>
  );
}

Quote.propTypes = {
  text: PropTypes.node,
  author: PropTypes.node,
};
