import { StaticImageData } from 'next/image';

import {
  Tooltip,
} from '@mui/material';

import {
  StyledLinkTitle,
  StyledIcon,
  StyledImage,
  StyledTypographyTitle,
} from './homeButton.styles';

type Props = {
    title?: string,
    logo: StaticImageData,
}

export default function HomeButton({ title, logo }: Props) {
  return (
    <Tooltip title="Go home">
      <StyledLinkTitle href="/">
        <>
          <StyledIcon>
            <StyledImage src={logo} alt="logo" />
          </StyledIcon>
          { title
          && (
            <StyledTypographyTitle
              variant="h5"
              noWrap
            >
                {title}
            </StyledTypographyTitle>
          )}
        </>
      </StyledLinkTitle>
    </Tooltip>
  );
}
