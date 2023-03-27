import { StaticImageData } from 'next/image';

import {
  StyledAppBar,
  StyledBoxMenuIcon,
  StyledBoxToolbarIcon,
  StyledToolbar,
} from './responsiveAppBar.styles';
import HomeButton from '../HomeButton';
import MenuButton from '../MobileMenuButton';
import ProfileButton from '../ProfileButton';

type Props = {
  title?: string,
  pages?: Record<string, string>,
  settings?: string[],
  logo: StaticImageData
}

export default function ResponsiveAppBar({
  title,
  pages,
  settings,
  logo,
}: Props) {
  return (
    <StyledAppBar>
      <StyledToolbar>
        { title
        && (
          <StyledBoxToolbarIcon>
            <HomeButton title={title} logo={logo} />
          </StyledBoxToolbarIcon>
        )}
        { pages
        && (
          <StyledBoxMenuIcon>
            <MenuButton pages={pages} />
          </StyledBoxMenuIcon>
        )}
        { settings // TODO: swap this out later with isLoggedIn conditional and add Sign In/Sign Up buttons as else case
        && (<ProfileButton settings={settings} />)}
      </StyledToolbar>
    </StyledAppBar>
  );
}
