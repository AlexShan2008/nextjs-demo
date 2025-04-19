/*eslint-disable*/

// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @mui/material components
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

// @mui/icons-material
import Favorite from '@mui/icons-material/Favorite';

import styles from '@/styles/jss/material-kit-react/components/footerStyle.js';

// Create styled components
const StyledFooter = styled('footer')(({ _theme }) => ({
  ...styles.footer,
  '&.footerWhiteFont': {
    ...styles.footerWhiteFont,
  },
}));

const StyledContainer = styled('div')(({ _theme }) => ({
  ...styles.container,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StyledLeft = styled('div')(({ _theme }) => ({
  ...styles.left,
}));

const StyledRight = styled('div')(({ _theme }) => ({
  ...styles.right,
}));

const StyledList = styled(List)(({ _theme }) => ({
  ...styles.list,
}));

const StyledListItem = styled(ListItem)(({ _theme }) => ({
  ...styles.inlineBlock,
}));

const StyledLink = styled('a')(({ _theme }) => ({
  ...styles.block,
  '&.footerWhiteFont': {
    ...styles.footerWhiteFont,
  },
}));

const StyledIcon = styled(Favorite)(({ _theme }) => ({
  ...styles.icon,
}));

export default function Footer(props) {
  const { whiteFont } = props;

  return (
    <StyledFooter className={whiteFont ? 'footerWhiteFont' : ''}>
      <StyledContainer>
        <StyledLeft>
          <StyledList>
            <StyledListItem>
              <StyledLink href="https://www.creative-tim.com/?ref=mkr-footer" target="_blank">
                Creative Tim
              </StyledLink>
            </StyledListItem>
            <StyledListItem>
              <StyledLink
                href="https://www.creative-tim.com/presentation?ref=mkr-footer"
                target="_blank"
              >
                About us
              </StyledLink>
            </StyledListItem>
            <StyledListItem>
              <StyledLink href="http://blog.creative-tim.com/?ref=mkr-footer" target="_blank">
                Blog
              </StyledLink>
            </StyledListItem>
            <StyledListItem>
              <StyledLink
                href="https://www.creative-tim.com/license?ref=mkr-footer"
                target="_blank"
              >
                Licenses
              </StyledLink>
            </StyledListItem>
          </StyledList>
        </StyledLeft>
        <StyledRight>
          &copy; {1900 + new Date().getYear()} , made with <StyledIcon /> by{' '}
          <StyledLink
            href="https://www.creative-tim.com?ref=mkr-footer"
            className={whiteFont ? 'footerWhiteFont' : ''}
            target="_blank"
          >
            Creative Tim
          </StyledLink>{' '}
          for a better web.
        </StyledRight>
      </StyledContainer>
    </StyledFooter>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
