/* global HTMLElement */
import React from 'react';

import {
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledLinkMenuItem } from './hamburgerMenuButton.styles';

type Props = {
    pages : Record<string, string>,
}

export default function HamburgerMenuButton({ pages }: Props) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Tooltip title="Select Question">
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        { Object.entries(pages).map(([key, value]) => (
          <MenuItem key={key} onClick={handleCloseNavMenu}>
            <StyledLinkMenuItem key={key} href={`/questions/${key}`} noWrap>
              {value}
            </StyledLinkMenuItem>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
