import styled from '@emotion/styled';
import {
  AppBar,
  Box,
  Toolbar,
} from '@mui/material';
import Link from '../Link';

export const StyledAppBar = styled(AppBar)`
    position: static;
    margin-bottom: 10px;
`;

export const StyledBoxMenuIcon = styled(Box)`
    position: absolute;
    right: 0px;
`;

export const StyledBoxMenuItems = styled(Box)`
    margin-right: 24px;
    justify-content: flex-end;
`;

export const StyledBoxToolbarIcon = styled(Box)`
    position: absolute;
    left: 0px;
`;

export const StyledToolbar = styled(Toolbar)`
    position: static;
    min-height: 64px;

`;

export const StyledLinkMenuItem = styled(Link)`
    font-family: monospace;
    font-weight: 700;
    letter-spacing: .3rem;
    color: black;
    text-decoration: none;
    margin-left: 24px;
`;
