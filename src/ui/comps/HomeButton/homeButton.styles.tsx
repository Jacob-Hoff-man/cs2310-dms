import styled from '@emotion/styled';
import Image from 'next/image';

import {
  Typography,
} from '@mui/material';

import Link from '../Link';

export const StyledIcon = styled.div`
    max-width: 34.43px;
    margin-left: 12px;
    margin-right: 12px;
`;

export const StyledImage = styled(Image)`
    object-fit: fill;
`;

export const StyledTypographyTitle = styled(Typography)`
    font-weight: 600;
    color: black;
    text-decoration: none;
`;

export const StyledLinkTitle = styled(Link)`
    display: inline-flex; 
`;
