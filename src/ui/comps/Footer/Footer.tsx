import {
  StyledBox,
  StyledContainer,
  StyledTypography,
} from './footer.styles';
import MenuButton from '../MobileMenuButton';

type Props = {
    name: string,
    pages: Record<string, string>,
}

function Footer({ name, pages }: Props) {
  return (
    <footer>
      <StyledContainer>
        <StyledBox>
          <MenuButton pages={pages} />
        </StyledBox>
      </StyledContainer>

      <StyledContainer>
        <StyledBox>
          <StyledTypography>
            Copyright &copy;
            {` ${name}`}
          </StyledTypography>
        </StyledBox>
      </StyledContainer>
    </footer>
  );
}

export default Footer;
