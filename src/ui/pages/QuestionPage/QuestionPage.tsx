import {
  StyledContainer,
  StyledIframe
} from './questionPage.styles';

type QuestionPageProps = {
    question: {
        id: string,
        title: string,
        embed?: string,
    }
}

const QuestionPage = ({ question }: QuestionPageProps) => (
  <>
    { question.title
    && (
      <h1>{question.title}</h1>
    )}
    { question.embed
    && (
    <StyledContainer>
      <StyledIframe
        src={question.embed}
        title={question.title}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation;
        gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    </StyledContainer>
    )}
  </>
);

export default QuestionPage;
