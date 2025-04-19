/*eslint-disable*/

// nodejs library to set properties for components
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
// Next.js Link component
import Link from 'next/link';
import React from 'react';

// @mui/material components
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Tooltip from '@mui/material/Tooltip';

// @mui/icons-material
import { Apps, CloudDownload } from '@mui/icons-material';

// core components
import CustomDropdown from '@/components/CustomDropdown/CustomDropdown.js';
import Button from '@/components/CustomButtons/Button.js';
import { NAV_LIST } from '@/components/Header/data.js';

const StyledList = styled(List)(({ theme }) => ({
  fontSize: '14px',
  margin: 0,
  paddingLeft: '0',
  listStyle: 'none',
  paddingTop: '0',
  paddingBottom: '0',
  color: 'inherit',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  float: 'left',
  color: 'inherit',
  position: 'relative',
  display: 'block',
  width: 'auto',
  margin: '0',
  padding: '0',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    '&:not(:last-of-type)': {
      '&::after': {
        width: 'calc(100% - 30px)',
        content: '""',
        display: 'block',
        height: '1px',
        marginLeft: '15px',
        backgroundColor: '#e5e5e5',
      },
    },
  },
}));

const StyledLink = styled('a')(({ theme }) => ({
  color: 'inherit',
  position: 'relative',
  padding: '0.9375rem',
  fontWeight: '400',
  fontSize: '12px',
  textTransform: 'uppercase',
  borderRadius: '3px',
  lineHeight: '20px',
  textDecoration: 'none',
  margin: '0px',
  display: 'inline-flex',
  '&:hover,&:focus': {
    color: 'inherit',
    background: 'rgba(200, 200, 200, 0.2)',
  },
  [theme.breakpoints.down('md')]: {
    width: 'calc(100% - 30px)',
    marginLeft: '15px',
    marginBottom: '8px',
    marginTop: '8px',
    textAlign: 'left',
    '& > span:not(:first-of-type)': {
      justifyContent: 'flex-start',
    },
  },
}));

export default function HeaderLinks() {
  return (
    <StyledList>
      {NAV_LIST.map((nav) => (
        <StyledListItem key={nav.id}>
          <Link href={nav.href} passHref legacyBehavior>
            <StyledLink>{nav.name}</StyledLink>
          </Link>
        </StyledListItem>
      ))}
    </StyledList>
  );
}

HeaderLinks.propTypes = {
  classes: PropTypes.object,
};
