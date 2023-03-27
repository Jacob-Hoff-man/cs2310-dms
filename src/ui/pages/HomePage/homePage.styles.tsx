import styled from '@emotion/styled';
import {
  Box, Card, Grid
} from '@mui/material';

export const StyledBox = styled(Box)`
  margin-top: 5;
  margin-bottom: 5;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledCard = styled(Card)`
  max-height: 50%;
  max-width: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledGrid = styled(Grid)`
  max-height: 80vh;
  direction: column;
  align-items: center;
  justify-content: center;
`;
