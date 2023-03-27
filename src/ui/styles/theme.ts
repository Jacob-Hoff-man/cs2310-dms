import { createTheme } from '@mui/material/styles';
import {
  yellow,
  green,
  red,
} from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: yellow.A700,
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
