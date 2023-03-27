import questions from '../../../public/assets/datas/qaQuestionData.json';

type Params = {
    params: {
        id: string,
    },
}

export async function getStaticPaths() {
  return {
    paths: questions.map((question) => ({
      params: {
        id: question.id
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: Params) {
  const { id } = params;
  return {
    props: {
      question: questions.find((question) => question.id === id),
    },
  };
}

export { default } from '../../ui/pages/QuestionPage';
