import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0',
      light: '#ab47bc',
      dark: '#8e24aa',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff4081',
      light: '#ff4081',
      dark: '#f50057',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

export default theme;
