import { createTheme } from '@mui/material/styles';
import {
  green,
  red,
  grey
} from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: grey.A400,
    },
    secondary: {
      main: '#ff6666',
    },
    success: {
      main: green.A700,
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
