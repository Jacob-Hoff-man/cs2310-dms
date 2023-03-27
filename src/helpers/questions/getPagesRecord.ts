type Question = {
  id: string,
  title: string,
  embed?: string
}

/* generates a dictionary (key = page id, value = page title) for question data to be used in links */
export default function getPagesRecord(questions: Question[]) {
  const rec: Record<string, string> = {};
  questions.forEach((question) => {
    rec[question.id] = question.title;
  });
  return rec;
}
