import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '../Link';

export const StyledBox = styled(Box)`
width: 100%;
display: inline;
justify-content: center;
text-align: center;
`;

export const StyledLink = styled(Link)`
font-family: monospace;
font-weight: 700;
letter-spacing: .3rem;
color: black;
text-decoration: none;
`;

export const StyledTypography = styled(Typography)`
font-weight: 600;
color: black;
text-decoration: none;
`;

export const StyledContainer = styled(Container)`
display: flex;
`;
