/* globals HTMLElement */
import React from 'react';

import {
  Avatar,
  IconButton,
  MenuItem,
  Tooltip,
} from '@mui/material';

import {
  StyledLinkMenuItem,
  StyledMenu,
} from './profileButton.styles';

type Props = {
    settings: string[],
  }

export default function ProfileButton({ settings }: Props) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <StyledMenu
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <StyledLinkMenuItem key={setting} href={`/${setting}`} noWrap>
              {setting}
            </StyledLinkMenuItem>
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
}
