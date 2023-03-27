import { ReactElement } from 'react';
import {
  Container,
  Typography,
} from '@mui/material';
import { StyledBox } from './homePage.styles';
import MainLayout from '../../layouts/MainLayout';

const HomePage = () => (
  <Container maxWidth={false}>
    <StyledBox>
      <Typography component="h1" color="primary">
        FRONT-END: Material UI v5 with Next.js 12.1.6 and emotion/styled 11.10 in TypeScript.
      </Typography>
      <Typography component="h2" color="secondary">
        CI ACTIONS: ESLint (Airbnb) integration with Next and Jest/React testing libraries integration with Next.
      </Typography>
      <Typography component="h3" color="error">
        Boilerplate for building faster.
      </Typography>
    </StyledBox>
  </Container>
);

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>{page}</MainLayout>
  );
};

export default HomePage;
